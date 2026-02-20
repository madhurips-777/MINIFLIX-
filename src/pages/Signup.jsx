import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Simulate signup
        localStorage.setItem('miniflix_user', JSON.stringify({ email }));
        navigate('/');
        window.location.reload();
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden font-sans">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center brightness-50"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80\u0026w=2062')` }}>
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <nav className="absolute top-0 left-0 p-8 w-full flex justify-between items-center z-20">
                <h1 className="text-[#E50914] text-4xl font-black tracking-tighter cursor-pointer" onClick={() => navigate('/login')}>MINIFLIX</h1>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-[#E50914] text-white px-4 py-1.5 rounded text-sm font-bold hover:bg-[#b90610] transition-colors"
                >
                    Sign In
                </button>
            </nav>

            <div className="relative z-10 w-full max-w-[450px] p-12 md:p-16 bg-black/75 rounded-md backdrop-blur-sm self-center">
                <h2 className="text-3xl font-bold mb-8">Unlimited movies, TV shows and more.</h2>
                <p className="text-gray-300 text-sm mb-6">Ready to watch? Enter your email to create or restart your membership.</p>

                <form onSubmit={handleSignup} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full p-4 bg-[#333] rounded border-none text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Add a password"
                        className="w-full p-4 bg-[#333] rounded border-none text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm password"
                        className="w-full p-4 bg-[#333] rounded border-none text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full py-4 bg-[#E50914] text-white rounded font-bold text-xl hover:bg-[#b90610] transition-all active:scale-[0.98] mt-4"
                    >
                        Get Started \u003e
                    </button>
                </form>

                <div className="mt-16 text-gray-500">
                    <p>Already have an account? <span className="text-white hover:underline cursor-pointer" onClick={() => navigate('/login')}>Sign in now.</span></p>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 w-full bg-black/80 py-8 px-10 text-gray-500 text-sm border-t border-gray-800">
                <p className="mb-4">Questions? Call 000-800-919-1694</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 underline">
                    <p className="cursor-pointer">FAQ</p>
                    <p className="cursor-pointer">Help Centre</p>
                    <p className="cursor-pointer">Terms of Use</p>
                    <p className="cursor-pointer">Privacy</p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
