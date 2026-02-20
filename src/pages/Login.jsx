import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login
        navigate('/');
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center brightness-50"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80\u0026w=2062')` }}>
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <nav className="absolute top-0 left-0 p-8">
                <h1 className="text-[#E50914] text-4xl font-black tracking-tighter">MINIFLIX</h1>
            </nav>

            <div className="relative z-10 w-full max-w-[450px] p-12 md:p-16 bg-black/75 rounded-md backdrop-blur-sm self-center">
                <h2 className="text-3xl font-bold mb-8">Sign In</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email or phone number"
                        className="w-full p-4 bg-[#333] rounded border-none text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-4 bg-[#333] rounded border-none text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-[#E50914] text-white rounded font-bold text-lg hover:bg-[#b90610] transition-colors mt-4"
                    >
                        Sign In
                    </button>
                </form>

                <div className="flex justify-between text-gray-400 text-sm mt-4">
                    <div className="flex items-center gap-1">
                        <input type="checkbox" className="accent-gray-500" />
                        <span>Remember me</span>
                    </div>
                    <span className="hover:underline cursor-pointer">Need help?</span>
                </div>

                <div className="mt-16 text-gray-500">
                    <p>New to MINIFLIX? <span className="text-white hover:underline cursor-pointer" onClick={() => navigate('/login')}>Sign up now.</span></p>
                    <p className="text-xs mt-4">This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className="text-blue-500 hover:underline cursor-pointer">Learn more.</span></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
