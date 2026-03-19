// src/components/opd-ipd/IPDDashboard.jsx
import React, { useState } from 'react';
import { Bed, Users, Clock, AlertCircle, Plus, Search, Filter } from 'lucide-react';
import Card from '../common/Card';

const IPDDashboard = () => {
  const [admissions] = useState([
    { id: 'IPD-2024-089', name: 'Thomas Anderson', age: 52, gender: 'Male', ward: 'ICU', bed: 'ICU-05', doctor: 'Dr. Sarah Johnson', admissionDate: '2024-03-15', diagnosis: 'Acute Myocardial Infarction', status: 'Critical' },
    { id: 'IPD-2024-090', name: 'Jennifer Martinez', age: 34, gender: 'Female', ward: 'General', bed: 'G-12', doctor: 'Dr. Michael Chen', admissionDate: '2024-03-16', diagnosis: 'Pneumonia', status: 'Stable' },
    { id: 'IPD-2024-091', name: 'William Taylor', age: 67, gender: 'Male', ward: 'Surgery', bed: 'S-03', doctor: 'Dr. James Wilson', admissionDate: '2024-03-17', diagnosis: 'Post-op Recovery', status: 'Recovering' },
    { id: 'IPD-2024-092', name: 'Amanda White', age: 45, gender: 'Female', ward: 'Maternity', bed: 'M-08', doctor: 'Dr. Maria Garcia', admissionDate: '2024-03-18', diagnosis: 'C-Section Recovery', status: 'Stable' },
  ]);

  const wardStats = [
    { ward: 'ICU', total: 12, occupied: 10, available: 2, color: 'red' },
    { ward: 'General', total: 50, occupied: 42, available: 8, color: 'blue' },
    { ward: 'Surgery', total: 20, occupied: 15, available: 5, color: 'purple' },
    { ward: 'Maternity', total: 15, occupied: 12, available: 3, color: 'pink' },
    { ward: 'Pediatric', total: 18, occupied: 14, available: 4, color: 'yellow' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inpatient Department</h1>
          <p className="text-gray-500 mt-1">Manage admissions, wards, and patient care</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
          <Plus className="w-4 h-4" />
          New Admission
        </button>
      </div>

      {/* Ward Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {wardStats.map((ward) => (
          <Card key={ward.ward} className="relative">
            <div className={`absolute top-0 left-0 w-1 h-full bg-${ward.color}-500 rounded-l-xl`}></div>
            <div className="pl-4">
              <h3 className="font-semibold text-gray-800">{ward.ward} Ward</h3>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Occupied</span>
                  <span className="font-medium text-gray-900">{ward.occupied}/{ward.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-${ward.color}-500 h-2 rounded-full transition-all`} 
                    style={{ width: `${(ward.occupied/ward.total)*100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-medium">{ward.available} Available</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Current Admissions */}
      <Card title="Current Admissions" action={
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="text" placeholder="Search admissions..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      }>
        <div className="grid gap-4">
          {admissions.map((admission) => (
            <div key={admission.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold text-lg">
                  {admission.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{admission.name}</h4>
                  <p className="text-sm text-gray-500">{admission.id} • {admission.age} yrs • {admission.gender}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Bed className="w-4 h-4" />
                    <span className="font-medium">{admission.bed}</span>
                  </div>
                  <p className="text-xs text-gray-500">{admission.ward} Ward</p>
                </div>
                
                <div className="text-center">
                  <p className="font-medium text-gray-900">{admission.doctor}</p>
                  <p className="text-xs text-gray-500">Attending Physician</p>
                </div>
                
                <div className="text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    admission.status === 'Critical' ? 'bg-red-100 text-red-800' :
                    admission.status === 'Stable' ? 'bg-green-100 text-green-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {admission.status}
                  </span>
                </div>
                
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                  <AlertCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default IPDDashboard;