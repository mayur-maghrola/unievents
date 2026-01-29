
import React, { useState } from 'react';
import { Page, User } from '../types';

interface NavbarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate, onLogout, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navItems = [
    { label: 'Home', value: 'dashboard' as Page },
    { label: 'All Events', value: 'all-events' as Page },
    { label: 'My Registered Events', value: 'my-registered-events' as Page },
    { label: 'My Events', value: 'my-events' as Page },
    { label: 'Create Event', value: 'create-event' as Page },
  ];

  return (
    <nav className="bg-[#003366] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onNavigate('dashboard')}>
              <span className="font-extrabold text-2xl tracking-tighter">Uni<span className="text-blue-400">Events</span></span>
            </div>
            <div className="hidden md:ml-10 md:flex md:space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.value)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activePage === item.value ? 'bg-[#002244] text-white' : 'text-gray-300 hover:text-white hover:bg-[#004488]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 focus:outline-none bg-[#004488] px-3 py-1.5 rounded-full hover:bg-[#0055aa] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-sm uppercase">
                  {user?.fullName?.charAt(0) || user?.email.charAt(0)}
                </div>
                <span className="hidden sm:inline text-sm font-medium">{user?.fullName || 'Student'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-50 text-gray-700">
                  <div className="px-4 py-2 border-b text-xs text-gray-400">
                    {user?.email}
                  </div>
                  <button onClick={onLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                    Sign out
                  </button>
                </div>
              )}
            </div>

            <div className="md:hidden ml-4">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-[#004488] focus:outline-none"
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
