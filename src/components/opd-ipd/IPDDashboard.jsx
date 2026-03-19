// src/components/opd-ipd/IPDDashboard.jsx
import React, { useState } from 'react';
import { 
  Bed, 
  Users, 
  Clock, 
  AlertCircle, 
  Plus, 
  Search, 
  Filter,
  ChevronRight,
  MoreVertical,
  Phone,
  Calendar,
  Stethoscope
} from 'lucide-react';
import Card from '../common/Card';

const IPDDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const [admissions, setAdmissions] = useState([
    { id: 'IPD-2024-089', name: 'Thomas Anderson', age: 52, gender: 'Male', ward: 'ICU', bed: 'ICU-05', doctor: 'Dr. Sarah Johnson', admissionDate: '2024-03-15', diagnosis: 'Acute Myocardial Infarction', status: 'Critical', contact: '+1 234-567-8900' },
    { id: 'IPD-2024-090', name: 'Jennifer Martinez', age: 34, gender: 'Female', ward: 'General', bed: 'G-12', doctor: 'Dr. Michael Chen', admissionDate: '2024-03-16', diagnosis: 'Pneumonia', status: 'Stable', contact: '+1 234-567-8901' },
    { id: 'IPD-2024-091', name: 'William Taylor', age: 67, gender: 'Male', ward: 'Surgery', bed: 'S-03', doctor: 'Dr. James Wilson', admissionDate: '2024-03-17', diagnosis: 'Post-op Recovery', status: 'Recovering', contact: '+1 234-567-8902' },
    { id: 'IPD-2024-092', name: 'Amanda White', age: 45, gender: 'Female', ward: 'Maternity', bed: 'M-08', doctor: 'Dr. Maria Garcia', admissionDate: '2024-03-18', diagnosis: 'C-Section Recovery', status: 'Stable', contact: '+1 234-567-8903' },
    { id: 'IPD-2024-093', name: 'Robert Brown', age: 58, gender: 'Male', ward: 'ICU', bed: 'ICU-03', doctor: 'Dr. Sarah Johnson', admissionDate: '2024-03-18', diagnosis: 'Stroke', status: 'Critical', contact: '+1 234-567-8904' },
  ]);

  const wardStats = [
    { ward: 'ICU', total: 12, occupied: 10, available: 2, color: 'red', bgColor: 'bg-red-500' },
    { ward: 'General', total: 50, occupied: 42, available: 8, color: 'blue', bgColor: 'bg-blue-500' },
    { ward: 'Surgery', total: 20, occupied: 15, available: 5, color: 'purple', bgColor: 'bg-purple-500' },
    { ward: 'Maternity', total: 15, occupied: 12, available: 3, color: 'pink', bgColor: 'bg-pink-500' },
    { ward: 'Pediatric', total: 18, occupied: 14, available: 4, color: 'yellow', bgColor: 'bg-yellow-500' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'Stable': return 'bg-green-100 text-green-800 border-green-200';
      case 'Recovering': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredAdmissions = admissions.filter(admission => {
    const matchesSearch = 
      admission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admission.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admission.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admission.ward.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || admission.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Inpatient Department</h1>
          <p className="text-sm text-gray-500 mt-1">Manage admissions, wards, and patient care</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md text-sm w-full sm:w-auto">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Admission</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>

      {/* Ward Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {wardStats.map((ward) => (
          <Card key={ward.ward} className="relative overflow-hidden" padding="small">
            <div className={`absolute top-0 left-0 w-1 h-full ${ward.bgColor} rounded-l-xl`}></div>
            <div className="pl-3">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{ward.ward}</h3>
              <div className="mt-2 sm:mt-3 space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500">{ward.occupied}/{ward.total}</span>
                  <span className="font-medium text-green-600">{ward.available} free</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                  <div 
                    className={`${ward.bgColor} h-full rounded-full transition-all duration-500`} 
                    style={{ width: `${(ward.occupied/ward.total)*100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Current Admissions */}
      <Card 
        title={
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
            <span>Current Admissions</span>
            <span className="sm:hidden text-xs font-normal text-gray-500">
              ({filteredAdmissions.length} patients)
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
                className="w-full sm:w-48 pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Status</option>
              <option value="Critical">Critical</option>
              <option value="Stable">Stable</option>
              <option value="Recovering">Recovering</option>
            </select>
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        }
        padding="small"
      >
        <div className="space-y-2 sm:space-y-3">
          {filteredAdmissions.map((admission) => (
            <div 
              key={admission.id} 
              onClick={() => setSelectedAdmission(admission)}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white cursor-pointer gap-3 sm:gap-0"
            >
              {/* Patient Info */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold text-base sm:text-lg flex-shrink-0">
                  {admission.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{admission.name}</h4>
                    <span className={`sm:hidden px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(admission.status)}`}>
                      {admission.status}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    {admission.id} • {admission.age} yrs • {admission.gender}
                  </p>
                  <p className="text-xs text-gray-400 sm:hidden truncate">{admission.diagnosis}</p>
                </div>
              </div>
              
              {/* Details - Desktop */}
              <div className="hidden sm:flex items-center gap-6 lg:gap-8">
                <div className="text-center min-w-[80px]">
                  <div className="flex items-center justify-center gap-2 text-gray-600">
                    <Bed className="w-4 h-4" />
                    <span className="font-medium">{admission.bed}</span>
                  </div>
                  <p className="text-xs text-gray-500">{admission.ward} Ward</p>
                </div>
                
                <div className="text-center min-w-[120px]">
                  <p className="font-medium text-gray-900 text-sm">{admission.doctor}</p>
                  <p className="text-xs text-gray-500">Attending</p>
                </div>
                
                <div className="text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(admission.status)}`}>
                    {admission.status}
                  </span>
                </div>
                
                <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Quick Info */}
              <div className="flex sm:hidden items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Bed className="w-3 h-3" />
                    {admission.bed}
                  </span>
                  <span>{admission.ward}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}
          
          {filteredAdmissions.length === 0 && (
            <div className="text-center py-8 sm:py-12 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No admissions found.</p>
            </div>
          )}
        </div>
      </Card>

      {/* Patient Detail Modal */}
      {selectedAdmission && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedAdmission(null)}
          />
          <div className="relative bg-white w-full sm:w-full sm:max-w-lg rounded-t-xl sm:rounded-xl shadow-2xl max-h-[90vh] overflow-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-bold text-xl">
                  {selectedAdmission.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{selectedAdmission.name}</h3>
                  <p className="text-sm text-gray-500">{selectedAdmission.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedAdmission(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-4 space-y-4">
              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedAdmission.status)}`}>
                  {selectedAdmission.status}
                </span>
                <span className="text-sm text-gray-500">
                  {selectedAdmission.age} years • {selectedAdmission.gender}
                </span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Bed className="w-4 h-4" />
                    <span className="text-xs">Bed</span>
                  </div>
                  <p className="font-semibold text-gray-800">{selectedAdmission.bed}</p>
                  <p className="text-xs text-gray-500">{selectedAdmission.ward} Ward</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Stethoscope className="w-4 h-4" />
                    <span className="text-xs">Doctor</span>
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">{selectedAdmission.doctor}</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">Admitted</span>
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">{selectedAdmission.admissionDate}</p>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Phone className="w-4 h-4" />
                    <span className="text-xs">Contact</span>
                  </div>
                  <p className="font-semibold text-gray-800 text-sm">{selectedAdmission.contact}</p>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Diagnosis</p>
                <p className="font-medium text-gray-800">{selectedAdmission.diagnosis}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm">
                  View Details
                </button>
                <button className="flex-1 py-2.5 border border-gray-300 rounded-lg font-medium text-sm text-gray-700">
                  Transfer
                </button>
                <button className="px-3 py-2.5 border border-gray-300 rounded-lg text-gray-600">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IPDDashboard;