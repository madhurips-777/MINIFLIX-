import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
    const isAuthenticated = localStorage.getItem('miniflix_user');

    return (
        <Router>
            <div className="app bg-[#141414] min-h-screen text-white font-sans selection:bg-[#E50914] selection:text-white">
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
