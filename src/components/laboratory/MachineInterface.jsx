// src/components/laboratory/MachineInterface.jsx
import React, { useState } from 'react';
import { 
  Cpu, 
  Activity, 
  CheckCircle, 
  AlertCircle, 
  Power, 
  RefreshCw,
  Settings,
  MoreVertical,
  Wifi,
  WifiOff,
  Tool
} from 'lucide-react';
import Card from '../common/Card';

const MachineInterface = () => {
  const [machines, setMachines] = useState([
    { id: 'ANA-001', name: 'Chemistry Analyzer', model: 'Roche Cobas 6000', status: 'online', lastSync: '2 mins ago', testsToday: 45, queue: 3 },
    { id: 'HEM-001', name: 'Hematology Analyzer', model: 'Sysmex XN-1000', status: 'online', lastSync: '5 mins ago', testsToday: 62, queue: 0 },
    { id: 'IMM-001', name: 'Immunoassay Analyzer', model: 'Abbott Alinity', status: 'maintenance', lastSync: '2 hours ago', testsToday: 0, queue: 12 },
    { id: 'MIC-001', name: 'Microbiology System', model: 'BD Phoenix', status: 'online', lastSync: '1 min ago', testsToday: 18, queue: 2 },
    { id: 'URI-001', name: 'Urinalysis System', model: 'Urisys 1100', status: 'offline', lastSync: '1 day ago', testsToday: 0, queue: 8 },
  ]);

  const [selectedMachine, setSelectedMachine] = useState(null);

  const getStatusConfig = (status) => {
    switch(status) {
      case 'online':
        return {
          color: 'green',
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          borderColor: 'border-l-green-500',
          icon: Wifi,
          label: 'Online'
        };
      case 'maintenance':
        return {
          color: 'yellow',
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-700',
          borderColor: 'border-l-yellow-500',
          icon: Tool,
          label: 'Maintenance'
        };
      default:
        return {
          color: 'red',
          bgColor: 'bg-red-100',
          textColor: 'text-red-700',
          borderColor: 'border-l-red-500',
          icon: WifiOff,
          label: 'Offline'
        };
    }
  };

  const handleSyncAll = () => {
    // Simulate sync action
    console.log('Syncing all machines...');
  };

  const stats = {
    online: machines.filter(m => m.status === 'online').length,
    maintenance: machines.filter(m => m.status === 'maintenance').length,
    offline: machines.filter(m => m.status === 'offline').length
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Machine Interface</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time laboratory equipment monitoring</p>
        </div>
        <button 
          onClick={handleSyncAll}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md text-sm sm:text-base w-full sm:w-auto"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Sync All</span>
        </button>
      </div>

      {/* Machines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {machines.map((machine) => {
          const statusConfig = getStatusConfig(machine.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <Card 
              key={machine.id} 
              className={`border-l-4 ${statusConfig.borderColor} hover:shadow-lg transition-shadow`}
              padding="small"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-gray-100 rounded-lg">
                  <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </div>
                <div className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                  <StatusIcon className="w-3 h-3" />
                  <span className="hidden sm:inline">{statusConfig.label}</span>
                  <span className="sm:hidden">{machine.status === 'online' ? 'On' : machine.status === 'maintenance' ? 'Maint' : 'Off'}</span>
                </div>
              </div>
              
              {/* Machine Info */}
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{machine.name}</h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 truncate">{machine.model}</p>
              
              {/* Stats Grid */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500">Tests Today</span>
                  <span className="font-medium text-gray-900">{machine.testsToday}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500">Queue</span>
                  <span className={`font-medium ${machine.queue > 5 ? 'text-red-600' : 'text-gray-900'}`}>
                    {machine.queue} <span className="hidden sm:inline">samples</span>
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-gray-500">Last Sync</span>
                  <span className="font-medium text-gray-900">{machine.lastSync}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 flex gap-2">
                <button 
                  onClick={() => setSelectedMachine(machine)}
                  className="flex-1 py-2 text-xs sm:text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Details
                </button>
                <button className="flex-1 py-2 text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  Logs
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg sm:hidden">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* System Status Overview */}
      <Card title="System Status Overview" padding="small">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {/* Online Status */}
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-green-700">{stats.online}</p>
              <p className="text-xs sm:text-sm text-green-600">Machines Online</p>
            </div>
          </div>

          {/* Maintenance Status */}
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-yellow-700">{stats.maintenance}</p>
              <p className="text-xs sm:text-sm text-yellow-600">Under Maintenance</p>
            </div>
          </div>

          {/* Offline Status */}
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="p-2 bg-red-100 rounded-lg">
              <Power className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-red-700">{stats.offline}</p>
              <p className="text-xs sm:text-sm text-red-600">Offline</p>
            </div>
          </div>
        </div>

        {/* Mobile Quick Actions */}
        <div className="mt-4 pt-4 border-t border-gray-200 sm:hidden">
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <button className="flex items-center justify-center gap-2 p-3 bg-gray-50 rounded-lg text-sm font-medium text-gray-700">
              <Activity className="w-4 h-4" />
              Activity
            </button>
          </div>
        </div>
      </Card>

      {/* Machine Detail Modal (Mobile Optimized) */}
      {selectedMachine && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedMachine(null)}
          />
          <div className="relative bg-white w-full sm:w-full sm:max-w-lg rounded-t-xl sm:rounded-xl shadow-2xl max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{selectedMachine.name}</h3>
              <button 
                onClick={() => setSelectedMachine(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-4">
              <p className="text-sm text-gray-600">{selectedMachine.model}</p>
              {/* Add more machine details here */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MachineInterface;