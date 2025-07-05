import React from 'react'
import AnimatedBackground from '../../components/AnimatedBackground';

export const HomePage = () => {
  return (
     <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-purple-600">
              Unleash Your Imagination
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-200 mb-12 max-w-2xl mx-auto leading-relaxed">
            Where thoughts transform into words and ideas blossom in a spectrum of purple hues.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 text-lg font-medium rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-gradient-to-r hover:from-violet-600 hover:to-purple-700">
              Write Something...
            </button>
            
            <button className="px-8 py-4 text-lg font-medium rounded-full bg-purple-900/30 border-2 border-violet-400 text-violet-200 hover:bg-purple-800/40 hover:text-white shadow-lg hover:shadow-violet-500/20 transform hover:scale-105 transition-all duration-300">
              Explore Blogs!!
            </button>
          </div>
        </div>
        
        
      </div>
    </div>
  );
}
