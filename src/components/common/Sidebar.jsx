// src/components/common/Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  Bed, 
  Clock, 
  Pill, 
  Package, 
  FileText, 
  AlertTriangle, 
  FlaskConical, 
  ScanBarcode, 
  Cpu, 
  FileBarChart, 
  Scan, 
  Image, 
  Database,
  ChevronDown,
  ChevronRight,
  Activity,
  X,
  LogOut
} from 'lucide-react';

const Sidebar = ({ user, isMobile, onClose, onLogout }) => {
  const [expanded, setExpanded] = useState({
    opd: true,
    pharmacy: false,
    lab: false,
    radiology: false
  });

  const toggleSection = (section) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleNavClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  const navLinkClass = ({ isActive }) => 
    `flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 ${
      isActive 
        ? 'bg-blue-600 text-white border-r-4 border-blue-400' 
        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
    }`;

  const subNavLinkClass = ({ isActive }) => 
    `flex items-center px-8 py-2 text-sm transition-colors duration-200 ${
      isActive 
        ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-400' 
        : 'text-gray-500 hover:text-blue-600 hover:bg-gray-50'
    }`;

  const menuSections = [
    {
      id: 'opd',
      label: 'OPD / IPD',
      icon: Users,
      links: [
        { to: '/opd', label: 'Outpatient Dashboard' },
        { to: '/ipd', label: 'Inpatient Dashboard' },
        { to: '/beds', label: 'Bed Allocation' },
        { to: '/queue', label: 'Patient Queue' },
      ]
    },
    {
      id: 'pharmacy',
      label: 'Pharmacy',
      icon: Pill,
      links: [
        { to: '/pharmacy', label: 'Pharmacy Dashboard' },
        { to: '/inventory', label: 'Inventory' },
        { to: '/prescriptions', label: 'Prescription Sync' },
        { to: '/expiry', label: 'Expiry Management' },
      ]
    },
    {
      id: 'lab',
      label: 'Laboratory',
      icon: FlaskConical,
      links: [
        { to: '/laboratory', label: 'Lab Dashboard' },
        { to: '/samples', label: 'Sample Tracking' },
        { to: '/machines', label: 'Machine Interface' },
        { to: '/reports', label: 'Report Generation' },
      ]
    },
    {
      id: 'radiology',
      label: 'Radiology',
      icon: Scan,
      links: [
        { to: '/radiology', label: 'Radiology Dashboard' },
        { to: '/pacs', label: 'PACS Viewer' },
        { to: '/dicom', label: 'DICOM Manager' },
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header - Logo + Close Button */}
      <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center flex-shrink-0">
            <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-gray-800 truncate">MedCore</h1>
            <p className="text-xs text-gray-500 hidden sm:block">Hospital Management</p>
          </div>
        </div>
        
        {/* Mobile Close Button */}
        {isMobile && (
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {menuSections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expanded[section.id];
          
          return (
            <div key={section.id} className="mb-1">
              <button 
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="truncate">{section.label}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 flex-shrink-0 ml-2" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0 ml-2" />
                )}
              </button>
              
              {isExpanded && (
                <div className="bg-gray-50/50">
                  {section.links.map((link) => (
                    <NavLink 
                      key={link.to}
                      to={link.to} 
                      onClick={handleNavClick}
                      className={subNavLinkClass}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer - User Info */}
      <div className="border-t border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0">
            <span className="text-sm sm:text-base font-bold text-white">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name || 'Unknown User'}
            </p>
            <p className="text-xs text-gray-500 truncate capitalize">
              {user?.role || 'Staff'}
            </p>
          </div>
          
          {/* Mobile Logout Button */}
          {isMobile && onLogout && (
            <button 
              onClick={onLogout}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;