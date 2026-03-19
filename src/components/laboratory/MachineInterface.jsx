// src/components/laboratory/MachineInterface.jsx
import React, { useState } from 'react';
import { Cpu, Activity, CheckCircle, AlertCircle, Power, RefreshCw } from 'lucide-react';
import Card from '../common/Card';

const MachineInterface = () => {
  const [machines] = useState([
    { id: 'ANA-001', name: 'Chemistry Analyzer', model: 'Roche Cobas 6000', status: 'online', lastSync: '2 mins ago', testsToday: 45, queue: 3 },
    { id: 'HEM-001', name: 'Hematology Analyzer', model: 'Sysmex XN-1000', status: 'online', lastSync: '5 mins ago', testsToday: 62, queue: 0 },
    { id: 'IMM-001', name: 'Immunoassay Analyzer', model: 'Abbott Alinity', status: 'maintenance', lastSync: '2 hours ago', testsToday: 0, queue: 12 },
    { id: 'MIC-001', name: 'Microbiology System', model: 'BD Phoenix', status: 'online', lastSync: '1 min ago', testsToday: 18, queue: 2 },
    { id: 'URI-001', name: 'Urinalysis System', model: 'Urisys 1100', status: 'offline', lastSync: '1 day ago', testsToday: 0, queue: 8 },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Machine Interface</h1>
          <p className="text-gray-500 mt-1">Real-time laboratory equipment monitoring</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">
          <RefreshCw className="w-4 h-4" />
          Sync All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {machines.map((machine) => (
          <Card key={machine.id} className={`border-l-4 ${
            machine.status === 'online' ? 'border-l-green-500' :
            machine.status === 'maintenance' ? 'border-l-yellow-500' :
            'border-l-red-500'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Cpu className="w-6 h-6 text-gray-600" />
              </div>
              <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                machine.status === 'online' ? 'bg-green-100 text-green-700' :
                machine.status === 'maintenance' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                <Power className="w-3 h-3" />
                {machine.status === 'online' ? 'Online' : machine.status === 'maintenance' ? 'Maintenance' : 'Offline'}
              </div>
            </div>
            
            <h3 className="font-semibold text-gray-900">{machine.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{machine.model}</p>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tests Today</span>
                <span className="font-medium text-gray-900">{machine.testsToday}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Queue</span>
                <span className={`font-medium ${machine.queue > 5 ? 'text-red-600' : 'text-gray-900'}`}>
                  {machine.queue} samples
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Last Sync</span>
                <span className="font-medium text-gray-900">{machine.lastSync}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
              <button className="flex-1 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                View Details
              </button>
              <button className="flex-1 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                Logs
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Card title="System Status Overview">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-green-700">3</p>
              <p className="text-sm text-green-600">Machines Online</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <AlertCircle className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-2xl font-bold text-yellow-700">1</p>
              <p className="text-sm text-yellow-600">Under Maintenance</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <Power className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-2xl font-bold text-red-700">1</p>
              <p className="text-sm text-red-600">Offline</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MachineInterface;