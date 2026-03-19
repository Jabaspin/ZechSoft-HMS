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
  Activity
} from 'lucide-react';

const Sidebar = ({ user }) => {
  const [expanded, setExpanded] = useState({
    opd: true,
    pharmacy: false,
    lab: false,
    radiology: false
  });

  const toggleSection = (section) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
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

  return (
    <div className="w-64 bg-white border-r border-gray-200 fixed h-full shadow-lg z-10">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">MedCore</h1>
            <p className="text-xs text-gray-500">Hospital Management</p>
          </div>
        </div>
      </div>

      <nav className="mt-4">
        {/* OPD/IPD Section */}
        <div className="mb-2">
          <button 
            onClick={() => toggleSection('opd')}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5" />
              <span>OPD / IPD</span>
            </div>
            {expanded.opd ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {expanded.opd && (
            <div className="bg-gray-50">
              <NavLink to="/opd" className={subNavLinkClass}>Outpatient Dashboard</NavLink>
              <NavLink to="/ipd" className={subNavLinkClass}>Inpatient Dashboard</NavLink>
              <NavLink to="/beds" className={subNavLinkClass}>Bed Allocation</NavLink>
              <NavLink to="/queue" className={subNavLinkClass}>Patient Queue</NavLink>
            </div>
          )}
        </div>

        {/* Pharmacy Section */}
        <div className="mb-2">
          <button 
            onClick={() => toggleSection('pharmacy')}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Pill className="w-5 h-5" />
              <span>Pharmacy</span>
            </div>
            {expanded.pharmacy ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {expanded.pharmacy && (
            <div className="bg-gray-50">
              <NavLink to="/pharmacy" className={subNavLinkClass}>Pharmacy Dashboard</NavLink>
              <NavLink to="/inventory" className={subNavLinkClass}>Inventory</NavLink>
              <NavLink to="/prescriptions" className={subNavLinkClass}>Prescription Sync</NavLink>
              <NavLink to="/expiry" className={subNavLinkClass}>Expiry Management</NavLink>
            </div>
          )}
        </div>

        {/* Laboratory Section */}
        <div className="mb-2">
          <button 
            onClick={() => toggleSection('lab')}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <FlaskConical className="w-5 h-5" />
              <span>Laboratory</span>
            </div>
            {expanded.lab ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {expanded.lab && (
            <div className="bg-gray-50">
              <NavLink to="/laboratory" className={subNavLinkClass}>Lab Dashboard</NavLink>
              <NavLink to="/samples" className={subNavLinkClass}>Sample Tracking</NavLink>
              <NavLink to="/machines" className={subNavLinkClass}>Machine Interface</NavLink>
              <NavLink to="/reports" className={subNavLinkClass}>Report Generation</NavLink>
            </div>
          )}
        </div>

        {/* Radiology Section */}
        <div className="mb-2">
          <button 
            onClick={() => toggleSection('radiology')}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Scan className="w-5 h-5" />
              <span>Radiology</span>
            </div>
            {expanded.radiology ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          {expanded.radiology && (
            <div className="bg-gray-50">
              <NavLink to="/radiology" className={subNavLinkClass}>Radiology Dashboard</NavLink>
              <NavLink to="/pacs" className={subNavLinkClass}>PACS Viewer</NavLink>
              <NavLink to="/dicom" className={subNavLinkClass}>DICOM Manager</NavLink>
            </div>
          )}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-sm font-semibold text-blue-600">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;