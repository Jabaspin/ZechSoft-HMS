// src/components/pharmacy/PrescriptionSync.jsx
import React, { useState } from 'react';
import { RefreshCw, CheckCircle, Clock, AlertCircle, FileText, User } from 'lucide-react';
import Card from '../common/Card';

const PrescriptionSync = () => {
  const [prescriptions] = useState([
    { id: 'RX-2024-089', patient: 'John Smith', doctor: 'Dr. Sarah Johnson', date: '2024-03-19 10:30', medicines: 3, status: 'synced', syncTime: '10:31 AM' },
    { id: 'RX-2024-090', patient: 'Emily Davis', doctor: 'Dr. Michael Chen', date: '2024-03-19 10:45', medicines: 2, status: 'pending', syncTime: null },
    { id: 'RX-2024-091', patient: 'Robert Wilson', doctor: 'Dr. James Wilson', date: '2024-03-19 11:00', medicines: 4, status: 'synced', syncTime: '11:01 AM' },
    { id: 'RX-2024-092', patient: 'Lisa Anderson', doctor: 'Dr. Maria Garcia', date: '2024-03-19 11:15', medicines: 1, status: 'error', syncTime: null },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Prescription Sync</h1>
          <p className="text-gray-500 mt-1">Automated prescription synchronization from EMR</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">
          <RefreshCw className="w-4 h-4" />
          Sync Now
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-green-50 border-green-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-700">156</p>
              <p className="text-sm text-green-600">Synced Today</p>
            </div>
          </div>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-700">12</p>
              <p className="text-sm text-yellow-600">Pending Sync</p>
            </div>
          </div>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-700">3</p>
              <p className="text-sm text-red-600">Sync Errors</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Recent Prescriptions">
        <div className="space-y-4">
          {prescriptions.map((rx) => (
            <div key={rx.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${
                  rx.status === 'synced' ? 'bg-green-100' :
                  rx.status === 'pending' ? 'bg-yellow-100' :
                  'bg-red-100'
                }`}>
                  <FileText className={`w-6 h-6 ${
                    rx.status === 'synced' ? 'text-green-600' :
                    rx.status === 'pending' ? 'text-yellow-600' :
                    'text-red-600'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{rx.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      rx.status === 'synced' ? 'bg-green-100 text-green-700' :
                      rx.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {rx.status === 'synced' ? 'Synced' : rx.status === 'pending' ? 'Pending' : 'Error'}
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
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PrescriptionSync;