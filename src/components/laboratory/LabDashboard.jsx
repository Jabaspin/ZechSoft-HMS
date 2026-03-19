// src/components/laboratory/LabDashboard.jsx
import React, { useState } from 'react';
import { 
  FlaskConical, 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Menu,
  X,
  Filter,
  Search
} from 'lucide-react';
import Card from '../common/Card';

const LabDashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Total Tests Today', value: '89', icon: FlaskConical, trend: '+15%', color: 'blue' },
    { label: 'Pending Results', value: '24', icon: Clock, trend: '-8%', color: 'yellow' },
    { label: 'Completed', value: '62', icon: CheckCircle, trend: '+12%', color: 'green' },
    { label: 'Critical Values', value: '3', icon: AlertCircle, trend: '+1', color: 'red' },
  ];

  const recentTests = [
    { id: 'LAB-2024-001', patient: 'John Smith', test: 'Complete Blood Count', priority: 'Normal', status: 'Processing', time: '10:30 AM' },
    { id: 'LAB-2024-002', patient: 'Emily Davis', test: 'Lipid Profile', priority: 'High', status: 'Completed', time: '10:15 AM' },
    { id: 'LAB-2024-003', patient: 'Robert Wilson', test: 'Blood Glucose', priority: 'STAT', status: 'Pending', time: '11:00 AM' },
    { id: 'LAB-2024-004', patient: 'Lisa Anderson', test: 'Thyroid Panel', priority: 'Normal', status: 'Completed', time: '09:45 AM' },
    { id: 'LAB-2024-005', patient: 'Michael Brown', test: 'Liver Function', priority: 'High', status: 'Processing', time: '11:15 AM' },
  ];

  const departments = [
    { dept: 'Hematology', total: 25, completed: 20, color: 'bg-red-500' },
    { dept: 'Biochemistry', total: 35, completed: 28, color: 'bg-blue-500' },
    { dept: 'Microbiology', total: 15, completed: 10, color: 'bg-green-500' },
    { dept: 'Pathology', total: 14, completed: 4, color: 'bg-purple-500' },
  ];

  const getPriorityStyles = (priority) => {
    switch(priority) {
      case 'STAT': return 'bg-red-100 text-red-700 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getStatusStyles = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Processing': return 'bg-blue-100 text-blue-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const filteredTests = recentTests.filter(test => 
    test.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.test.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6 space-y-4 lg:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Laboratory Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Advanced LIMS with machine integration</p>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Toggle */}
          <div className="relative flex-1 sm:hidden">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md text-sm sm:text-base whitespace-nowrap">
            <FlaskConical className="w-4 h-4" />
            <span className="hidden sm:inline">New Test Order</span>
            <span className="sm:hidden">New</span>
          </button>
          
          <button className="sm:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className={`p-2 sm:p-3 bg-${stat.color}-100 rounded-lg`}>
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${stat.color}-600`} />
              </div>
              <span className={`text-xs sm:text-sm font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Recent Tests Card */}
        <Card 
          title="Recent Test Orders" 
          className="overflow-hidden"
          action={
            <button className="text-blue-600 text-xs sm:text-sm font-medium hover:text-blue-700">
              View All
            </button>
          }
        >
          {/* Desktop Search - Hidden on mobile */}
          <div className="hidden sm:block mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by patient, test, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {filteredTests.map((test) => (
              <div 
                key={test.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg gap-2 sm:gap-0 hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-gray-900 text-sm sm:text-base truncate">{test.test}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityStyles(test.priority)}`}>
                      {test.priority}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    {test.patient} • <span className="font-mono text-xs">{test.id}</span>
                  </p>
                </div>
                
                <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1 sm:ml-4">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusStyles(test.status)}`}>
                    {test.status}
                  </span>
                  <p className="text-xs text-gray-500">{test.time}</p>
                </div>
              </div>
            ))}
            
            {filteredTests.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No tests found matching your search.</p>
              </div>
            )}
          </div>
          
          {/* Mobile View All Button */}
          <button className="w-full mt-4 py-2 text-blue-600 text-sm font-medium border border-blue-200 rounded-lg hover:bg-blue-50 sm:hidden">
            View All Orders
          </button>
        </Card>

        {/* Department Workload Card */}
        <Card title="Department Workload" className="overflow-hidden">
          <div className="space-y-4 sm:space-y-6">
            {departments.map((dept) => {
              const percentage = (dept.completed / dept.total) * 100;
              return (
                <div key={dept.dept}>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="font-medium text-gray-700">{dept.dept}</span>
                    <div className="text-right">
                      <span className="text-gray-900 font-semibold">{dept.completed}</span>
                      <span className="text-gray-500">/{dept.total}</span>
                      <span className="text-xs text-gray-400 ml-2">({Math.round(percentage)}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
                    <div 
                      className={`${dept.color} h-full rounded-full transition-all duration-500 ease-out`} 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Summary Stats for Mobile */}
          <div className="mt-6 pt-4 border-t border-gray-200 grid grid-cols-2 gap-4 sm:hidden">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">62</p>
              <p className="text-xs text-gray-500">Total Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-800">89</p>
              <p className="text-xs text-gray-500">Total Tests</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions Floating Button (Mobile Only) */}
      <button className="fixed bottom-4 right-4 sm:hidden w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-transform z-50">
        <FlaskConical className="w-6 h-6" />
      </button>
    </div>
  );
};

export default LabDashboard;