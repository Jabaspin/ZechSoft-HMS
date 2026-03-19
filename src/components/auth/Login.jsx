// src/components/auth/Login.jsx
import React, { useState } from 'react';
import { Activity, Eye, EyeOff, Lock, User } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      const success = onLogin(credentials);
      if (!success) {
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        {/* Left Panel */}
        <div className="w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">MedCore HMS</h1>
                <p className="text-blue-200 text-sm">Enterprise Healthcare Solution</p>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Access your hospital management dashboard. Streamline patient care, manage resources, and optimize workflows.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg font-bold">01</span>
              </div>
              <div>
                <p className="font-semibold">Automated OPD/IPD</p>
                <p className="text-sm text-blue-200">Smart patient management</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg font-bold">02</span>
              </div>
              <div>
                <p className="font-semibold">Integrated Pharmacy</p>
                <p className="text-sm text-blue-200">Real-time inventory tracking</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-lg font-bold">03</span>
              </div>
              <div>
                <p className="font-semibold">Advanced LIMS & PACS</p>
                <p className="text-sm text-blue-200">Lab & radiology integration</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign In</h2>
            <p className="text-gray-500">Enter your credentials to access the system</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Demo Credentials</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div><span className="font-medium">admin / admin123</span> (Admin)</div>
              <div><span className="font-medium">doctor / doc123</span> (Doctor)</div>
              <div><span className="font-medium">nurse / nurse123</span> (Nurse)</div>
              <div><span className="font-medium">pharmacist / pharma123</span> (Pharmacy)</div>
              <div><span className="font-medium">labtech / lab123</span> (Lab)</div>
              <div><span className="font-medium">radiologist / radio123</span> (Radio)</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;