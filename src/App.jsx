import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/userdashboard" element={<Dashboard />} />
                <Route path="/" element={<Navigate to="/register" />} />
            </Routes>
        </Router>
    );
}

export default App;
