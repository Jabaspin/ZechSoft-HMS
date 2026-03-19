// src/components/radiology/DicomManager.jsx
import React, { useState } from 'react';
import { 
  Database, 
  Upload, 
  Download, 
  Trash2, 
  Search, 
  Filter, 
  HardDrive, 
  Activity,
  ChevronRight,
  MoreVertical,
  FileDigit,
  Calendar,
  Server,
  Archive,
  X
} from 'lucide-react';
import Card from '../common/Card';

const DicomManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const [studies, setStudies] = useState([
    { id: '1.2.840.113619.2.55.3.2831164357.123.1234567890', patient: 'John Smith', modality: 'CT', date: '2024-03-19', size: '245 MB', status: 'archived', description: 'Chest CT Scan' },
    { id: '1.2.840.113619.2.55.3.2831164357.124.1234567891', patient: 'Emily Davis', modality: 'MRI', date: '2024-03-19', size: '180 MB', status: 'local', description: 'Brain MRI' },
    { id: '1.2.840.113619.2.55.3.2831164357.125.1234567892', patient: 'Robert Wilson', modality: 'X-Ray', date: '2024-03-18', size: '15 MB', status: 'local', description: 'Chest X-Ray' },
    { id: '1.2.840.113619.2.55.3.2831164357.126.1234567893', patient: 'Lisa Anderson', modality: 'CT', date: '2024-03-18', size: '320 MB', status: 'archived', description: 'Abdomen CT' },
    { id: '1.2.840.113619.2.55.3.2831164357.127.1234567894', patient: 'Michael Brown', modality: 'MRI', date: '2024-03-17', size: '210 MB', status: 'local', description: 'Spine MRI' },
  ]);

  const stats = [
    { label: 'Total Storage', value: '2.4 TB', icon: Database, color: 'blue', bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
    { label: 'Available', value: '1.8 TB', icon: HardDrive, color: 'green', bgColor: 'bg-green-100', iconColor: 'text-green-600' },
    { label: 'Total Studies', value: '12,456', icon: Activity, color: 'purple', bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
    { label: 'Today\'s Uploads', value: '89', icon: Upload, color: 'yellow', bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  ];

  const getModalityColor = (modality) => {
    switch(modality) {
      case 'CT': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'MRI': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'X-Ray': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    return status === 'local' ? <Server className="w-3 h-3" /> : <Archive className="w-3 h-3" />;
  };

  const getStatusColor = (status) => {
    return status === 'local' 
      ? 'bg-green-100 text-green-700 border-green-200' 
      : 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const filteredStudies = studies.filter(study => {
    const matchesSearch = 
      study.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.modality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || study.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const truncateId = (id, length = 20) => {
    if (id.length <= length) return id;
    return id.substring(0, 8) + '...' + id.substring(id.length - 8);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">DICOM Manager</h1>
          <p className="text-sm text-gray-500 mt-1">DICOM storage, routing, and lifecycle management</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm w-full sm:w-auto">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
            <span className="sm:hidden">Export</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md text-sm w-full sm:w-auto">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Import DICOM</span>
            <span className="sm:hidden">Import</span>
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
                <div className={`p-2 sm:p-3 ${stat.bgColor} rounded-lg flex-shrink-0`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-xl sm:text-2xl font-bold text-gray-800 truncate">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{stat.label}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Studies List */}
      <Card padding="small">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input 
              type="text" 
              placeholder="Search by patient, ID, or modality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="all">All Status</option>
              <option value="local">Local</option>
              <option value="archived">Archived</option>
            </select>
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Study ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Patient</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Modality</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Size</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudies.map((study) => (
                <tr 
                  key={study.id} 
                  onClick={() => setSelectedStudy(study)}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="py-4 px-4">
                    <p className="text-xs font-mono text-gray-600 truncate max-w-[200px]" title={study.id}>
                      {truncateId(study.id, 25)}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900 text-sm">{study.patient}</p>
                    <p className="text-xs text-gray-500">{study.description}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold border ${getModalityColor(study.modality)}`}>
                      {study.modality}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{study.date}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{study.size}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(study.status)}`}>
                      {getStatusIcon(study.status)}
                      <span className="capitalize">{study.status}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          {filteredStudies.map((study) => (
            <div 
              key={study.id}
              onClick={() => setSelectedStudy(study)}
              className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold border flex-shrink-0 ${getModalityColor(study.modality)}`}>
                    {study.modality}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(study.status)}`}>
                    {getStatusIcon(study.status)}
                  </span>
                </div>
                <span className="text-xs text-gray-500 flex-shrink-0">{study.size}</span>
              </div>

              {/* Patient Info */}
              <div className="mb-2">
                <h4 className="font-semibold text-gray-900 text-sm truncate">{study.patient}</h4>
                <p className="text-xs text-gray-500 truncate">{study.description}</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{study.date}</span>
                </div>
                <span className="text-xs font-mono text-gray-400 truncate max-w-[120px]">
                  {truncateId(study.id, 15)}
                </span>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 mt-3">
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-1 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700"
                >
                  <Download className="w-3 h-3" />
                  Download
                </button>
                <button 
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-1 py-2 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            </div>
          ))}
          
          {filteredStudies.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Database className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No studies found.</p>
            </div>
          )}
        </div>
      </Card>

      {/* Study Detail Modal */}
      {selectedStudy && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedStudy(null)}
          />
          <div className="relative bg-white w-full sm:w-full sm:max-w-lg rounded-t-xl sm:rounded-xl shadow-2xl max-h-[85vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${getModalityColor(selectedStudy.modality).split(' ')[0]}`}>
                  <FileDigit className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{selectedStudy.modality} Study</h3>
                  <p className="text-xs text-gray-500 font-mono">{truncateId(selectedStudy.id, 30)}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStudy(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedStudy.status)}`}>
                  {getStatusIcon(selectedStudy.status)}
                  <span className="capitalize">{selectedStudy.status}</span>
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getModalityColor(selectedStudy.modality)}`}>
                  {selectedStudy.modality}
                </span>
              </div>

              {/* Patient Info */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Patient</p>
                <p className="font-semibold text-gray-800">{selectedStudy.patient}</p>
                <p className="text-sm text-gray-600 mt-1">{selectedStudy.description}</p>
              </div>

              {/* Study Details Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Study Date</p>
                  <p className="font-semibold text-gray-800 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedStudy.date}
                  </p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">File Size</p>
                  <p className="font-semibold text-gray-800">{selectedStudy.size}</p>
                </div>
              </div>

              {/* Full ID */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Study Instance UID</p>
                <p className="text-xs font-mono text-gray-700 break-all">{selectedStudy.id}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="flex-1 py-2.5 border border-gray-300 rounded-lg font-medium text-sm text-gray-700 flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" />
                  Share
                </button>
                <button className="px-3 py-2.5 border border-red-200 text-red-600 rounded-lg hover:bg-red-50">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DicomManager;