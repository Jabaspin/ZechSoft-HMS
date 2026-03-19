// src/components/opd-ipd/PatientQueue.jsx
import React, { useState } from 'react';
import { Clock, User, ArrowUp, ArrowDown, MoreHorizontal, Phone, Calendar } from 'lucide-react';
import Card from '../common/Card';

const PatientQueue = () => {
  const [queue, setQueue] = useState([
    { id: 1, token: 'A-015', name: 'John Smith', age: 45, department: 'Cardiology', doctor: 'Dr. Sarah Johnson', estimatedTime: '10 mins', priority: 'normal', status: 'waiting' },
    { id: 2, token: 'A-016', name: 'Emily Davis', age: 32, department: 'Orthopedics', doctor: 'Dr. Michael Chen', estimatedTime: '25 mins', priority: 'normal', status: 'waiting' },
    { id: 3, token: 'A-017', name: 'Robert Wilson', age: 58, department: 'Neurology', doctor: 'Dr. James Wilson', estimatedTime: '5 mins', priority: 'high', status: 'next' },
    { id: 4, token: 'A-018', name: 'Lisa Anderson', age: 28, department: 'Dermatology', doctor: 'Dr. Maria Garcia', estimatedTime: '40 mins', priority: 'low', status: 'waiting' },
    { id: 5, token: 'A-019', name: 'David Brown', age: 67, department: 'Cardiology', doctor: 'Dr. Sarah Johnson', estimatedTime: '15 mins', priority: 'emergency', status: 'in-progress' },
  ]);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Patient Queue Management</h1>
          <p className="text-gray-500 mt-1">Automated queuing system with priority handling</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-sm text-blue-800 font-medium">Current Token: </span>
            <span className="text-lg font-bold text-blue-900">A-019</span>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">
            Call Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Queue List */}
        <div className="lg:col-span-2 space-y-4">
          {queue.map((patient, index) => (
            <div 
              key={patient.id} 
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                patient.status === 'in-progress' ? 'bg-green-50 border-green-400 shadow-md' :
                patient.status === 'next' ? 'bg-blue-50 border-blue-400' :
                'bg-white border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getPriorityColor(patient.priority)}`}>
                {patient.token}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900">{patient.name}</h4>
                  <span className="text-sm text-gray-500">({patient.age} yrs)</span>
                  {patient.priority === 'emergency' && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full font-medium">Emergency</span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {patient.doctor}
                  </span>
                  <span>•</span>
                  <span>{patient.department}</span>
                </div>
              </div>

              <div className="text-center">
                <div className="flex items-center gap-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{patient.estimatedTime}</span>
                </div>
                <p className="text-xs text-gray-500">Est. wait</p>
              </div>

              <div className="flex flex-col gap-1">
                <button onClick={() => moveUp(index)} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button onClick={() => moveDown(index)} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>

              <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Queue Stats */}
        <div className="space-y-6">
          <Card title="Queue Statistics">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Total Waiting</span>
                <span className="text-2xl font-bold text-gray-900">18</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-red-700">Emergency</span>
                <span className="text-2xl font-bold text-red-700">2</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-orange-700">High Priority</span>
                <span className="text-2xl font-bold text-orange-700">3</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-700">Average Wait</span>
                <span className="text-2xl font-bold text-blue-700">24m</span>
              </div>
            </div>
          </Card>

          <Card title="Department Distribution">
            <div className="space-y-3">
              {[
                { dept: 'Cardiology', count: 5, color: 'bg-red-500' },
                { dept: 'Orthopedics', count: 4, color: 'bg-blue-500' },
                { dept: 'Neurology', count: 3, color: 'bg-purple-500' },
                { dept: 'Dermatology', count: 3, color: 'bg-green-500' },
                { dept: 'General', count: 3, color: 'bg-gray-500' },
              ].map((item) => (
                <div key={item.dept} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.dept}</span>
                      <span className="font-medium text-gray-900">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div className={`${item.color} h-1.5 rounded-full`} style={{ width: `${(item.count/5)*100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientQueue;