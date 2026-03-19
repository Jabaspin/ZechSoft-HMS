// src/components/pharmacy/PharmacyDashboard.jsx
import React, { useState } from 'react';
import { 
  Pill, 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart,
  Search,
  Filter,
  ChevronRight,
  Plus,
  Minus,
  MoreVertical
} from 'lucide-react';
import Card from '../common/Card';

const PharmacyDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSale, setSelectedSale] = useState(null);

  const stats = [
    { label: 'Total Medicines', value: '2,456', icon: Pill, trend: '+5%', color: 'blue', bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
    { label: 'Low Stock', value: '23', icon: AlertTriangle, trend: '-12%', color: 'red', bgColor: 'bg-red-100', iconColor: 'text-red-600' },
    { label: 'Today\'s Sales', value: '$12,450', icon: DollarSign, trend: '+18%', color: 'green', bgColor: 'bg-green-100', iconColor: 'text-green-600' },
    { label: 'Pending', value: '15', icon: ShoppingCart, trend: '+3%', color: 'yellow', bgColor: 'bg-yellow-100', iconColor: 'text-yellow-600' },
  ];

  const [recentSales, setRecentSales] = useState([
    { id: 'RX-2024-001', patient: 'John Smith', medicines: 'Amoxicillin 500mg', quantity: 2, amount: '$45.00', time: '10:30 AM', status: 'Completed' },
    { id: 'RX-2024-002', patient: 'Emily Davis', medicines: 'Metformin 850mg', quantity: 1, amount: '$32.50', time: '10:45 AM', status: 'Processing' },
    { id: 'RX-2024-003', patient: 'Robert Wilson', medicines: 'Atorvastatin 20mg', quantity: 3, amount: '$78.00', time: '11:00 AM', status: 'Pending' },
    { id: 'RX-2024-004', patient: 'Sarah Miller', medicines: 'Omeprazole 20mg', quantity: 1, amount: '$28.00', time: '11:15 AM', status: 'Completed' },
  ]);

  const lowStockItems = [
    { name: 'Amoxicillin 500mg', stock: 15, min: 50, category: 'Antibiotics', supplier: 'MedPharma Inc.' },
    { name: 'Metformin 850mg', stock: 8, min: 30, category: 'Diabetes', supplier: 'HealthCare Plus' },
    { name: 'Atorvastatin 20mg', stock: 12, min: 40, category: 'Cardiac', supplier: 'CardioMeds' },
    { name: 'Omeprazole 20mg', stock: 20, min: 60, category: 'Gastro', supplier: 'GastroPharm' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'Processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const filteredSales = recentSales.filter(sale => 
    sale.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sale.medicines.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sale.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Pharmacy Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Centralized pharmacy management system</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md text-sm w-full sm:w-auto">
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">New Sale</span>
          <span className="sm:hidden">Sale</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden" padding="small">
              <div className={`absolute top-0 right-0 w-16 h-16 ${stat.bgColor} rounded-bl-full -mr-4 -mt-4 opacity-50`}></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-2 sm:mb-4">
                  <div className={`p-2 sm:p-3 ${stat.bgColor} rounded-lg`}>
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconColor}`} />
                  </div>
                  <span className={`text-xs sm:text-sm font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend}
                  </span>
                </div>
                <p className="text-xl sm:text-3xl font-bold text-gray-800 truncate">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">{stat.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Search Bar - Mobile */}
      <div className="sm:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search sales..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Sales */}
        <Card 
          title={
            <div className="flex items-center justify-between w-full">
              <span>Recent Sales</span>
              <span className="sm:hidden text-xs font-normal text-gray-500">({filteredSales.length})</span>
            </div>
          }
          action={
            <button className="text-blue-600 text-xs sm:text-sm font-medium hover:text-blue-700">
              View All
            </button>
          }
          padding="small"
        >
          {/* Desktop Search */}
          <div className="hidden sm:block mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search by patient, medicine, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {filteredSales.map((sale) => (
              <div 
                key={sale.id} 
                onClick={() => setSelectedSale(sale)}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors gap-2 sm:gap-0"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between sm:justify-start gap-2">
                    <p className="font-medium text-gray-900 text-sm truncate">{sale.patient}</p>
                    <span className={`sm:hidden px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(sale.status)}`}>
                      {sale.status}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">
                    {sale.medicines} <span className="text-gray-400">x{sale.quantity}</span>
                  </p>
                  <p className="sm:hidden text-xs text-gray-400 mt-1">{sale.time}</p>
                </div>
                <div className="flex items-center justify-between sm:text-right sm:min-w-[100px] gap-2">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{sale.amount}</p>
                    <span className={`hidden sm:inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(sale.status)}`}>
                      {sale.status}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 sm:hidden" />
                </div>
              </div>
            ))}
            
            {filteredSales.length === 0 && (
              <div className="text-center py-6 sm:py-8 text-gray-500">
                <ShoppingCart className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No sales found.</p>
              </div>
            )}
          </div>

          {/* Mobile Load More */}
          <button className="w-full mt-3 py-2.5 text-sm text-blue-600 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 sm:hidden">
            Load More Sales
          </button>
        </Card>

        {/* Low Stock Alert */}
        <Card 
          title={
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>Low Stock Alert</span>
              <span className="sm:hidden text-xs font-normal text-gray-500">({lowStockItems.length})</span>
            </div>
          }
          action={
            <button className="text-red-600 text-xs sm:text-sm font-medium hover:text-red-700">
              View All
            </button>
          }
          padding="small"
        >
          <div className="space-y-2 sm:space-y-3">
            {lowStockItems.map((item, index) => {
              const stockPercent = (item.stock / item.min) * 100;
              
              return (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg gap-2 sm:gap-0">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between sm:justify-start gap-2">
                      <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                      <span className="sm:hidden text-xs font-bold text-red-600">
                        {item.stock}/{item.min}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{item.category}</p>
                    <p className="sm:hidden text-xs text-gray-400 mt-1">Supplier: {item.supplier}</p>
                    
                    {/* Mobile Progress Bar */}
                    <div className="sm:hidden mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-red-600 font-medium">{item.stock} units</span>
                        <span className="text-gray-500">Min: {item.min}</span>
                      </div>
                      <div className="w-full bg-red-200 rounded-full h-1.5">
                        <div 
                          className="bg-red-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${Math.min(stockPercent, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden sm:block text-right min-w-[80px]">
                    <p className="text-sm font-bold text-red-600">{item.stock} units</p>
                    <p className="text-xs text-gray-500">Min: {item.min}</p>
                  </div>

                  {/* Mobile Quick Order */}
                  <div className="sm:hidden flex gap-2 mt-2">
                    <button className="flex-1 py-2 bg-white border border-red-300 text-red-700 rounded-lg text-xs font-medium">
                      Order Now
                    </button>
                    <button className="p-2 bg-white border border-gray-300 rounded-lg text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Bulk Order */}
          <button className="w-full mt-3 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 sm:hidden">
            Order All Low Stock Items
          </button>
        </Card>
      </div>

      {/* Sale Detail Modal */}
      {selectedSale && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedSale(null)}
          />
          <div className="relative bg-white w-full sm:w-full sm:max-w-md rounded-t-xl sm:rounded-xl shadow-2xl max-h-[85vh] overflow-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Sale Details</h3>
                <p className="text-sm text-gray-500">{selectedSale.id}</p>
              </div>
              <button 
                onClick={() => setSelectedSale(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  {selectedSale.patient.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{selectedSale.patient}</p>
                  <p className="text-sm text-gray-500">{selectedSale.time}</p>
                </div>
              </div>

              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedSale.status)}`}>
                {selectedSale.status}
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Medicine</p>
                <p className="font-medium text-gray-800">{selectedSale.medicines}</p>
                <p className="text-sm text-gray-600 mt-1">Quantity: {selectedSale.quantity}</p>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Amount</p>
                <p className="text-2xl font-bold text-gray-800">{selectedSale.amount}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <button className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm">
                  Print Receipt
                </button>
                <button className="flex-1 py-2.5 border border-gray-300 rounded-lg font-medium text-sm text-gray-700">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacyDashboard;