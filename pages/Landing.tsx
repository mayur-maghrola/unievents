
import React from 'react';
import { Page } from '../types';

interface LandingProps {
  onNavigate: (page: Page) => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  return (
    <div className="relative h-screen flex flex-col overflow-hidden">
      {/* Background Image: CHARUSAT Campus Simulant */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1920" 
          alt="Campus Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#001a33] via-transparent to-black/20"></div>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-24 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-white font-extrabold text-3xl tracking-tighter drop-shadow-lg">
              Uni<span className="text-blue-400">Events</span>
            </span>
          </div>
          <div className="flex space-x-6">
            <button 
              onClick={() => onNavigate('login')}
              className="text-white hover:text-blue-300 transition-colors font-semibold text-lg drop-shadow-md"
            >
              Login
            </button>
            <button 
              onClick={() => onNavigate('register-step-1')}
              className="bg-white text-[#003366] hover:bg-blue-50 transition-all font-bold px-8 py-3 rounded-xl shadow-2xl transform hover:scale-105 active:scale-95"
            >
              Register
            </button>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 flex-grow flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-8 drop-shadow-2xl leading-tight">
            UniEvents <br />
            <span className="text-blue-400">Portal</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-50 font-medium mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            A simple and professional way to manage your university event registrations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <button 
              onClick={() => onNavigate('register-step-1')}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black py-5 px-12 rounded-2xl text-xl shadow-2xl transition-all transform hover:-translate-y-1"
            >
              Get Started
            </button>
            <button 
              onClick={() => onNavigate('login')}
              className="w-full sm:w-auto bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white font-bold py-5 px-12 rounded-2xl text-xl transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 pb-10 text-center">
        <p className="text-white/60 text-sm font-medium tracking-widest uppercase">
          Exclusive for CHARUSAT University Students
        </p>
      </div>
    </div>
  );
};

export default Landing;
