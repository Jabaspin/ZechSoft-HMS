// src/components/radiology/DicomManager.jsx
import React, { useState } from 'react';
import { Database, Upload, Download, Trash2, Search, Filter, HardDrive, Activity } from 'lucide-react';
import Card from '../common/Card';

const DicomManager = () => {
  const [studies] = useState([
    { id: '1.2.840.113619.2.55.3.2831164357.123.1234567890', patient: 'John Smith', modality: 'CT', date: '2024-03-19', size: '245 MB', status: 'archived' },
    { id: '1.2.840.113619.2.55.3.2831164357.124.1234567891', patient: 'Emily Davis', modality: 'MRI', date: '2024-03-19', size: '180 MB', status: 'local' },
    { id: '1.2.840.113619.2.55.3.2831164357.125.1234567892', patient: 'Robert Wilson', modality: 'X-Ray', date: '2024-03-18', size: '15 MB', status: 'local' },
    { id: '1.2.840.113619.2.55.3.2831164357.126.1234567893', patient: 'Lisa Anderson', modality: 'CT', date: '2024-03-18', size: '320 MB', status: 'archived' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">DICOM Manager</h1>
          <p className="text-gray-500 mt-1">DICOM storage, routing, and lifecycle management</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">
            <Upload className="w-4 h-4" />
            Import DICOM
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">2.4 TB</p>
              <p className="text-sm text-gray-500">Total Storage</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <HardDrive className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">1.8 TB</p>
              <p className="text-sm text-gray-500">Available</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">12,456</p>
              <p className="text-sm text-gray-500">Total Studies</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Upload className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">89</p>
              <p className="text-sm text-gray-500">Today's Uploads</p>
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
              placeholder="Search by patient, study ID, or modality..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Study ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Patient</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Modality</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Size</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {studies.map((study) => (
                <tr key={study.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <p className="text-xs font-mono text-gray-600 truncate max-w-xs">{study.id}</p>
                  </td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">{study.patient}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">{study.modality}</span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{study.date}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{study.size}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      study.status === 'local' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {study.status === 'local' ? 'Local' : 'Archived'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
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

export default DicomManager;