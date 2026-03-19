// src/components/pharmacy/PrescriptionSync.jsx
import React, { useState } from 'react';
import { RefreshCw, CheckCircle, Clock, AlertCircle, FileText, User, ChevronDown, ChevronUp } from 'lucide-react';
import Card from '../common/Card';

const PrescriptionSync = () => {
  const [prescriptions] = useState([
    { id: 'RX-2024-089', patient: 'John Smith', doctor: 'Dr. Sarah Johnson', date: '2024-03-19 10:30', medicines: 3, status: 'synced', syncTime: '10:31 AM' },
    { id: 'RX-2024-090', patient: 'Emily Davis', doctor: 'Dr. Michael Chen', date: '2024-03-19 10:45', medicines: 2, status: 'pending', syncTime: null },
    { id: 'RX-2024-091', patient: 'Robert Wilson', doctor: 'Dr. James Wilson', date: '2024-03-19 11:00', medicines: 4, status: 'synced', syncTime: '11:01 AM' },
    { id: 'RX-2024-092', patient: 'Lisa Anderson', doctor: 'Dr. Maria Garcia', date: '2024-03-19 11:15', medicines: 1, status: 'error', syncTime: null },
  ]);

  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const getStatusStyles = (status) => {
    switch(status) {
      case 'synced':
        return { bg: 'bg-green-100', text: 'text-green-600', badge: 'bg-green-100 text-green-700', label: 'Synced' };
      case 'pending':
        return { bg: 'bg-yellow-100', text: 'text-yellow-600', badge: 'bg-yellow-100 text-yellow-700', label: 'Pending' };
      case 'error':
        return { bg: 'bg-red-100', text: 'text-red-600', badge: 'bg-red-100 text-red-700', label: 'Error' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-600', badge: 'bg-gray-100 text-gray-700', label: 'Unknown' };
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 px-4 md:px-0">
      {/* Header - Stack on mobile */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Prescription Sync</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">Automated prescription synchronization from EMR</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md text-sm md:text-base">
          <RefreshCw className="w-4 h-4" />
          <span>Sync Now</span>
        </button>
      </div>

      {/* Stats Cards - Stack on mobile, 3 columns on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
        <Card className="bg-green-50 border-green-200 p-4 md:p-6">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-2.5 md:p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold text-green-700">156</p>
              <p className="text-xs md:text-sm text-green-600">Synced Today</p>
            </div>
          </div>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200 p-4 md:p-6">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-2.5 md:p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold text-yellow-700">12</p>
              <p className="text-xs md:text-sm text-yellow-600">Pending Sync</p>
            </div>
          </div>
        </Card>
        <Card className="bg-red-50 border-red-200 p-4 md:p-6">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-2.5 md:p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
            </div>
            <div>
              <p className="text-xl md:text-2xl font-bold text-red-700">3</p>
              <p className="text-xs md:text-sm text-red-600">Sync Errors</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Recent Prescriptions" className="p-4 md:p-6">
        <div className="space-y-3 md:space-y-4">
          {prescriptions.map((rx) => {
            const styles = getStatusStyles(rx.status);
            const isExpanded = expandedCard === rx.id;
            
            return (
              <div 
                key={rx.id} 
                className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Desktop Layout - Hidden on mobile */}
                <div className="hidden md:flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${styles.bg}`}>
                      <FileText className={`w-6 h-6 ${styles.text}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{rx.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles.badge}`}>
                          {styles.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {rx.patient}
                        </span>
                        <span>•</span>
                        <span>{rx.doctor}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900 font-medium">{rx.medicines} medicines</p>
                    <p className="text-xs text-gray-500">{rx.date}</p>
                    {rx.syncTime && <p className="text-xs text-green-600 mt-1">Synced at {rx.syncTime}</p>}
                  </div>
                </div>

                {/* Mobile Layout - Visible only on mobile */}
                <div className="md:hidden">
                  <div 
                    className="p-4 cursor-pointer"
                    onClick={() => toggleCard(rx.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-lg flex-shrink-0 ${styles.bg}`}>
                        <FileText className={`w-5 h-5 ${styles.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900 text-sm">{rx.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles.badge}`}>
                            {styles.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900 font-medium truncate">{rx.patient}</p>
                        <p className="text-xs text-gray-500 truncate">{rx.doctor}</p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-600">{rx.medicines} medicines</span>
                          <span className="text-xs text-gray-400">{rx.date.split(' ')[1]}</span>
                        </div>
                        
                        {rx.syncTime && (
                          <p className="text-xs text-green-600 mt-1">Synced at {rx.syncTime}</p>
                        )}
                      </div>
                      <div className="flex-shrink-0 mt-1">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                    
                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-gray-200/50 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Date:</span>
                          <span className="text-gray-700">{rx.date}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Medicines:</span>
                          <span className="text-gray-700">{rx.medicines}</span>
                        </div>
                        {rx.syncTime && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Synced at:</span>
                            <span className="text-green-600">{rx.syncTime}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default PrescriptionSync;