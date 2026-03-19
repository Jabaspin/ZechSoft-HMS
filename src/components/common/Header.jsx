// src/components/common/Header.jsx
import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  LogOut, 
  Settings, 
  Menu, 
  X, 
  User,
  ChevronDown
} from 'lucide-react';

const Header = ({ user, onLogout, onMenuToggle }) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    onMenuToggle?.();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
      {/* Main Header */}
      <div className="h-14 sm:h-16 flex items-center justify-between px-3 sm:px-4 lg:px-6">
        
        {/* Left Section: Menu Button + Search */}
        <div className="flex items-center flex-1 gap-2 sm:gap-4">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={handleMenuToggle}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Search */}
          <div className="hidden sm:block relative flex-1 max-w-md lg:max-w-lg xl:max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input 
              type="text" 
              placeholder="Search patients, records, or medications..." 
              className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Mobile Search Toggle */}
          <button 
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="sm:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle search"
          >
            {mobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>
        </div>

        {/* Right Section: Actions + User */}
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          {/* Settings - Hidden on smallest screens */}
          <button className="hidden sm:flex p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>

          {/* Divider - Hidden on mobile */}
          <div className="hidden sm:block h-8 w-px bg-gray-300 mx-1 lg:mx-2"></div>

          {/* User Info - Tablet/Desktop */}
          {user && (
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name || 'User'}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role || 'Staff'}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button 
            onClick={onLogout}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Bar - Expandable */}
      {mobileSearchOpen && (
        <div className="sm:hidden px-3 pb-3 border-t border-gray-100">
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search..." 
              autoFocus
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50"
            />
          </div>
        </div>
      )}

      {/* Mobile User Info Bar */}
      {user && (
        <div className="md:hidden px-3 py-2 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user.name || 'User'}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role || 'Staff'}</p>
            </div>
          </div>
          <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg sm:hidden">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;