// src/components/auth/Login.jsx
import React, { useState } from 'react';
import { Activity, Eye, EyeOff, Lock, User, ChevronDown, ChevronUp } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

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

  const features = [
    { num: '01', title: 'Automated OPD/IPD', desc: 'Smart patient management' },
    { num: '02', title: 'Integrated Pharmacy', desc: 'Real-time inventory tracking' },
    { num: '03', title: 'Advanced LIMS & PACS', desc: 'Lab & radiology integration' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        {/* Left Panel - Hidden on mobile, collapsible on tablet */}
        <div className={`
          ${showFeatures ? 'block' : 'hidden lg:block'}
          w-full lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 
          p-6 sm:p-8 lg:p-12 text-white flex flex-col justify-between
          transition-all duration-300 ease-in-out
        `}>
          <div>
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Activity className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold">MedCore HMS</h1>
                <p className="text-blue-200 text-xs lg:text-sm">Enterprise Healthcare Solution</p>
              </div>
            </div>
            
            <h2 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">Welcome Back</h2>
            <p className="text-blue-100 text-base lg:text-lg leading-relaxed mb-6 lg:mb-0">
              Access your hospital management dashboard. Streamline patient care, manage resources, and optimize workflows.
            </p>
          </div>

          <div className="space-y-3 lg:space-y-4">
            {features.map((feature) => (
              <div key={feature.num} className="flex items-center gap-3 bg-white/10 rounded-lg p-3 lg:p-4 backdrop-blur-sm">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-base lg:text-lg font-bold">{feature.num}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm lg:text-base truncate">{feature.title}</p>
                  <p className="text-xs lg:text-sm text-blue-200 truncate">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
          {/* Mobile Header - Only visible on small screens */}
          <div className="lg:hidden mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">MedCore HMS</h1>
                <p className="text-gray-500 text-xs">Enterprise Healthcare Solution</p>
              </div>
            </div>
            
            {/* Toggle Features Button for Mobile */}
            <button
              type="button"
              onClick={() => setShowFeatures(!showFeatures)}
              className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg text-blue-700 text-sm font-medium"
            >
              <span>{showFeatures ? 'Hide Features' : 'View Features'}</span>
              {showFeatures ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <div className="mb-6 lg:mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">Sign In</h2>
            <p className="text-gray-500 text-sm lg:text-base">Enter your credentials to access the system</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
            {error && (
              <div className="p-3 lg:p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
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
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium self-start sm:self-auto">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-base"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* <div className="mt-6 lg:mt-8 p-3 lg:p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Demo Credentials</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 text-xs text-gray-600">
              <div><span className="font-medium">admin / admin123</span> <span className="text-gray-400">(Admin)</span></div>
              <div><span className="font-medium">doctor / doc123</span> <span className="text-gray-400">(Doctor)</span></div>
              <div><span className="font-medium">nurse / nurse123</span> <span className="text-gray-400">(Nurse)</span></div>
              <div><span className="font-medium">pharmacist / pharma123</span> <span className="text-gray-400">(Pharmacy)</span></div>
              <div><span className="font-medium">labtech / lab123</span> <span className="text-gray-400">(Lab)</span></div>
              <div><span className="font-medium">radiologist / radio123</span> <span className="text-gray-400">(Radio)</span></div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;