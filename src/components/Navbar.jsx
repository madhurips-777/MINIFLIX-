import React, { useState, useEffect } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-[#141414]' : 'nav-gradient'}`}>
            <div className="px-4 md:px-12 py-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <h1 className="text-[#E50914] text-2xl md:text-3xl font-black tracking-tighter cursor-pointer" onClick={() => navigate('/')}>MINIFLIX</h1>

                    <ul className="hidden md:flex gap-4 text-sm font-medium text-gray-200">
                        <li className="hover:text-white cursor-pointer transition-colors text-white" onClick={() => navigate('/')}>Home</li>
                        <li className="hover:text-white cursor-pointer transition-colors">TV Shows</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Movies</li>
                        <li className="hover:text-white cursor-pointer transition-colors">New \u0026 Popular</li>
                        <li className="hover:text-white cursor-pointer transition-colors">My List</li>
                    </ul>
                </div>

                <div className="flex items-center gap-6 text-white">
                    <Search className="size-5 cursor-pointer hover:text-gray-300" />
                    <Bell className="size-5 cursor-pointer hover:text-gray-300" />
                    <div
                        className="size-8 bg-[#E50914] rounded flex items-center justify-center cursor-pointer overflow-hidden border border-white/20"
                        onClick={() => navigate('/login')}
                    >
                        <User className="size-5" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
