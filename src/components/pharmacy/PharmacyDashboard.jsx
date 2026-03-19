// src/components/pharmacy/PharmacyDashboard.jsx
import React from 'react';
import { Pill, Package, AlertTriangle, TrendingUp, DollarSign, ShoppingCart } from 'lucide-react';
import Card from '../common/Card';

const PharmacyDashboard = () => {
  const stats = [
    { label: 'Total Medicines', value: '2,456', icon: Pill, trend: '+5%', color: 'blue' },
    { label: 'Low Stock Items', value: '23', icon: AlertTriangle, trend: '-12%', color: 'red' },
    { label: 'Today\'s Sales', value: '$12,450', icon: DollarSign, trend: '+18%', color: 'green' },
    { label: 'Pending Orders', value: '15', icon: ShoppingCart, trend: '+3%', color: 'yellow' },
  ];

  const recentSales = [
    { id: 'RX-2024-001', patient: 'John Smith', medicines: 'Amoxicillin 500mg', quantity: 2, amount: '$45.00', time: '10:30 AM', status: 'Completed' },
    { id: 'RX-2024-002', patient: 'Emily Davis', medicines: 'Metformin 850mg', quantity: 1, amount: '$32.50', time: '10:45 AM', status: 'Processing' },
    { id: 'RX-2024-003', patient: 'Robert Wilson', medicines: 'Atorvastatin 20mg', quantity: 3, amount: '$78.00', time: '11:00 AM', status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pharmacy Dashboard</h1>
          <p className="text-gray-500 mt-1">Centralized pharmacy management system</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">
          <ShoppingCart className="w-4 h-4" />
          New Sale
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-${stat.color}-100 rounded-lg`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className={`text-sm font-medium ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Recent Sales" action={<button className="text-blue-600 text-sm font-medium">View All</button>}>
          <div className="space-y-4">
            {recentSales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{sale.patient}</p>
                  <p className="text-sm text-gray-500">{sale.medicines} x{sale.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{sale.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    sale.status === 'Completed' ? 'bg-green-100 text-green-700' :
                    sale.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {sale.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Low Stock Alert" action={<button className="text-red-600 text-sm font-medium">View All</button>}>
          <div className="space-y-3">
            {[
              { name: 'Amoxicillin 500mg', stock: 15, min: 50, category: 'Antibiotics' },
              { name: 'Metformin 850mg', stock: 8, min: 30, category: 'Diabetes' },
              { name: 'Atorvastatin 20mg', stock: 12, min: 40, category: 'Cardiac' },
              { name: 'Omeprazole 20mg', stock: 20, min: 60, category: 'Gastro' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-red-600">{item.stock} units</p>
                  <p className="text-xs text-gray-500">Min: {item.min}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PharmacyDashboard;