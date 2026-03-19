// src/components/pharmacy/ExpiryManagement.jsx
import React, { useState } from 'react';
import { AlertTriangle, Calendar, Package, Trash2, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import Card from '../common/Card';

const ExpiryManagement = () => {
  const [batches] = useState([
    { id: 'B-2024-001', medicine: 'Amoxicillin 500mg', batchNo: 'LOT-2023-089', quantity: 150, mfg: '2023-03-15', expiry: '2025-03-15', daysLeft: 361, status: 'good' },
    { id: 'B-2024-002', medicine: 'Metformin 850mg', batchNo: 'LOT-2023-045', quantity: 80, mfg: '2023-01-20', expiry: '2025-01-20', daysLeft: 307, status: 'good' },
    { id: 'B-2024-003', medicine: 'Atorvastatin 20mg', batchNo: 'LOT-2022-112', quantity: 45, mfg: '2022-06-10', expiry: '2024-06-10', daysLeft: 83, status: 'warning' },
    { id: 'B-2024-004', medicine: 'Omeprazole 20mg', batchNo: 'LOT-2022-089', quantity: 120, mfg: '2022-04-15', expiry: '2024-04-15', daysLeft: 27, status: 'critical' },
    { id: 'B-2024-005', medicine: 'Paracetamol 500mg', batchNo: 'LOT-2022-056', quantity: 200, mfg: '2022-02-10', expiry: '2024-03-25', daysLeft: 6, status: 'expired' },
  ]);

  const [expandedCard, setExpandedCard] = useState(null);

  const getStatusColor = (status) => {
    switch(status) {
      case 'good': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'critical': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBg = (status) => {
    switch(status) {
      case 'good': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'critical': return 'bg-orange-50 border-orange-200';
      case 'expired': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="space-y-4 md:space-y-6 px-4 md:px-0">
      {/* Header - Stack on mobile */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Expiry Management</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">Batch-wise expiry tracking and management</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm md:text-base">
            <RefreshCw className="w-4 h-4" />
            <span>Generate Report</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md text-sm md:text-base">
            <Trash2 className="w-4 h-4" />
            <span>Dispose Expired</span>
          </button>
        </div>
      </div>

      {/* Stats Cards - 2x2 grid on mobile, 4 columns on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <Card className="bg-green-50 border-green-200 p-3 md:p-4">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-green-700">1,245</p>
            <p className="text-xs md:text-sm text-green-600 mt-1">Valid Batches</p>
          </div>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200 p-3 md:p-4">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-yellow-700">23</p>
            <p className="text-xs md:text-sm text-yellow-600 mt-1">Expiring &lt; 90d</p>
          </div>
        </Card>
        <Card className="bg-orange-50 border-orange-200 p-3 md:p-4">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-orange-700">8</p>
            <p className="text-xs md:text-sm text-orange-600 mt-1">Expiring &lt; 30d</p>
          </div>
        </Card>
        <Card className="bg-red-50 border-red-200 p-3 md:p-4">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-red-700">5</p>
            <p className="text-xs md:text-sm text-red-600 mt-1">Expired</p>
          </div>
        </Card>
      </div>

      {/* Desktop Table - Hidden on mobile */}
      <div className="hidden md:block">
        <Card title="Batch Expiry Tracking">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Batch ID</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Medicine</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Batch No</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Quantity</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Manufacturing</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Expiry Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Days Left</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((batch) => (
                  <tr key={batch.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{batch.id}</td>
                    <td className="py-4 px-4 text-sm text-gray-900">{batch.medicine}</td>
                    <td className="py-4 px-4 text-sm text-gray-600 font-mono">{batch.batchNo}</td>
                    <td className="py-4 px-4 text-sm text-gray-900">{batch.quantity}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{batch.mfg}</td>
                    <td className="py-4 px-4 text-sm text-gray-900">{batch.expiry}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className={`text-sm font-medium ${
                          batch.daysLeft < 0 ? 'text-red-600' :
                          batch.daysLeft < 30 ? 'text-orange-600' :
                          batch.daysLeft < 90 ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {batch.daysLeft < 0 ? 'Expired' : `${batch.daysLeft} days`}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(batch.status)}`}>
                        {batch.status === 'good' ? 'Good' :
                         batch.status === 'warning' ? 'Warning' :
                         batch.status === 'critical' ? 'Critical' :
                         'Expired'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Mobile Cards - Visible only on mobile */}
      <div className="md:hidden space-y-3">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Batch Expiry Tracking</h2>
        {batches.map((batch) => (
          <Card key={batch.id} className={`${getStatusBg(batch.status)} overflow-hidden`}>
            <div 
              className="p-4 cursor-pointer"
              onClick={() => toggleCard(batch.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold text-gray-900">{batch.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(batch.status)}`}>
                      {batch.status === 'good' ? 'Good' :
                       batch.status === 'warning' ? 'Warning' :
                       batch.status === 'critical' ? 'Critical' :
                       'Expired'}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-800 truncate">{batch.medicine}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className={`text-xs font-medium ${
                      batch.daysLeft < 0 ? 'text-red-600' :
                      batch.daysLeft < 30 ? 'text-orange-600' :
                      batch.daysLeft < 90 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {batch.daysLeft < 0 ? 'Expired' : `${batch.daysLeft} days left`}
                    </span>
                  </div>
                </div>
                <div className="ml-2">
                  {expandedCard === batch.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
              
              {/* Expanded Details */}
              {expandedCard === batch.id && (
                <div className="mt-3 pt-3 border-t border-gray-200/50 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Batch No:</span>
                    <span className="font-mono text-gray-700">{batch.batchNo}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Quantity:</span>
                    <span className="font-medium text-gray-700">{batch.quantity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Manufacturing:</span>
                    <span className="text-gray-700">{batch.mfg}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Expiry Date:</span>
                    <span className="text-gray-700">{batch.expiry}</span>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExpiryManagement;