// src/components/laboratory/SampleTracking.jsx
import React, { useState } from 'react';
import { 
  ScanBarcode, 
  Search, 
  Printer, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  MapPin,
  ChevronDown,
  ChevronUp,
  Filter,
  MoreVertical,
  QrCode
} from 'lucide-react';
import Card from '../common/Card';

const SampleTracking = () => {
  const [samples, setSamples] = useState([
    { id: 'S-2024-001', barcode: 'BC-789456123', patient: 'John Smith', test: 'CBC', collected: '10:30 AM', status: 'collected', location: 'Collection Center' },
    { id: 'S-2024-002', barcode: 'BC-789456124', patient: 'Emily Davis', test: 'Lipid Profile', collected: '10:45 AM', status: 'in-transit', location: 'Transit to Lab' },
    { id: 'S-2024-003', barcode: 'BC-789456125', patient: 'Robert Wilson', test: 'Blood Glucose', collected: '11:00 AM', status: 'processing', location: 'Hematology' },
    { id: 'S-2024-004', barcode: 'BC-789456126', patient: 'Lisa Anderson', test: 'Thyroid Panel', collected: '09:15 AM', status: 'completed', location: 'Report Ready' },
    { id: 'S-2024-005', barcode: 'BC-789456127', patient: 'Michael Brown', test: 'Liver Function', collected: '11:15 AM', status: 'collected', location: 'Collection Center' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSample, setExpandedSample] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const stats = [
    { value: 45, label: 'Collected', color: 'blue', icon: ScanBarcode, bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
    { value: 12, label: 'In Transit', color: 'yellow', icon: Clock, bgColor: 'bg-yellow-100', textColor: 'text-yellow-600' },
    { value: 28, label: 'Processing', color: 'purple', icon: ScanBarcode, bgColor: 'bg-purple-100', textColor: 'text-purple-600' },
    { value: 156, label: 'Completed', color: 'green', icon: CheckCircle, bgColor: 'bg-green-100', textColor: 'text-green-600' },
  ];

  const getStatusConfig = (status) => {
    switch(status) {
      case 'collected':
        return { 
          icon: CheckCircle, 
          color: 'text-blue-600', 
          bgColor: 'bg-blue-100',
          label: 'Collected',
          borderColor: 'border-blue-200'
        };
      case 'in-transit':
        return { 
          icon: Clock, 
          color: 'text-yellow-600', 
          bgColor: 'bg-yellow-100',
          label: 'In Transit',
          borderColor: 'border-yellow-200'
        };
      case 'processing':
        return { 
          icon: ScanBarcode, 
          color: 'text-purple-600', 
          bgColor: 'bg-purple-100',
          label: 'Processing',
          borderColor: 'border-purple-200'
        };
      case 'completed':
        return { 
          icon: CheckCircle, 
          color: 'text-green-600', 
          bgColor: 'bg-green-100',
          label: 'Completed',
          borderColor: 'border-green-200'
        };
      default:
        return { 
          icon: AlertTriangle, 
          color: 'text-gray-600', 
          bgColor: 'bg-gray-100',
          label: status,
          borderColor: 'border-gray-200'
        };
    }
  };

  const filteredSamples = samples.filter(sample => {
    const matchesSearch = 
      sample.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.barcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.test.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || sample.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const toggleExpand = (id) => {
    setExpandedSample(expandedSample === id ? null : id);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Sample Tracking</h1>
          <p className="text-sm text-gray-500 mt-1">Barcode-based sample lifecycle tracking</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm w-full sm:w-auto">
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print Labels</span>
            <span className="sm:hidden">Print</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md text-sm w-full sm:w-auto">
            <ScanBarcode className="w-4 h-4" />
            <span>Scan</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} padding="small">
              <div className="flex items-center gap-3">
                <div className={`p-2 ${stat.bgColor} rounded-lg flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{stat.label}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Samples List */}
      <Card padding="small">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input 
              type="text" 
              placeholder="Search samples..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="collected">Collected</option>
              <option value="in-transit">In Transit</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
            </select>
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Sample ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Barcode</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Patient</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Test</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Collected</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Location</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSamples.map((sample) => {
                const statusConfig = getStatusConfig(sample.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <tr key={sample.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{sample.id}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <ScanBarcode className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-mono text-gray-600">{sample.barcode}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900">{sample.patient}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{sample.test}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{sample.collected}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{sample.location}</td>
                    <td className="py-4 px-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        <span className="capitalize">{statusConfig.label}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          {filteredSamples.map((sample) => {
            const statusConfig = getStatusConfig(sample.status);
            const StatusIcon = statusConfig.icon;
            const isExpanded = expandedSample === sample.id;
            
            return (
              <div 
                key={sample.id} 
                className={`border rounded-lg overflow-hidden ${statusConfig.borderColor} ${isExpanded ? 'bg-gray-50' : 'bg-white'}`}
              >
                {/* Main Card */}
                <div 
                  className="p-3 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleExpand(sample.id)}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`p-2 ${statusConfig.bgColor} rounded-lg flex-shrink-0`}>
                      <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-900 truncate">{sample.id}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
                          {statusConfig.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{sample.patient} • {sample.test}</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-3 pb-3 border-t border-gray-100">
                    <div className="pt-3 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Barcode</span>
                        <div className="flex items-center gap-1 font-mono text-xs">
                          <QrCode className="w-3 h-3" />
                          {sample.barcode}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Collected</span>
                        <span>{sample.collected}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Location</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs">{sample.location}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700">
                          <Printer className="w-3 h-3" />
                          Label
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-blue-600 text-white rounded-lg text-xs font-medium">
                          <ScanBarcode className="w-3 h-3" />
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
          {filteredSamples.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <ScanBarcode className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No samples found.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SampleTracking;