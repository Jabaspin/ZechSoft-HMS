// src/components/laboratory/LabDashboard.jsx
import React from 'react';
import { FlaskConical, ClipboardList, Clock, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import Card from '../common/Card';

const LabDashboard = () => {
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
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Laboratory Dashboard</h1>
          <p className="text-gray-500 mt-1">Advanced LIMS with machine integration</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">
          <FlaskConical className="w-4 h-4" />
          New Test Order
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
        <Card title="Recent Test Orders" action={<button className="text-blue-600 text-sm font-medium">View All</button>}>
          <div className="space-y-3">
            {recentTests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{test.test}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      test.priority === 'STAT' ? 'bg-red-100 text-red-700' :
                      test.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {test.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{test.patient} • {test.id}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    test.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    test.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {test.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{test.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Department Workload">
          <div className="space-y-4">
            {[
              { dept: 'Hematology', total: 25, completed: 20, color: 'bg-red-500' },
              { dept: 'Biochemistry', total: 35, completed: 28, color: 'bg-blue-500' },
              { dept: 'Microbiology', total: 15, completed: 10, color: 'bg-green-500' },
              { dept: 'Pathology', total: 14, completed: 4, color: 'bg-purple-500' },
            ].map((dept) => (
              <div key={dept.dept}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{dept.dept}</span>
                  <span className="text-gray-500">{dept.completed}/{dept.total}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`${dept.color} h-2 rounded-full transition-all`} style={{ width: `${(dept.completed/dept.total)*100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LabDashboard;