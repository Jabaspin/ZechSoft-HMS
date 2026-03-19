// src/components/common/Layout.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobile(mobile);
      
      // Auto-toggle sidebar based on screen size
      if (mobile) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && sidebarOpen) {
        const sidebar = document.getElementById('sidebar');
        const menuButton = document.getElementById('menu-button');
        
        if (sidebar && !sidebar.contains(e.target) && !menuButton?.contains(e.target)) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, sidebarOpen]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobile, sidebarOpen]);

  // Toggle sidebar handler
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  // Close sidebar handler (for mobile)
  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 backdrop-blur-sm transition-opacity duration-300"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isMobile 
            ? sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            : 'translate-x-0'
          }
          flex flex-col h-full
        `}
      >
        <Sidebar 
          user={user} 
          isMobile={isMobile}
          onClose={closeSidebar}
          onLogout={onLogout}
        />
      </aside>

      {/* Main Content Area */}
      <div className={`
        flex-1 flex flex-col min-w-0
        transition-all duration-300
        ${!isMobile ? 'lg:ml-0' : ''}
      `}>
        <Header 
          user={user} 
          onLogout={onLogout}
          onMenuToggle={toggleSidebar}
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
        />
        
        <main className={`
          flex-1 overflow-auto
          p-3 sm:p-4 lg:p-6
          ${isMobile && sidebarOpen ? 'pointer-events-none' : ''}
        `}>
          {/* Mobile Context Header */}
          <div className="lg:hidden mb-4 flex items-center justify-between">
            {user && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">
                  {user.role || 'Dashboard'}
                </p>
                <h2 className="text-lg font-semibold text-gray-800">
                  Welcome back, {user.name?.split(' ')[0] || 'User'}
                </h2>
              </div>
            )}
          </div>
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;