// src/components/radiology/RadiologyDashboard.jsx
import React from 'react';
import { Scan, Image, Clock, CheckCircle, AlertCircle, Calendar, ChevronRight } from 'lucide-react';
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

  const getStatusStyles = (status) => {
    switch(status) {
      case 'reported':
        return { bg: 'bg-green-100', text: 'text-green-700', label: 'Reported' };
      case 'acquired':
        return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Acquired' };
      case 'pending':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Pending' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', label: status };
    }
  };

  return (
    <div className="space-y-4 md:space-y-6 px-4 md:px-0">
      {/* Header - Stack on mobile */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Radiology Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">PACS integration and imaging workflow</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md text-sm md:text-base">
          <Scan className="w-4 h-4" />
          <span>New Study</span>
        </button>
      </div>

      {/* Stats Cards - 2x2 on mobile, 4 columns on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <div className={`p-2 md:p-3 bg-${stat.color}-100 rounded-lg`}>
                <stat.icon className={`w-5 h-5 md:w-6 md:h-6 text-${stat.color}-600`} />
              </div>
              <span className={`text-xs md:text-sm font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-xs md:text-sm text-gray-500 mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Studies */}
        <Card 
          title="Recent Studies" 
          className="p-4 md:p-6"
          action={<button className="text-blue-600 text-xs md:text-sm font-medium">View PACS</button>}
        >
          <div className="space-y-2 md:space-y-3">
            {recentStudies.map((study) => {
              const status = getStatusStyles(study.status);
              return (
                <div 
                  key={study.id} 
                  className="flex flex-col md:flex-row md:items-center md:justify-between p-3 bg-gray-50 rounded-lg gap-2 md:gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-gray-900 text-sm md:text-base line-clamp-1">{study.study}</span>
                      <span className="px-2 py-0.5 bg-gray-200 rounded text-xs font-medium flex-shrink-0">{study.modality}</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500 mt-1 truncate">{study.patient} • {study.ordered}</p>
                  </div>
                  <div className="flex md:flex-col items-center md:items-end gap-2 md:gap-1">
                    <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text} whitespace-nowrap`}>
                      {status.label}
                    </span>
                    <p className="text-xs text-gray-500">{study.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Modality Distribution */}
        <Card title="Modality Distribution" className="p-4 md:p-6">
          <div className="space-y-3 md:space-y-4">
            {modalityStats.map((mod) => (
              <div key={mod.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700 text-sm md:text-base">{mod.name}</span>
                  <span className="text-gray-500 text-xs md:text-sm">{mod.count} studies</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${mod.color} h-2 rounded-full transition-all`} 
                    style={{ width: `${(mod.count/25)*100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200 md:hidden">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Total Studies</span>
              <span className="text-lg font-bold text-gray-800">
                {modalityStats.reduce((acc, mod) => acc + mod.count, 0)}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RadiologyDashboard;