// src/components/laboratory/ReportGeneration.jsx
import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle, 
  Clock, 
  Search, 
  Filter,
  MoreVertical,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import Card from '../common/Card';

const ReportGeneration = () => {
  const [reports, setReports] = useState([
    { id: 'RPT-2024-001', patient: 'John Smith', test: 'Complete Blood Count', ordered: 'Dr. Sarah Johnson', collected: '10:30 AM', status: 'ready', verified: true },
    { id: 'RPT-2024-002', patient: 'Emily Davis', test: 'Lipid Profile', ordered: 'Dr. Michael Chen', collected: '10:45 AM', status: 'processing', verified: false },
    { id: 'RPT-2024-003', patient: 'Robert Wilson', test: 'Blood Glucose', ordered: 'Dr. James Wilson', collected: '11:00 AM', status: 'ready', verified: true },
    { id: 'RPT-2024-004', patient: 'Lisa Anderson', test: 'Thyroid Panel', ordered: 'Dr. Maria Garcia', collected: '09:15 AM', status: 'pending', verified: false },
    { id: 'RPT-2024-005', patient: 'Michael Brown', test: 'Liver Function', ordered: 'Dr. Sarah Johnson', collected: '11:30 AM', status: 'ready', verified: true },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedReport, setExpandedReport] = useState(null);

  const stats = [
    { value: 45, label: 'Ready for Review', color: 'green', bgColor: 'bg-green-50', borderColor: 'border-green-200', textColor: 'text-green-700', subTextColor: 'text-green-600' },
    { value: 28, label: 'Verified Today', color: 'blue', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', textColor: 'text-blue-700', subTextColor: 'text-blue-600' },
    { value: 12, label: 'Processing', color: 'yellow', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200', textColor: 'text-yellow-700', subTextColor: 'text-yellow-600' },
    { value: 156, label: 'Total Reports', color: 'gray', bgColor: 'bg-gray-50', borderColor: 'border-gray-200', textColor: 'text-gray-700', subTextColor: 'text-gray-600' },
  ];

  const getStatusConfig = (status) => {
    switch(status) {
      case 'ready':
        return { bg: 'bg-green-100', text: 'text-green-700', iconBg: 'bg-green-100', iconText: 'text-green-600', label: 'Ready' };
      case 'processing':
        return { bg: 'bg-blue-100', text: 'text-blue-700', iconBg: 'bg-blue-100', iconText: 'text-blue-600', label: 'Processing' };
      default:
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', iconBg: 'bg-yellow-100', iconText: 'text-yellow-600', label: 'Pending' };
    }
  };

  const filteredReports = reports.filter(report => 
    report.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.test.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.ordered.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleExpand = (id) => {
    setExpandedReport(expandedReport === id ? null : id);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Report Generation</h1>
          <p className="text-sm text-gray-500 mt-1">Automated lab report creation and distribution</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm w-full sm:w-auto">
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Batch Print</span>
            <span className="sm:hidden">Print</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md text-sm w-full sm:w-auto">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Generate Reports</span>
            <span className="sm:hidden">Generate</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className={`${stat.bgColor} ${stat.borderColor} border`}
            padding="small"
          >
            <div className="text-center">
              <p className={`text-2xl sm:text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
              <p className={`text-xs sm:text-sm ${stat.subTextColor} mt-1`}>{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Reports List */}
      <Card padding="small">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input 
              type="text" 
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm sm:w-auto w-full">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* Reports */}
        <div className="space-y-2 sm:space-y-3">
          {filteredReports.map((report) => {
            const status = getStatusConfig(report.status);
            const isExpanded = expandedReport === report.id;
            
            return (
              <div 
                key={report.id} 
                className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Main Row */}
                <div 
                  className="flex items-center justify-between p-3 sm:p-4 cursor-pointer sm:cursor-default"
                  onClick={() => window.innerWidth < 640 && toggleExpand(report.id)}
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    {/* Icon */}
                    <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${status.iconBg}`}>
                      <FileText className={`w-5 h-5 sm:w-6 sm:h-6 ${status.iconText}`} />
                    </div>
                    
                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900 text-sm sm:text-base truncate">{report.test}</span>
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                            {status.label}
                          </span>
                          {report.verified && (
                            <span className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              <CheckCircle className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">
                        {report.patient} • {report.ordered}
                      </p>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <span className="hidden sm:flex text-sm text-gray-500 items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {report.collected}
                    </span>
                    
                    {/* Desktop Actions */}
                    {report.status === 'ready' && (
                      <div className="hidden sm:flex items-center gap-1">
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                          <Printer className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    {/* Mobile Expand Icon */}
                    <div className="sm:hidden text-gray-400">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Mobile Expanded Details */}
                {isExpanded && (
                  <div className="sm:hidden px-3 pb-3 border-t border-gray-100 bg-gray-50">
                    <div className="pt-3 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Report ID</span>
                        <span className="font-mono text-xs">{report.id}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Collected</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {report.collected}
                        </span>
                      </div>
                      {report.verified && (
                        <div className="flex items-center gap-1 text-xs text-blue-700">
                          <CheckCircle className="w-3 h-3" />
                          Verified Report
                        </div>
                      )}
                      {report.status === 'ready' && (
                        <div className="flex gap-2 pt-2">
                          <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700">
                            <Printer className="w-4 h-4" />
                            Print
                          </button>
                          <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
          {filteredReports.length === 0 && (
            <div className="text-center py-8 sm:py-12 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No reports found matching your search.</p>
            </div>
          )}
        </div>

        {/* Load More (Mobile) */}
        <button className="w-full mt-4 py-3 text-sm text-blue-600 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 sm:hidden">
          Load More Reports
        </button>
      </Card>
    </div>
  );
};

export default ReportGeneration;