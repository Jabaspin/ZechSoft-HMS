import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Layout from './components/common/Layout';
import OPDDashboard from './components/opd-ipd/OPDDashboard';
import IPDDashboard from './components/opd-ipd/IPDDashboard';
import BedAllocation from './components/opd-ipd/BedAllocation';
import PatientQueue from './components/opd-ipd/PatientQueue';
import PharmacyDashboard from './components/pharmacy/PharmacyDashboard';
import Inventory from './components/pharmacy/Inventory';
import PrescriptionSync from './components/pharmacy/PrescriptionSync';
import ExpiryManagement from './components/pharmacy/ExpiryManagement';
import LabDashboard from './components/laboratory/LabDashboard';
import SampleTracking from './components/laboratory/SampleTracking';
import MachineInterface from './components/laboratory/MachineInterface';
import ReportGeneration from './components/laboratory/ReportGeneration';
import RadiologyDashboard from './components/radiology/RadiologyDashboard';
import PACSViewer from './components/radiology/PACSViewer';
import DicomManager from './components/radiology/DicomManager';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (credentials) => {
    // Dummy credentials verification
    const validUsers = [
      { username: 'admin', password: 'admin123', role: 'Administrator', name: 'Dr. Sarah Johnson' },
      { username: 'doctor', password: 'doc123', role: 'Doctor', name: 'Dr. Michael Chen' },
      { username: 'nurse', password: 'nurse123', role: 'Nurse', name: 'Emily Williams' },
      { username: 'pharmacist', password: 'pharma123', role: 'Pharmacist', name: 'Robert Martinez' },
      { username: 'labtech', password: 'lab123', role: 'Lab Technician', name: 'Lisa Anderson' },
      { username: 'radiologist', password: 'radio123', role: 'Radiologist', name: 'Dr. James Wilson' }
    ];

    const foundUser = validUsers.find(
      u => u.username === credentials.username && u.password === credentials.password
    );

    if (foundUser) {
      setIsAuthenticated(true);
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <Router>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Layout user={user} onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<Navigate to="/opd" replace />} />
            
            {/* OPD/IPD Routes */}
            <Route path="/opd" element={<OPDDashboard />} />
            <Route path="/ipd" element={<IPDDashboard />} />
            <Route path="/beds" element={<BedAllocation />} />
            <Route path="/queue" element={<PatientQueue />} />
            
            {/* Pharmacy Routes */}
            <Route path="/pharmacy" element={<PharmacyDashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/prescriptions" element={<PrescriptionSync />} />
            <Route path="/expiry" element={<ExpiryManagement />} />
            
            {/* Laboratory Routes */}
            <Route path="/laboratory" element={<LabDashboard />} />
            <Route path="/samples" element={<SampleTracking />} />
            <Route path="/machines" element={<MachineInterface />} />
            <Route path="/reports" element={<ReportGeneration />} />
            
            {/* Radiology Routes */}
            <Route path="/radiology" element={<RadiologyDashboard />} />
            <Route path="/pacs" element={<PACSViewer />} />
            <Route path="/dicom" element={<DicomManager />} />
          </Routes>
        </Layout>
      )}
    </Router>
  );
}

export default App;