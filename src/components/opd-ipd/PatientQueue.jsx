// src/components/opd-ipd/PatientQueue.jsx
import React, { useState } from 'react';
import { 
  Clock, 
  User, 
  ArrowUp, 
  ArrowDown, 
  MoreHorizontal, 
  Phone, 
  Calendar,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  Play,
  Pause,
  SkipForward,
  Filter,
  Search
} from 'lucide-react';
import Card from '../common/Card';

const PatientQueue = () => {
  const [queue, setQueue] = useState([
    { id: 1, token: 'A-015', name: 'John Smith', age: 45, department: 'Cardiology', doctor: 'Dr. Sarah Johnson', estimatedTime: '10 mins', priority: 'normal', status: 'waiting' },
    { id: 2, token: 'A-016', name: 'Emily Davis', age: 32, department: 'Orthopedics', doctor: 'Dr. Michael Chen', estimatedTime: '25 mins', priority: 'normal', status: 'waiting' },
    { id: 3, token: 'A-017', name: 'Robert Wilson', age: 58, department: 'Neurology', doctor: 'Dr. James Wilson', estimatedTime: '5 mins', priority: 'high', status: 'next' },
    { id: 4, token: 'A-018', name: 'Lisa Anderson', age: 28, department: 'Dermatology', doctor: 'Dr. Maria Garcia', estimatedTime: '40 mins', priority: 'low', status: 'waiting' },
    { id: 5, token: 'A-019', name: 'David Brown', age: 67, department: 'Cardiology', doctor: 'Dr. Sarah Johnson', estimatedTime: '15 mins', priority: 'emergency', status: 'in-progress' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPatient, setExpandedPatient] = useState(null);

  const moveUp = (index) => {
    if (index === 0) return;
    const newQueue = [...queue];
    [newQueue[index], newQueue[index-1]] = [newQueue[index-1], newQueue[index]];
    setQueue(newQueue);
  };

  const moveDown = (index) => {
    if (index === queue.length - 1) return;
    const newQueue = [...queue];
    [newQueue[index], newQueue[index+1]] = [newQueue[index+1], newQueue[index]];
    setQueue(newQueue);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'emergency': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'normal': return 'bg-blue-500 text-white';
      case 'low': return 'bg-gray-400 text-white';
      default: return 'bg-gray-300';
    }
  };

  const getPriorityBorder = (priority) => {
    switch(priority) {
      case 'emergency': return 'border-red-400';
      case 'high': return 'border-orange-400';
      case 'normal': return 'border-blue-400';
      case 'low': return 'border-gray-300';
      default: return 'border-gray-200';
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'in-progress':
        return <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium flex items-center gap-1"><Play className="w-3 h-3" /> Now</span>;
      case 'next':
        return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium flex items-center gap-1"><SkipForward className="w-3 h-3" /> Next</span>;
      default:
        return null;
    }
  };

  const filteredQueue = queue.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const queueStats = {
    total: queue.filter(p => p.status === 'waiting').length,
    emergency: queue.filter(p => p.priority === 'emergency').length,
    high: queue.filter(p => p.priority === 'high').length,
    avgWait: '24m'
  };

  const deptDistribution = [
    { dept: 'Cardiology', count: 5, color: 'bg-red-500', textColor: 'text-red-600' },
    { dept: 'Orthopedics', count: 4, color: 'bg-blue-500', textColor: 'text-blue-600' },
    { dept: 'Neurology', count: 3, color: 'bg-purple-500', textColor: 'text-purple-600' },
    { dept: 'Dermatology', count: 3, color: 'bg-green-500', textColor: 'text-green-600' },
    { dept: 'General', count: 3, color: 'bg-gray-500', textColor: 'text-gray-600' },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Patient Queue</h1>
          <p className="text-sm text-gray-500 mt-1">Automated queuing with priority handling</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="px-3 sm:px-4 py-2 bg-blue-50 rounded-lg border border-blue-200 flex items-center justify-between sm:justify-start gap-2">
            <span className="text-xs sm:text-sm text-blue-800 font-medium">Current:</span>
            <span className="text-base sm:text-lg font-bold text-blue-900">A-019</span>
          </div>
          <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md text-sm w-full sm:w-auto">
            <SkipForward className="w-4 h-4" />
            <span className="hidden sm:inline">Call Next</span>
            <span className="sm:hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Search Bar - Mobile */}
      <div className="sm:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search queue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Queue List */}
        <div className="lg:col-span-2 space-y-2 sm:space-y-3">
          {filteredQueue.map((patient, index) => {
            const isExpanded = expandedPatient === patient.id;
            
            return (
              <div 
                key={patient.id} 
                className={`rounded-xl border-2 transition-all overflow-hidden ${
                  patient.status === 'in-progress' ? 'bg-green-50 border-green-400 shadow-md' :
                  patient.status === 'next' ? 'bg-blue-50 border-blue-400' :
                  `bg-white ${getPriorityBorder(patient.priority)} hover:border-blue-300`
                }`}
              >
                {/* Main Row */}
                <div 
                  className="flex items-center gap-2 sm:gap-4 p-3 sm:p-4 cursor-pointer sm:cursor-default"
                  onClick={() => window.innerWidth < 640 && setExpandedPatient(isExpanded ? null : patient.id)}
                >
                  {/* Token */}
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-bold flex-shrink-0 ${getPriorityColor(patient.priority)}`}>
                    <span className="hidden sm:inline">{patient.token}</span>
                    <span className="sm:hidden">{patient.token.split('-')[1]}</span>
                  </div>
                  
                  {/* Patient Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{patient.name}</h4>
                      <span className="text-xs text-gray-500">({patient.age})</span>
                      {patient.priority === 'emergency' && (
                        <span className="sm:hidden px-1.5 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">!</span>
                      )}
                      {getStatusBadge(patient.status)}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs sm:text-sm text-gray-600">
                      <span className="truncate max-w-[100px] sm:max-w-none">{patient.doctor}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:inline truncate">{patient.department}</span>
                    </div>
                  </div>

                  {/* Wait Time */}
                  <div className="text-center flex-shrink-0">
                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="font-medium">{patient.estimatedTime}</span>
                    </div>
                    <p className="text-xs text-gray-500 hidden sm:block">Est. wait</p>
                  </div>

                  {/* Desktop Controls */}
                  <div className="hidden sm:flex flex-col gap-1">
                    <button 
                      onClick={() => moveUp(index)} 
                      disabled={index === 0}
                      className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => moveDown(index)} 
                      disabled={index === queue.length - 1}
                      className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>

                  <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>

                  {/* Mobile Expand Icon */}
                  <div className="sm:hidden text-gray-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {/* Mobile Expanded Details */}
                {isExpanded && (
                  <div className="sm:hidden px-3 pb-3 border-t border-gray-100 bg-gray-50">
                    <div className="pt-3 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Department</span>
                        <span className="font-medium">{patient.department}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Priority</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                          patient.priority === 'emergency' ? 'bg-red-100 text-red-700' :
                          patient.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                          patient.priority === 'normal' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {patient.priority}
                        </span>
                      </div>
                      
                      {/* Mobile Actions */}
                      <div className="flex gap-2 pt-2">
                        <button 
                          onClick={() => moveUp(index)}
                          disabled={index === 0}
                          className="flex-1 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 disabled:opacity-50"
                        >
                          Move Up
                        </button>
                        <button 
                          onClick={() => moveDown(index)}
                          disabled={index === queue.length - 1}
                          className="flex-1 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 disabled:opacity-50"
                        >
                          Move Down
                        </button>
                      </div>
                      
                      <button className="w-full py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                        Start Consultation
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
          {filteredQueue.length === 0 && (
            <div className="text-center py-8 sm:py-12 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No patients in queue.</p>
            </div>
          )}
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-4 sm:space-y-6">
          {/* Quick Stats */}
          <Card title="Queue Stats" padding="small">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-gray-900">{queueStats.total}</p>
                <p className="text-xs text-gray-600">Waiting</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-700">{queueStats.avgWait}</p>
                <p className="text-xs text-blue-600">Avg Wait</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-red-700">{queueStats.emergency}</p>
                <p className="text-xs text-red-600">Emergency</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg text-center">
                <p className="text-2xl font-bold text-orange-700">{queueStats.high}</p>
                <p className="text-xs text-orange-600">High Priority</p>
              </div>
            </div>
          </Card>

          {/* Department Distribution */}
          <Card title="Departments" padding="small">
            <div className="space-y-3">
              {deptDistribution.map((item) => (
                <div key={item.dept} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.dept}</span>
                      <span className={`font-medium ${item.textColor}`}>{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div className={`${item.color} h-1.5 rounded-full transition-all`} style={{ width: `${(item.count/5)*100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Actions - Mobile Only */}
          <div className="sm:hidden space-y-2">
            <button className="w-full py-3 bg-green-600 text-white rounded-lg font-medium flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              Resume Queue
            </button>
            <button className="w-full py-3 border border-gray-300 rounded-lg font-medium text-gray-700 flex items-center justify-center gap-2">
              <Pause className="w-4 h-4" />
              Pause Queue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientQueue;