import React from 'react';
import Navbar from '../components/Navbar';
import MovieRow from '../components/MovieRow';

const Home = () => {
    const trendingMovies = [
        { title: "Stranger Things", image: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80\u0026w=2070" },
        { title: "The Witcher", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80\u0026w=1925" },
        { title: "Arcane", image: "https://images.unsplash.com/photo-1542204172-356399558651?q=80\u0026w=1974" },
        { title: "Breaking Bad", image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80\u0026w=2070" },
        { title: "Money Heist", image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80\u0026w=2070" },
        { title: "Suits", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80\u0026w=2059" },
    ];

    const popularMovies = [
        { title: "Inception", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80\u0026w=2070" },
        { title: "The Dark Knight", image: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80\u0026w=2070" },
        { title: "Interstellar", image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80\u0026w=2070" },
        { title: "Parasite", image: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80\u0026w=1935" },
        { title: "Spider-Man", image: "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?q=80\u0026w=1974" },
        { title: "Joker", image: "https://images.unsplash.com/photo-1559582930-bb01987cf4dd?q=80\u0026w=2076" },
    ];

    return (
        <div className="home-container relative">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[80vh] md:h-[95vh] w-full">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80\u0026w=2070\u0026auto=format\u0026fit=crop')` }}>
                    <div className="hero-overlay absolute inset-0 bg-black/40" />
                </div>

                <div className="absolute bottom-[10%] left-[4%] md:left-[8%] max-w-[90%] md:max-w-[40%] space-y-4 md:space-y-6">
                    <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter leading-none uppercase drop-shadow-2xl">
                        THE <span className="text-[#E50914]">VIBE</span> CODE
                    </h2>
                    <p className="text-lg md:text-xl text-gray-200 font-medium line-clamp-3">
                        In a world of logic, one programmer breaks all the rules. Experience the most thrilling coding adventure of the year.
                    </p>

                    <div className="flex gap-4 pt-2">
                        <button className="bg-white text-black px-6 md:px-10 py-2 md:py-3 rounded flex items-center gap-2 font-bold text-lg hover:bg-white/90 transition-all active:scale-95">
                            <span>▶ Play</span>
                        </button>
                        <button className="bg-gray-500/60 text-white px-6 md:px-10 py-2 md:py-3 rounded flex items-center gap-2 font-bold text-lg hover:bg-gray-500/40 transition-all active:scale-95 backdrop-blur-md">
                            <span>ⓘ More Info</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Row Sections */}
            <div className="relative z-10 -mt-10 md:-mt-24 pb-20">
                <MovieRow title="Trending Now" movies={trendingMovies} />
                <MovieRow title="Top Rated on MINIFLIX" movies={popularMovies} />
                <MovieRow title="Action \u0026 Thriller" movies={[...trendingMovies].reverse()} />
                <MovieRow title="Sci-Fi Movies" movies={[...popularMovies].reverse()} />
            </div>

            {/* Footer Spacer */}
            <footer className="px-4 md:px-12 py-10 border-t border-gray-800 text-gray-500 text-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="flex flex-col gap-2">
                        <p className="cursor-pointer hover:underline">Audio Description</p>
                        <p className="cursor-pointer hover:underline">Help Centre</p>
                        <p className="cursor-pointer hover:underline">Gift Cards</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="cursor-pointer hover:underline">Media Centre</p>
                        <p className="cursor-pointer hover:underline">Investor Relations</p>
                        <p className="cursor-pointer hover:underline">Jobs</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="cursor-pointer hover:underline">Terms of Use</p>
                        <p className="cursor-pointer hover:underline">Privacy</p>
                        <p className="cursor-pointer hover:underline">Legal Notices</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="cursor-pointer hover:underline">Corporate Information</p>
                        <p className="cursor-pointer hover:underline">Contact Us</p>
                    </div>
                </div>
                <p className="mt-10">© 1997-2026 MINIFLIX, Inc.</p>
            </footer>
        </div>
    );
};

export default Home;
