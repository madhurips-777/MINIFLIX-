import React, { useState, useEffect } from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ activeCategory, setActiveCategory }) => {
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

    const handleCategoryClick = (category) => {
        if (setActiveCategory) {
            setActiveCategory(category);
        } else {
            navigate('/');
        }
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 ${isScrolled ? 'bg-[#141414]' : 'nav-gradient'}`}>
            <div className="px-4 md:px-12 py-4 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <h1 className="text-[#E50914] text-2xl md:text-3xl font-black tracking-tighter cursor-pointer" onClick={() => handleCategoryClick('Home')}>MINIFLIX</h1>

                    <ul className="hidden md:flex gap-4 text-sm font-medium text-gray-200">
                        <li
                            className={`hover:text-white cursor-pointer transition-colors ${activeCategory === 'Home' ? 'text-white font-bold underline underline-offset-8 decoration-[#E50914] decoration-2' : ''}`}
                            onClick={() => handleCategoryClick('Home')}
                        >
                            Home
                        </li>
                        <li
                            className={`hover:text-white cursor-pointer transition-colors ${activeCategory === 'TV Shows' ? 'text-white font-bold underline underline-offset-8 decoration-[#E50914] decoration-2' : ''}`}
                            onClick={() => handleCategoryClick('TV Shows')}
                        >
                            TV Shows
                        </li>
                        <li
                            className={`hover:text-white cursor-pointer transition-colors ${activeCategory === 'Movies' ? 'text-white font-bold underline underline-offset-8 decoration-[#E50914] decoration-2' : ''}`}
                            onClick={() => handleCategoryClick('Movies')}
                        >
                            Movies
                        </li>
                        <li
                            className={`hover:text-white cursor-pointer transition-colors ${activeCategory === 'New & Popular' ? 'text-white font-bold underline underline-offset-8 decoration-[#E50914] decoration-2' : ''}`}
                            onClick={() => handleCategoryClick('New & Popular')}
                        >
                            New & Popular
                        </li>
                        <li
                            className={`hover:text-white cursor-pointer transition-colors ${activeCategory === 'My List' ? 'text-white font-bold underline underline-offset-8 decoration-[#E50914] decoration-2' : ''}`}
                            onClick={() => handleCategoryClick('My List')}
                        >
                            My List
                        </li>
                    </ul>
                </div>

                <div className="flex items-center gap-6 text-white">
                    <Search className="size-5 cursor-pointer hover:text-gray-300" />
                    <Bell className="size-5 cursor-pointer hover:text-gray-300" />
                    <div className="group relative">
                        <div className="size-8 bg-[#E50914] rounded flex items-center justify-center cursor-pointer overflow-hidden border border-white/20">
                            <User className="size-5" />
                        </div>
                        <div className="absolute right-0 top-full mt-2 w-32 bg-black/90 border border-gray-700 hidden group-hover:block rounded-sm py-2 text-xs">
                            <p
                                className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                                onClick={() => {
                                    localStorage.removeItem('miniflix_user');
                                    navigate('/login');
                                    window.location.reload();
                                }}
                            >
                                Sign Out
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
