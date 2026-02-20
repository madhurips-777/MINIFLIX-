import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import * as mockDb from '../mockDb';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [balance, setBalance] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [pin, setPin] = useState('');
    const [showPinInput, setShowPinInput] = useState(false);
    const [depositAmount, setDepositAmount] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const details = mockDb.getUserDetails();
        if (!details) navigate('/login');
        else setUser(details);
    }, [navigate]);

    const handleCheckBalance = async () => {
        if (!showPinInput) {
            setShowPinInput(true);
            return;
        }

        setLoading(true);
        try {
            const token = mockDb.getCurrentToken();
            const res = await mockDb.getBalance(token, pin);
            setBalance(res.data.balance);
            setError('');
            setShowPinInput(false);
            setPin('');

            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6366f1', '#10b981', '#ffffff']
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch balance');
            setBalance(null);
        } finally {
            setLoading(false);
        }
    };

    const handleDeposit = async (e) => {
        e.preventDefault();
        if (!depositAmount || isNaN(depositAmount)) return;

        setLoading(true);
        try {
            const token = mockDb.getCurrentToken();
            const res = await mockDb.depositCredits(token, depositAmount);
            setBalance(res.data.balance);
            setDepositAmount('');
            setError('Deposit successful!');
            setTimeout(() => setError(''), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Deposit failed');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        mockDb.logout();
        navigate('/login');
    };

    const qrUrl = user ? `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=kodbank://deposit/${user.uid}` : '';

    return (
        <div className="auth-container dashboard-card" style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>Banking Portal</h2>
                <button onClick={handleLogout} style={{ width: 'auto', background: 'transparent', padding: '5px 10px', fontSize: '0.8rem' }}>Logout</button>
            </div>

            {error && <div className={`error-message ${error === 'Deposit successful!' ? 'success' : ''}`}
                style={error === 'Deposit successful!' ? { color: 'var(--success)', borderColor: 'var(--success)' } : {}}>{error}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', textAlign: 'left' }}>
                {/* Left Side: Balance & PIN */}
                <div style={{ background: 'var(--glass)', padding: '20px', borderRadius: '15px' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Account Balance</h3>
                    {balance !== null ? (
                        <div className="balance-display" style={{ fontSize: '2rem', margin: '15px 0' }}>
                            ${new Intl.NumberFormat().format(balance)}
                        </div>
                    ) : (
                        <div style={{ margin: '15px 0', minHeight: '60px', display: 'flex', alignItems: 'center' }}>
                            {showPinInput ? (
                                <input
                                    type="password"
                                    maxLength="4"
                                    placeholder="Enter 4-Digit PIN"
                                    value={pin}
                                    onChange={(e) => setPin(e.target.value)}
                                    style={{ padding: '10px' }}
                                />
                            ) : (
                                <span style={{ color: 'var(--text-muted)' }}>Security verification required</span>
                            )}
                        </div>
                    )}
                    <button onClick={handleCheckBalance} disabled={loading}>
                        {loading ? 'Verifying...' : balance !== null ? 'Refresh Balance' : showPinInput ? 'Unlock' : 'Check Balance'}
                    </button>
                </div>

                {/* Right Side: QR Code */}
                <div style={{ background: 'var(--glass)', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '10px' }}>Deposit QR</h3>
                    {user && (
                        <div style={{ background: 'white', padding: '10px', display: 'inline-block', borderRadius: '10px' }}>
                            <img src={qrUrl} alt="Deposit QR Code" style={{ width: '120px', height: '120px' }} />
                        </div>
                    )}
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '10px' }}>Scan to transfer funds</p>
                </div>
            </div>

            {/* Bottom: Deposit Form */}
            <div style={{ marginTop: '20px', background: 'var(--glass)', padding: '20px', borderRadius: '15px' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '15px' }}>Deposit Credits</h3>
                <form onSubmit={handleDeposit} style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="number"
                        placeholder="Amount to deposit"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <button type="submit" style={{ width: 'auto', padding: '0 20px' }} disabled={loading}>Deposit</button>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;
