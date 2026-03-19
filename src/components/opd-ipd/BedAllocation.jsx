// src/components/opd-ipd/BedAllocation.jsx
import React, { useState } from 'react';
import { Bed, CheckCircle, XCircle, Clock, ArrowRightLeft } from 'lucide-react';
import Card from '../common/Card';

const BedAllocation = () => {
  const [selectedWard, setSelectedWard] = useState('all');
  
  const wards = [
    { 
      name: 'ICU', 
      beds: Array(12).fill(null).map((_, i) => ({
        id: `ICU-${String(i+1).padStart(2, '0')}`,
        status: i < 10 ? 'occupied' : 'available',
        patient: i < 10 ? { name: `Patient ${i+1}`, admission: '2024-03-15' } : null
      }))
    },
    { 
      name: 'General', 
      beds: Array(50).fill(null).map((_, i) => ({
        id: `G-${String(i+1).padStart(2, '0')}`,
        status: i < 42 ? 'occupied' : i < 45 ? 'reserved' : 'available',
        patient: i < 42 ? { name: `Patient ${i+1}`, admission: '2024-03-16' } : null
      }))
    },
    { 
      name: 'Surgery', 
      beds: Array(20).fill(null).map((_, i) => ({
        id: `S-${String(i+1).padStart(2, '0')}`,
        status: i < 15 ? 'occupied' : 'available',
        patient: i < 15 ? { name: `Patient ${i+1}`, admission: '2024-03-17' } : null
      }))
    }
  ];

  const getBedColor = (status) => {
    switch(status) {
      case 'occupied': return 'bg-red-100 border-red-300 text-red-700';
      case 'available': return 'bg-green-100 border-green-300 text-green-700 hover:bg-green-200';
      case 'reserved': return 'bg-yellow-100 border-yellow-300 text-yellow-700';
      case 'maintenance': return 'bg-gray-100 border-gray-300 text-gray-500';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'occupied': return <XCircle className="w-4 h-4" />;
      case 'available': return <CheckCircle className="w-4 h-4" />;
      case 'reserved': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bed Allocation</h1>
          <p className="text-gray-500 mt-1">Real-time bed management and allocation</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={selectedWard} 
            onChange={(e) => setSelectedWard(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Wards</option>
            {wards.map(w => <option key={w.name} value={w.name}>{w.name}</option>)}
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">
            <ArrowRightLeft className="w-4 h-4" />
            Transfer Patient
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 border border-green-300"></div>
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-100 border border-red-300"></div>
          <span className="text-gray-600">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-300"></div>
          <span className="text-gray-600">Reserved</span>
        </div>
      </div>

      {/* Bed Grid */}
      <div className="space-y-8">
        {wards.map((ward) => (
          <Card key={ward.name} title={`${ward.name} Ward - ${ward.beds.filter(b => b.status === 'available').length} Available`}>
            <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {ward.beds.map((bed) => (
                <div 
                  key={bed.id}
                  className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all ${getBedColor(bed.status)}`}
                >
                  <div className="flex flex-col items-center gap-1">
                    <Bed className="w-6 h-6" />
                    <span className="text-xs font-semibold">{bed.id}</span>
                    {getStatusIcon(bed.status)}
                  </div>
                  {bed.patient && (
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BedAllocation;