// src/components/pharmacy/Inventory.jsx
import React, { useState } from 'react';
import { Search, Filter, Plus, Package, AlertCircle, CheckCircle } from 'lucide-react';
import Card from '../common/Card';

const Inventory = () => {
  const [inventory] = useState([
    { id: 'MED-001', name: 'Amoxicillin 500mg', category: 'Antibiotics', batch: 'B-2024-001', stock: 150, minLevel: 50, expiry: '2025-12-15', supplier: 'PharmaCorp', status: 'normal' },
    { id: 'MED-002', name: 'Metformin 850mg', category: 'Diabetes', batch: 'B-2024-002', stock: 8, minLevel: 30, expiry: '2025-08-20', supplier: 'MediSupply', status: 'low' },
    { id: 'MED-003', name: 'Atorvastatin 20mg', category: 'Cardiac', batch: 'B-2024-003', stock: 200, minLevel: 40, expiry: '2026-03-10', supplier: 'HealthPharm', status: 'normal' },
    { id: 'MED-004', name: 'Omeprazole 20mg', category: 'Gastro', batch: 'B-2024-004', stock: 20, minLevel: 60, expiry: '2025-06-15', supplier: 'PharmaCorp', status: 'low' },
    { id: 'MED-005', name: 'Paracetamol 500mg', category: 'Analgesics', batch: 'B-2024-005', stock: 500, minLevel: 100, expiry: '2026-01-30', supplier: 'MediSupply', status: 'normal' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
          <p className="text-gray-500 mt-1">Real-time stock tracking and management</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Package className="w-4 h-4" />
            Stock Adjustment
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">
            <Plus className="w-4 h-4" />
            Add Medicine
          </button>
        </div>
      </div>

      <Card>
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search medicines by name, ID, or category..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Categories</option>
            <option>Antibiotics</option>
            <option>Cardiac</option>
            <option>Diabetes</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
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
                  <td className="py-4 px-4 text-sm text-gray-600">{item.batch}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.stock < item.minLevel ? 'bg-red-500' : 'bg-green-500'}`}
                          style={{ width: `${Math.min((item.stock/item.minLevel)*100, 100)}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${item.stock < item.minLevel ? 'text-red-600' : 'text-gray-900'}`}>
                        {item.stock}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">{item.expiry}</td>
                  <td className="py-4 px-4">
                    {item.stock < item.minLevel ? (
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
      </Card>
    </div>
  );
};

export default Inventory;