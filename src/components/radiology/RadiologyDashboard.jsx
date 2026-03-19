// src/components/radiology/RadiologyDashboard.jsx
import React from 'react';
import { Scan, Image, Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import Card from '../common/Card';

const RadiologyDashboard = () => {
  const stats = [
    { label: 'Total Studies', value: '67', icon: Image, trend: '+8%', color: 'blue' },
    { label: 'Pending Reports', value: '12', icon: Clock, trend: '-5%', color: 'yellow' },
    { label: 'Reported', value: '52', icon: CheckCircle, trend: '+15%', color: 'green' },
    { label: 'Critical Findings', value: '3', icon: AlertCircle, trend: '+1', color: 'red' },
  ];

  const recentStudies = [
    { id: 'RAD-2024-001', patient: 'John Smith', modality: 'CT', study: 'Chest CT with Contrast', ordered: 'Dr. Sarah Johnson', time: '10:30 AM', status: 'reported' },
    { id: 'RAD-2024-002', patient: 'Emily Davis', modality: 'MRI', study: 'Brain MRI', ordered: 'Dr. Michael Chen', time: '11:00 AM', status: 'pending' },
    { id: 'RAD-2024-003', patient: 'Robert Wilson', modality: 'X-Ray', study: 'Chest X-Ray PA', ordered: 'Dr. James Wilson', time: '09:45 AM', status: 'acquired' },
    { id: 'RAD-2024-004', patient: 'Lisa Anderson', modality: 'USG', study: 'Abdominal Ultrasound', ordered: 'Dr. Maria Garcia', time: '10:15 AM', status: 'reported' },
  ];

  const modalityStats = [
    { name: 'X-Ray', count: 25, color: 'bg-blue-500' },
    { name: 'CT Scan', count: 18, color: 'bg-purple-500' },
    { name: 'MRI', count: 12, color: 'bg-green-500' },
    { name: 'Ultrasound', count: 12, color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Radiology Dashboard</h1>
          <p className="text-gray-500 mt-1">PACS integration and imaging workflow</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">
          <Scan className="w-4 h-4" />
          New Study
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className={`text-sm font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Studies" action={<button className="text-blue-600 text-sm font-medium">View PACS</button>}>
          <div className="space-y-3">
            {recentStudies.map((study) => (
              <div key={study.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{study.study}</span>
                    <span className="px-2 py-0.5 bg-gray-200 rounded text-xs font-medium">{study.modality}</span>
                  </div>
                  <p className="text-sm text-gray-500">{study.patient} • {study.ordered}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    study.status === 'reported' ? 'bg-green-100 text-green-700' :
                    study.status === 'acquired' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {study.status === 'reported' ? 'Reported' : study.status === 'acquired' ? 'Acquired' : 'Pending'}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{study.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Modality Distribution">
          <div className="space-y-4">
            {modalityStats.map((mod) => (
              <div key={mod.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{mod.name}</span>
                  <span className="text-gray-500">{mod.count} studies</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`${mod.color} h-2 rounded-full transition-all`} style={{ width: `${(mod.count/25)*100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RadiologyDashboard;