// src/components/opd-ipd/OPDDashboard.jsx
import React, { useState } from 'react';
import { Users, Calendar, Clock, TrendingUp, Plus, Search, Filter, MoreVertical } from 'lucide-react';
import Card from '../common/Card';

const OPDDashboard = () => {
  const [patients] = useState([
    { id: 'OPD-2024-001', name: 'John Smith', age: 45, gender: 'Male', department: 'Cardiology', doctor: 'Dr. Sarah Johnson', status: 'Waiting', time: '10:30 AM', type: 'Follow-up' },
    { id: 'OPD-2024-002', name: 'Emily Davis', age: 32, gender: 'Female', department: 'Orthopedics', doctor: 'Dr. Michael Chen', status: 'In Consultation', time: '10:45 AM', type: 'New' },
    { id: 'OPD-2024-003', name: 'Robert Wilson', age: 58, gender: 'Male', department: 'Neurology', doctor: 'Dr. James Wilson', status: 'Completed', time: '09:15 AM', type: 'Follow-up' },
    { id: 'OPD-2024-004', name: 'Lisa Anderson', age: 28, gender: 'Female', department: 'Dermatology', doctor: 'Dr. Maria Garcia', status: 'Waiting', time: '11:00 AM', type: 'New' },
    { id: 'OPD-2024-005', name: 'David Brown', age: 67, gender: 'Male', department: 'Cardiology', doctor: 'Dr. Sarah Johnson', status: 'Waiting', time: '11:15 AM', type: 'Emergency' },
  ]);

  const stats = [
    { label: 'Total Patients Today', value: '124', icon: Users, trend: '+12%', color: 'blue' },
    { label: 'In Queue', value: '18', icon: Clock, trend: '-5%', color: 'yellow' },
    { label: 'Completed', value: '89', icon: Calendar, trend: '+8%', color: 'green' },
    { label: 'Avg. Wait Time', value: '24 min', icon: TrendingUp, trend: '-15%', color: 'purple' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Waiting': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Consultation': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Emergency': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Outpatient Department</h1>
          <p className="text-gray-500 mt-1">Manage outpatient consultations and appointments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
          <Plus className="w-4 h-4" />
          New Registration
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-50 rounded-bl-full -mr-4 -mt-4 opacity-50`}></div>
            <div className="relative">
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
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Card title="Today's Queue" action={
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="text" placeholder="Search patients..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      }>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Patient ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Details</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Department</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Doctor</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Time</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">{patient.id}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                        {patient.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{patient.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">{patient.age} yrs • {patient.gender}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{patient.department}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{patient.doctor}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{patient.time}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
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

export default OPDDashboard;