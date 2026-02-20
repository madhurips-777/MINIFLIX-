import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Plus } from 'lucide-react';

const MovieRow = ({ title, movies }) => {
    const rowRef = useRef(null);

    const scroll = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };

    return (
        <div className="space-y-2 md:space-y-4 px-4 md:px-12 mt-8 md:mt-12 group">
            <h2 className="text-xl md:text-2xl font-bold text-gray-200 transition-colors cursor-pointer hover:text-white inline-flex items-center gap-2">
                {title} <ChevronRight className="size-4 md:size-6 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h2>

            <div className="relative group/row">
                <div
                    className="absolute left-0 top-0 bottom-4 w-12 z-20 flex items-center justify-center bg-black/60 opacity-0 group-hover/row:opacity-100 transition-opacity cursor-pointer text-white"
                    onClick={() => scroll('left')}
                >
                    <ChevronLeft className="size-8" />
                </div>

                <div
                    ref={rowRef}
                    className="row-container flex gap-2 md:gap-3 overflow-x-auto pb-4"
                >
                    {movies.map((movie, index) => (
                        <div key={index} className="relative min-w-[200px] md:min-w-[300px] aspect-video rounded-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-30 group/item bg-[#2f2f2f]">
                            <img
                                src={movie.image}
                                alt={movie.title}
                                className="w-full h-full object-cover rounded-md"
                            />

                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/item:opacity-100 transition-opacity flex flex-col justify-end p-4 space-y-2">
                                <div className="flex gap-2">
                                    <button className="bg-white text-black size-8 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all active:scale-95">
                                        <Play className="size-4 fill-black" />
                                    </button>
                                    <button className="bg-[#2a2a2a]/60 text-white size-8 rounded-full border-2 border-gray-400 flex items-center justify-center hover:border-white transition-all active:scale-95">
                                        <Plus className="size-4" />
                                    </button>
                                </div>
                                <h3 className="text-sm md:text-base font-bold truncate">{movie.title}</h3>
                                <div className="flex items-center gap-2 text-[10px] md:text-xs">
                                    <span className="text-green-500 font-bold">98% Match</span>
                                    <span className="border border-gray-400 px-1 rounded-sm text-gray-400 uppercase">HD</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className="absolute right-0 top-0 bottom-4 w-12 z-20 flex items-center justify-center bg-black/60 opacity-0 group-hover/row:opacity-100 transition-opacity cursor-pointer text-white"
                    onClick={() => scroll('right')}
                >
                    <ChevronRight className="size-8" />
                </div>
            </div>
        </div>
    );
};

export default MovieRow;
