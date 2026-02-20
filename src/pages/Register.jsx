import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as mockDb from '../mockDb';

const Register = () => {
    const [formData, setFormData] = useState({
        uid: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        pin: '',
        role: 'Customer'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.pin.length !== 4) {
            setError('PIN must be 4 digits');
            return;
        }
        setLoading(true);
        try {
            await mockDb.registerUser(formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h1>Create Account</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>UID</label>
                    <input name="uid" placeholder="Enter unique ID" onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Username</label>
                    <input name="username" placeholder="Choose a username" onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="your@email.com" onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Account PIN (4 Digits)</label>
                    <input type="text" name="pin" maxLength="4" placeholder="1234" onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Phone</label>
                    <input name="phone" placeholder="+1234567890" onChange={handleChange} required />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Sign Up'}
                </button>
            </form>
            <p className="link-text">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

export default Register;
