import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as mockDb from '../mockDb';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await mockDb.loginUser(formData);
            navigate('/userdashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h1>Welcome Back</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Username</label>
                    <input name="username" placeholder="Username" onChange={handleChange} required />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Login to Kodbank'}
                </button>
            </form>
            <p className="link-text">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default Login;
