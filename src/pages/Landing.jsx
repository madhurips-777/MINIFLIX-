import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Landing = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleGetStarted = (e) => {
        e.preventDefault();
        navigate('/signup');
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden font-sans text-white">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 bg-cover bg-center brightness-[0.4]"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80\u0026w=2062')` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
            </div>

            {/* Navbar Overlay */}
            <nav className="absolute top-0 w-full flex justify-between items-center p-6 md:px-12 z-20">
                <h1 className="text-[#E50914] text-3xl md:text-5xl font-black tracking-tighter">MINIFLIX</h1>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-[#E50914] text-white px-5 py-1.5 rounded font-bold text-sm hover:bg-[#b90610] transition-colors"
                >
                    Sign In
                </button>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-[950px] px-6 text-center space-y-6">
                <h2 className="text-4xl md:text-7xl font-black leading-tight drop-shadow-lg">
                    Unlimited movies, TV <br className="hidden md:block" /> shows and more.
                </h2>
                <p className="text-xl md:text-2xl font-medium drop-shadow-md">
                    Watch anywhere. Cancel anytime.
                </p>
                <p className="text-lg md:text-xl font-medium">
                    Ready to watch? Enter your email to create or restart your membership.
                </p>

                {/* Email Subscription Form */}
                <form onSubmit={handleGetStarted} className="flex flex-col md:flex-row items-center justify-center gap-2 mt-8">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full md:w-[450px] p-4 md:p-5 bg-black/40 border border-gray-500 rounded text-lg backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full md:w-auto px-8 py-4 md:py-5 bg-[#E50914] text-white rounded font-bold text-2xl hover:bg-[#b90610] transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        Get Started <ChevronRight className="size-8" />
                    </button>
                </form>
            </div>

            {/* Bottom Gradient for Separation */}
            <div className="absolute bottom-0 w-full h-[150px] bg-gradient-to-t from-black to-transparent" />

            {/* Mini Info Section */}
            <div className="relative z-10 mt-20 text-center text-gray-400 text-sm hidden md:block">
                <p>The only place where code meets cinematic magic.</p>
            </div>
        </div>
    );
};

export default Landing;
