// src/components/opd-ipd/BedAllocation.jsx
import React, { useState } from 'react';
import { 
  Bed, 
  CheckCircle, 
  XCircle, 
  Clock, 
  ArrowRightLeft,
  Users,
  Filter,
  ChevronDown,
  ChevronUp,
  Info,
  Plus
} from 'lucide-react';
import Card from '../common/Card';

const BedAllocation = () => {
  const [selectedWard, setSelectedWard] = useState('all');
  const [expandedWard, setExpandedWard] = useState(null);
  const [selectedBed, setSelectedBed] = useState(null);
  
  const wards = [
    { 
      name: 'ICU', 
      total: 12,
      beds: Array(12).fill(null).map((_, i) => ({
        id: `ICU-${String(i+1).padStart(2, '0')}`,
        status: i < 10 ? 'occupied' : 'available',
        patient: i < 10 ? { name: `Patient ${i+1}`, admission: '2024-03-15', condition: i % 3 === 0 ? 'Critical' : 'Stable' } : null
      }))
    },
    { 
      name: 'General', 
      total: 50,
      beds: Array(50).fill(null).map((_, i) => ({
        id: `G-${String(i+1).padStart(2, '0')}`,
        status: i < 42 ? 'occupied' : i < 45 ? 'reserved' : 'available',
        patient: i < 42 ? { name: `Patient ${i+1}`, admission: '2024-03-16', condition: 'Stable' } : null
      }))
    },
    { 
      name: 'Surgery', 
      total: 20,
      beds: Array(20).fill(null).map((_, i) => ({
        id: `S-${String(i+1).padStart(2, '0')}`,
        status: i < 15 ? 'occupied' : 'available',
        patient: i < 15 ? { name: `Patient ${i+1}`, admission: '2024-03-17', condition: 'Post-Op' } : null
      }))
    },
    { 
      name: 'Pediatric', 
      total: 15,
      beds: Array(15).fill(null).map((_, i) => ({
        id: `P-${String(i+1).padStart(2, '0')}`,
        status: i < 8 ? 'occupied' : i < 10 ? 'reserved' : 'available',
        patient: i < 8 ? { name: `Child ${i+1}`, admission: '2024-03-18', condition: 'Stable' } : null
      }))
    }
  ];

  const getBedColor = (status) => {
    switch(status) {
      case 'occupied': return 'bg-red-50 border-red-300 text-red-700';
      case 'available': return 'bg-green-50 border-green-300 text-green-700 hover:bg-green-100';
      case 'reserved': return 'bg-yellow-50 border-yellow-300 text-yellow-700';
      case 'maintenance': return 'bg-gray-100 border-gray-300 text-gray-500';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'occupied': return <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />;
      case 'available': return <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />;
      case 'reserved': return <Clock className="w-3 h-3 sm:w-4 sm:h-4" />;
      default: return null;
    }
  };

  const getBedStats = (beds) => {
    const available = beds.filter(b => b.status === 'available').length;
    const occupied = beds.filter(b => b.status === 'occupied').length;
    const reserved = beds.filter(b => b.status === 'reserved').length;
    return { available, occupied, reserved, total: beds.length };
  };

  const toggleWardExpand = (wardName) => {
    setExpandedWard(expandedWard === wardName ? null : wardName);
  };

  const handleBedClick = (bed, wardName) => {
    if (bed.status === 'available') {
      // Handle bed allocation
      console.log('Allocate bed:', bed.id);
    } else {
      setSelectedBed({ ...bed, ward: wardName });
    }
  };

  const displayedWards = selectedWard === 'all' ? wards : wards.filter(w => w.name === selectedWard);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Bed Allocation</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time bed management and allocation</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="relative">
            <select 
              value={selectedWard} 
              onChange={(e) => {
                setSelectedWard(e.target.value);
                setExpandedWard(null);
              }}
              className="w-full sm:w-auto px-3 sm:px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none bg-white"
            >
              <option value="all">All Wards</option>
              {wards.map(w => (
                <option key={w.name} value={w.name}>{w.name} Ward</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md text-sm w-full sm:w-auto">
            <ArrowRightLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Transfer Patient</span>
            <span className="sm:hidden">Transfer</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {wards.map((ward) => {
          const stats = getBedStats(ward.beds);
          return (
            <div 
              key={ward.name}
              onClick={() => {
                setSelectedWard(ward.name);
                setExpandedWard(ward.name);
              }}
              className={`p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedWard === ward.name 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm sm:text-base text-gray-800">{ward.name}</span>
                <Bed className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl sm:text-2xl font-bold text-green-600">{stats.available}</span>
                <span className="text-xs sm:text-sm text-gray-500">/ {stats.total} free</span>
              </div>
              <div className="mt-2 flex gap-2 text-xs">
                <span className="text-red-600">{stats.occupied} occ</span>
                <span className="text-yellow-600">{stats.reserved} res</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-green-50 border border-green-300"></div>
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-red-50 border border-red-300"></div>
          <span className="text-gray-600">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-yellow-50 border border-yellow-300"></div>
          <span className="text-gray-600">Reserved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-gray-100 border border-gray-300"></div>
          <span className="text-gray-600">Maintenance</span>
        </div>
      </div>

      {/* Bed Grid by Ward */}
      <div className="space-y-4 sm:space-y-6">
        {displayedWards.map((ward) => {
          const stats = getBedStats(ward.beds);
          const isExpanded = expandedWard === ward.name || selectedWard !== 'all';
          
          return (
            <Card 
              key={ward.name} 
              title={
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span>{ward.name} Ward</span>
                    <span className="hidden sm:inline text-sm font-normal text-gray-500">
                      ({stats.available} available of {stats.total})
                    </span>
                  </div>
                  <button 
                    onClick={() => toggleWardExpand(ward.name)}
                    className="sm:hidden p-1 hover:bg-gray-100 rounded"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>
              }
              className="overflow-hidden"
              padding="small"
            >
              {/* Ward Stats Bar - Mobile */}
              <div className="sm:hidden mb-3 flex gap-2 text-xs">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full">{stats.available} Free</span>
                <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full">{stats.occupied} Occ</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">{stats.reserved} Res</span>
              </div>

              {/* Bed Grid */}
              <div className={`${isExpanded ? 'block' : 'hidden sm:block'}`}>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 sm:gap-3">
                  {ward.beds.map((bed) => (
                    <div 
                      key={bed.id}
                      onClick={() => handleBedClick(bed, ward.name)}
                      className={`relative p-2 sm:p-3 rounded-lg border-2 cursor-pointer transition-all ${getBedColor(bed.status)}`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <Bed className="w-4 h-4 sm:w-6 sm:h-6" />
                        <span className="text-xs font-semibold truncate w-full text-center">{bed.id}</span>
                        <div className="hidden sm:block">
                          {getStatusIcon(bed.status)}
                        </div>
                      </div>
                      
                      {/* Patient Indicator */}
                      {bed.patient && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full border-2 border-white shadow-sm"></div>
                      )}
                      
                      {/* Critical Indicator */}
                      {bed.patient?.condition === 'Critical' && (
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Collapsed Hint - Mobile */}
              {!isExpanded && (
                <div className="sm:hidden text-center py-4 text-gray-500 text-sm">
                  Tap to view {stats.total} beds
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Bed Detail Modal */}
      {selectedBed && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedBed(null)}
          />
          <div className="relative bg-white w-full sm:w-full sm:max-w-md rounded-t-xl sm:rounded-xl shadow-2xl max-h-[80vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Bed {selectedBed.id}</h3>
                <p className="text-sm text-gray-500">{selectedBed.ward} Ward</p>
              </div>
              <button 
                onClick={() => setSelectedBed(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                selectedBed.status === 'occupied' ? 'bg-red-100 text-red-700' :
                selectedBed.status === 'reserved' ? 'bg-yellow-100 text-yellow-700' :
                'bg-green-100 text-green-700'
              }`}>
                {getStatusIcon(selectedBed.status)}
                <span className="capitalize">{selectedBed.status}</span>
              </div>

              {selectedBed.patient ? (
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Patient</p>
                    <p className="font-semibold text-gray-800">{selectedBed.patient.name}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Admission Date</p>
                    <p className="font-semibold text-gray-800">{selectedBed.patient.admission}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Condition</p>
                    <p className={`font-semibold ${
                      selectedBed.patient.condition === 'Critical' ? 'text-red-600' : 'text-gray-800'
                    }`}>
                      {selectedBed.patient.condition}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                      View Patient
                    </button>
                    <button className="flex-1 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700">
                      Discharge
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">This bed is available for allocation</p>
                  <button className="w-full py-2 bg-green-600 text-white rounded-lg font-medium">
                    Allocate Patient
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BedAllocation;