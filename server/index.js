const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool, initDb } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'kodbank_secret_key';

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true, // Allows any origin to facilitate the "dynamic backend" feature
    credentials: true
}));

// Initialize Database
initDb();

// Registration Endpoint
app.post('/api/register', async (req, res) => {
    const { uid, username, password, email, phone, role } = req.body;

    if (role && role !== 'Customer') {
        return res.status(400).json({ message: 'Only Customer role is allowed for registration' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO KodUser (uid, username, password, email, phone, role) VALUES (?, ?, ?, ?, ?, ?)',
            [uid, username, hashedPassword, email, phone, 'Customer']
        );
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ message: 'Username or Email already exists' });
        }
        res.status(500).json({ message: 'Error registering user' });
    }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM KodUser WHERE username = ?', [username]);
        const user = rows[0];

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT
        const token = jwt.sign(
            { username: user.username, role: user.role, uid: user.uid },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Store token in UserToken table
        const expiry = new Date(Date.now() + 3600 * 1000); // 1 hour from now
        await pool.query(
            'INSERT INTO UserToken (token, uid, expiry) VALUES (?, ?, ?)',
            [token, user.uid, expiry]
        );

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600 * 1000
        });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error during login' });
    }
});

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

// Check Balance Endpoint
app.get('/api/balance', authenticateToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT balance FROM KodUser WHERE uid = ?', [req.user.uid]);
        if (rows.length === 0) return res.status(404).json({ message: 'User not found' });

        res.json({ balance: rows[0].balance });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching balance' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
