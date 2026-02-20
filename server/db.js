const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

let db;

async function initDb() {
    try {
        db = await open({
            filename: path.join(__dirname, 'kodbank.db'),
            driver: sqlite3.Database
        });

        console.log('Connected to SQLite Database');

        // Create KodUser table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS KodUser (
                uid TEXT PRIMARY KEY,
                username TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                balance DECIMAL(15, 2) DEFAULT 100000.00,
                phone TEXT,
                role TEXT DEFAULT 'Customer'
            )
        `);

        // Create UserToken table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS UserToken (
                tid INTEGER PRIMARY KEY AUTOINCREMENT,
                token TEXT NOT NULL,
                uid TEXT NOT NULL,
                expiry DATETIME NOT NULL,
                FOREIGN KEY (uid) REFERENCES KodUser(uid) ON DELETE CASCADE
            )
        `);

        console.log('Database tables initialized');
    } catch (err) {
        console.error('Database initialization failed:', err);
    }
}

// Helper to bridge mysql-style pool.query to sqlite
const pool = {
    query: async (sql, params = []) => {
        // Simple conversion for common queries
        const lowerSql = sql.toLowerCase();
        if (lowerSql.startsWith('select')) {
            const rows = await db.all(sql, params);
            return [rows];
        } else {
            const result = await db.run(sql, params);
            return [result];
        }
    }
};

module.exports = { pool, initDb };
