// src/components/opd-ipd/OPDDashboard.jsx
import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  ChevronRight,
  Stethoscope,
  Phone,
  MapPin,
  Clock3,
  AlertCircle
} from 'lucide-react';
import Card from '../common/Card';

const OPDDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [patients, setPatients] = useState([
    { id: 'OPD-2024-001', name: 'John Smith', age: 45, gender: 'Male', department: 'Cardiology', doctor: 'Dr. Sarah Johnson', status: 'Waiting', time: '10:30 AM', type: 'Follow-up', contact: '+1 234-567-8900', waitTime: '15 min' },
    { id: 'OPD-2024-002', name: 'Emily Davis', age: 32, gender: 'Female', department: 'Orthopedics', doctor: 'Dr. Michael Chen', status: 'In Consultation', time: '10:45 AM', type: 'New', contact: '+1 234-567-8901', waitTime: '0 min' },
    { id: 'OPD-2024-003', name: 'Robert Wilson', age: 58, gender: 'Male', department: 'Neurology', doctor: 'Dr. James Wilson', status: 'Completed', time: '09:15 AM', type: 'Follow-up', contact: '+1 234-567-8902', waitTime: 'Done' },
    { id: 'OPD-2024-004', name: 'Lisa Anderson', age: 28, gender: 'Female', department: 'Dermatology', doctor: 'Dr. Maria Garcia', status: 'Waiting', time: '11:00 AM', type: 'New', contact: '+1 234-567-8903', waitTime: '30 min' },
    { id: 'OPD-2024-005', name: 'David Brown', age: 67, gender: 'Male', department: 'Cardiology', doctor: 'Dr. Sarah Johnson', status: 'Waiting', time: '11:15 AM', type: 'Emergency', contact: '+1 234-567-8904', waitTime: '5 min' },
    { id: 'OPD-2024-006', name: 'Sarah Miller', age: 41, gender: 'Female', department: 'Gynecology', doctor: 'Dr. Patricia Lee', status: 'In Consultation', time: '10:50 AM', type: 'Follow-up', contact: '+1 234-567-8905', waitTime: '0 min' },
  ]);

  const stats = [
    { label: 'Total Patients', value: '124', icon: Users, trend: '+12%', color: 'blue', bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
    { label: 'In Queue', value: '18', icon: Clock, trend: '-5%', color: 'yellow', bgColor: 'bg-yellow-50', iconColor: 'text-yellow-600' },
    { label: 'Completed', value: '89', icon: Calendar, trend: '+8%', color: 'green', bgColor: 'bg-green-50', iconColor: 'text-green-600' },
    { label: 'Avg. Wait', value: '24m', icon: TrendingUp, trend: '-15%', color: 'purple', bgColor: 'bg-purple-50', iconColor: 'text-purple-600' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Waiting': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Consultation': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Emergency': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Emergency': return <AlertCircle className="w-3 h-3 text-red-500" />;
      case 'New': return <span className="w-2 h-2 bg-blue-500 rounded-full" />;
      default: return <span className="w-2 h-2 bg-green-500 rounded-full" />;
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Outpatient Department</h1>
          <p className="text-sm text-gray-500 mt-1">Manage outpatient consultations and appointments</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Registration</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden" padding="small">
              <div className={`absolute top-0 right-0 w-20 h-20 ${stat.bgColor} rounded-bl-full -mr-4 -mt-4 opacity-50`}></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <div className={`p-2 sm:p-3 ${stat.bgColor} rounded-lg`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} />
                  </div>
                  <span className={`text-xs sm:text-sm font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend}
                  </span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">{stat.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <Card 
        title={
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0">
            <span>Today's Queue</span>
            <span className="sm:hidden text-xs font-normal text-gray-500">
              ({filteredPatients.length} patients)
            </span>
          </div>
        }
        action={
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-40 pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Status</option>
              <option value="Waiting">Waiting</option>
              <option value="In Consultation">In Consultation</option>
              <option value="Completed">Completed</option>
              <option value="Emergency">Emergency</option>
            </select>
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        }
        padding="small"
      >
        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Patient</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Details</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Department</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Doctor</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Time</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr 
                  key={patient.id} 
                  onClick={() => setSelectedPatient(patient)}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-medium text-gray-900 text-sm block">{patient.name}</span>
                        <span className="text-xs text-gray-500">{patient.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500">{patient.age} yrs • {patient.gender}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{patient.department}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{patient.doctor}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{patient.time}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPatient(patient);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          {filteredPatients.map((patient) => (
            <div 
              key={patient.id}
              onClick={() => setSelectedPatient(patient)}
              className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white cursor-pointer"
            >
              {/* Header Row */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {patient.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 text-sm truncate">{patient.name}</h4>
                      {getTypeIcon(patient.type)}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{patient.id} • {patient.age} yrs • {patient.gender}</p>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(patient.status)}`}>
                  {patient.status === 'In Consultation' ? 'Consult' : patient.status}
                </span>
              </div>

              {/* Details Row */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Stethoscope className="w-3 h-3" />
                  <span className="truncate max-w-[100px]">{patient.department}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Clock3 className="w-3 h-3" />
                  <span>{patient.time}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <span className="truncate max-w-[80px]">{patient.doctor.split(' ')[1]}</span>
                </div>
              </div>

              {/* Wait Time (if waiting) */}
              {patient.status === 'Waiting' && (
                <div className="mt-2 flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full w-fit">
                  <Clock className="w-3 h-3" />
                  <span>Waiting: {patient.waitTime}</span>
                </div>
              )}
            </div>
          ))}
          
          {filteredPatients.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No patients found.</p>
            </div>
          )}
        </div>
      </Card>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedPatient(null)}
          />
          <div className="relative bg-white w-full sm:w-full sm:max-w-md rounded-t-xl sm:rounded-xl shadow-2xl max-h-[85vh] overflow-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{selectedPatient.name}</h3>
                  <p className="text-sm text-gray-500">{selectedPatient.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPatient(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-4 space-y-4">
              {/* Status & Type */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedPatient.status)}`}>
                  {selectedPatient.status}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                  {selectedPatient.type}
                </span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Age & Gender</p>
                  <p className="font-semibold text-gray-800">{selectedPatient.age} years • {selectedPatient.gender}</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Appointment</p>
                  <p className="font-semibold text-gray-800">{selectedPatient.time}</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg col-span-2">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Stethoscope className="w-4 h-4" />
                    <span className="text-xs">Department</span>
                  </div>
                  <p className="font-semibold text-gray-800">{selectedPatient.department}</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg col-span-2">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="text-xs">Doctor</span>
                  </div>
                  <p className="font-semibold text-gray-800">{selectedPatient.doctor}</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg col-span-2">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Phone className="w-4 h-4" />
                    <span className="text-xs">Contact</span>
                  </div>
                  <p className="font-semibold text-gray-800">{selectedPatient.contact}</p>
                </div>
              </div>

              {/* Wait Time Alert */}
              {selectedPatient.status === 'Waiting' && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium text-orange-800">Estimated Wait Time</p>
                    <p className="text-xs text-orange-600">{selectedPatient.waitTime}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm">
                  Start Consultation
                </button>
                <button className="flex-1 py-2.5 border border-gray-300 rounded-lg font-medium text-sm text-gray-700">
                  Reschedule
                </button>
              </div>
              
              <button className="w-full py-2.5 border border-red-200 text-red-600 rounded-lg font-medium text-sm hover:bg-red-50">
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OPDDashboard;