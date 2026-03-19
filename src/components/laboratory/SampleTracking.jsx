// src/components/laboratory/SampleTracking.jsx
import React, { useState } from 'react';
import { ScanBarcode, Search, Printer, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import Card from '../common/Card';

const SampleTracking = () => {
  const [samples] = useState([
    { id: 'S-2024-001', barcode: 'BC-789456123', patient: 'John Smith', test: 'CBC', collected: '10:30 AM', status: 'collected', location: 'Collection Center' },
    { id: 'S-2024-002', barcode: 'BC-789456124', patient: 'Emily Davis', test: 'Lipid Profile', collected: '10:45 AM', status: 'in-transit', location: 'Transit to Lab' },
    { id: 'S-2024-003', barcode: 'BC-789456125', patient: 'Robert Wilson', test: 'Blood Glucose', collected: '11:00 AM', status: 'processing', location: 'Hematology' },
    { id: 'S-2024-004', barcode: 'BC-789456126', patient: 'Lisa Anderson', test: 'Thyroid Panel', collected: '09:15 AM', status: 'completed', location: 'Report Ready' },
  ]);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'collected': return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'in-transit': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'processing': return <ScanBarcode className="w-4 h-4 text-purple-600" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Sample Tracking</h1>
          <p className="text-gray-500 mt-1">Barcode-based sample lifecycle tracking</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Printer className="w-4 h-4" />
            Print Labels
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">
            <ScanBarcode className="w-4 h-4" />
            Scan Sample
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ScanBarcode className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">45</p>
              <p className="text-sm text-gray-500">Collected</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">12</p>
              <p className="text-sm text-gray-500">In Transit</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ScanBarcode className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">28</p>
              <p className="text-sm text-gray-500">Processing</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">156</p>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by barcode, patient, or sample ID..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Filter by Status
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Sample ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Barcode</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Patient</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Test</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Collected</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Location</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {samples.map((sample) => (
                <tr key={sample.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">{sample.id}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <ScanBarcode className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-mono text-gray-600">{sample.barcode}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">{sample.patient}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{sample.test}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{sample.collected}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{sample.location}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(sample.status)}
                      <span className="text-sm font-medium capitalize">{sample.status.replace('-', ' ')}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default SampleTracking;