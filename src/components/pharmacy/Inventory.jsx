// src/components/pharmacy/Inventory.jsx
import React, { useState } from 'react';
import { Search, Filter, Plus, Package, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Card from '../common/Card';

const Inventory = () => {
  const [inventory] = useState([
    { id: 'MED-001', name: 'Amoxicillin 500mg', category: 'Antibiotics', batch: 'B-2024-001', stock: 150, minLevel: 50, expiry: '2025-12-15', supplier: 'PharmaCorp', status: 'normal' },
    { id: 'MED-002', name: 'Metformin 850mg', category: 'Diabetes', batch: 'B-2024-002', stock: 8, minLevel: 30, expiry: '2025-08-20', supplier: 'MediSupply', status: 'low' },
    { id: 'MED-003', name: 'Atorvastatin 20mg', category: 'Cardiac', batch: 'B-2024-003', stock: 200, minLevel: 40, expiry: '2026-03-10', supplier: 'HealthPharm', status: 'normal' },
    { id: 'MED-004', name: 'Omeprazole 20mg', category: 'Gastro', batch: 'B-2024-004', stock: 20, minLevel: 60, expiry: '2025-06-15', supplier: 'PharmaCorp', status: 'low' },
    { id: 'MED-005', name: 'Paracetamol 500mg', category: 'Analgesics', batch: 'B-2024-005', stock: 500, minLevel: 100, expiry: '2026-01-30', supplier: 'MediSupply', status: 'normal' },
  ]);

  const [expandedCard, setExpandedCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const getStockPercentage = (stock, minLevel) => {
    return Math.min((stock / minLevel) * 100, 100);
  };

  const isLowStock = (stock, minLevel) => stock < minLevel;

  return (
    <div className="space-y-4 md:space-y-6 px-4 md:px-0">
      {/* Header - Stack on mobile */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Inventory Management</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">Real-time stock tracking and management</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm md:text-base">
            <Package className="w-4 h-4" />
            <span>Stock Adjustment</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md text-sm md:text-base">
            <Plus className="w-4 h-4" />
            <span>Add Medicine</span>
          </button>
        </div>
      </div>

      <Card className="p-4 md:p-6">
        {/* Search & Filter - Stack on mobile */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search medicines..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
            />
          </div>
          <div className="flex gap-2 md:gap-4">
            <select className="flex-1 md:flex-none px-3 md:px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base">
              <option>All Categories</option>
              <option>Antibiotics</option>
              <option>Cardiac</option>
              <option>Diabetes</option>
            </select>
            <button className="flex items-center justify-center gap-2 px-3 md:px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm md:text-base">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>

        {/* Desktop Table - Hidden on mobile */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Medicine ID</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Category</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Batch</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Stock Level</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Expiry</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm font-medium text-gray-900">{item.id}</td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.supplier}</p>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{item.category}</td>
                  <td className="py-4 px-4 text-sm text-gray-600 font-mono">{item.batch}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${isLowStock(item.stock, item.minLevel) ? 'bg-red-500' : 'bg-green-500'}`}
                          style={{ width: `${getStockPercentage(item.stock, item.minLevel)}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${isLowStock(item.stock, item.minLevel) ? 'text-red-600' : 'text-gray-900'}`}>
                        {item.stock}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{item.expiry}</td>
                  <td className="py-4 px-4">
                    {isLowStock(item.stock, item.minLevel) ? (
                      <span className="flex items-center gap-1 text-red-600 text-sm font-medium">
                        <AlertCircle className="w-4 h-4" />
                        Low Stock
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Normal
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards - Visible only on mobile */}
        <div className="md:hidden space-y-3">
          {inventory.map((item) => (
            <div 
              key={item.id} 
              className={`border rounded-lg overflow-hidden ${isLowStock(item.stock, item.minLevel) ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}
            >
              <div 
                className="p-4 cursor-pointer"
                onClick={() => toggleCard(item.id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-500">{item.id}</span>
                      {isLowStock(item.stock, item.minLevel) ? (
                        <span className="flex items-center gap-1 text-red-600 text-xs font-medium">
                          <AlertCircle className="w-3 h-3" />
                          Low
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                          <CheckCircle className="w-3 h-3" />
                          OK
                        </span>
                      )}
                    </div>
                    <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.supplier}</p>
                    
                    {/* Stock Progress Bar - Mobile */}
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${isLowStock(item.stock, item.minLevel) ? 'bg-red-500' : 'bg-green-500'}`}
                          style={{ width: `${getStockPercentage(item.stock, item.minLevel)}%` }}
                        ></div>
                      </div>
                      <span className={`text-xs font-medium ${isLowStock(item.stock, item.minLevel) ? 'text-red-600' : 'text-gray-700'}`}>
                        {item.stock}/{item.minLevel}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1">
                    {expandedCard === item.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
                
                {/* Expanded Details */}
                {expandedCard === item.id && (
                  <div className="mt-3 pt-3 border-t border-gray-200/50 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Category:</span>
                      <span className="text-gray-700">{item.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Batch:</span>
                      <span className="font-mono text-gray-700">{item.batch}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Stock:</span>
                      <span className={`font-medium ${isLowStock(item.stock, item.minLevel) ? 'text-red-600' : 'text-gray-700'}`}>
                        {item.stock} units
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Min Level:</span>
                      <span className="text-gray-700">{item.minLevel} units</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Expiry:</span>
                      <span className="text-gray-700">{item.expiry}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Supplier:</span>
                      <span className="text-gray-700">{item.supplier}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Inventory;