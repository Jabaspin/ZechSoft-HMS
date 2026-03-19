// src/components/laboratory/ReportGeneration.jsx
import React, { useState } from 'react';
import { FileText, Download, Printer, CheckCircle, Clock, Search, Filter } from 'lucide-react';
import Card from '../common/Card';

const ReportGeneration = () => {
  const [reports] = useState([
    { id: 'RPT-2024-001', patient: 'John Smith', test: 'Complete Blood Count', ordered: 'Dr. Sarah Johnson', collected: '10:30 AM', status: 'ready', verified: true },
    { id: 'RPT-2024-002', patient: 'Emily Davis', test: 'Lipid Profile', ordered: 'Dr. Michael Chen', collected: '10:45 AM', status: 'processing', verified: false },
    { id: 'RPT-2024-003', patient: 'Robert Wilson', test: 'Blood Glucose', ordered: 'Dr. James Wilson', collected: '11:00 AM', status: 'ready', verified: true },
    { id: 'RPT-2024-004', patient: 'Lisa Anderson', test: 'Thyroid Panel', ordered: 'Dr. Maria Garcia', collected: '09:15 AM', status: 'pending', verified: false },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Report Generation</h1>
          <p className="text-gray-500 mt-1">Automated lab report creation and distribution</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Printer className="w-4 h-4" />
            Batch Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">
            <FileText className="w-4 h-4" />
            Generate Reports
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-green-50 border-green-200">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-700">45</p>
            <p className="text-sm text-green-600 mt-1">Ready for Review</p>
          </div>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-700">28</p>
            <p className="text-sm text-blue-600 mt-1">Verified Today</p>
          </div>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-700">12</p>
            <p className="text-sm text-yellow-600 mt-1">Processing</p>
          </div>
        </Card>
        <Card className="bg-gray-50 border-gray-200">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-700">156</p>
            <p className="text-sm text-gray-600 mt-1">Total Reports</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search reports by patient, test, or doctor..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${
                  report.status === 'ready' ? 'bg-green-100' :
                  report.status === 'processing' ? 'bg-blue-100' :
                  'bg-yellow-100'
                }`}>
                  <FileText className={`w-6 h-6 ${
                    report.status === 'ready' ? 'text-green-600' :
                    report.status === 'processing' ? 'text-blue-600' :
                    'text-yellow-600'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{report.test}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      report.status === 'ready' ? 'bg-green-100 text-green-700' :
                      report.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {report.status === 'ready' ? 'Ready' : report.status === 'processing' ? 'Processing' : 'Pending'}
                    </span>
                    {report.verified && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{report.patient} • Ordered by {report.ordered}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {report.collected}
                </span>
                {report.status === 'ready' && (
                  <>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <Printer className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                      <Download className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ReportGeneration;