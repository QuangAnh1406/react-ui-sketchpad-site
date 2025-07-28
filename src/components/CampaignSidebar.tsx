
import React from 'react';
import { LayoutGrid, Megaphone, Users, Filter } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const CampaignSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const menuItems = [
    // { icon: Badge, label: 'Báo cáo', active: false },
    { icon: Megaphone, label: 'Chiến dịch', active: location.pathname === '/', path: '/' },
    { icon: Users, label: 'Khách hàng', active: location.pathname === '/customers', path: '/customers' },
    { icon: Filter, label: 'Tiềm năng', active: location.pathname === '/prospects', path: '/prospects' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">


      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="mb-8">
          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-50 transition-colors">
            <LayoutGrid className="w-5 h-5" />
            <span className="text-sm font-medium">Báo Cáo</span>
          </button>
        </div>

        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Chiến dịch
          </p>
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => item.path !== '#' && navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${item.active
                  ? 'bg-orange-50 text-orange-600 border border-orange-200'
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Management Section */}
        <div className="mt-8">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Quản lý chung
          </p>
          <button 
            onClick={() => navigate('/users')}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
              location.pathname === '/users'
                ? 'bg-orange-50 text-orange-600 border border-orange-200'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">Người dùng</span>
          </button>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 text-xs font-medium">B</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Beyoncé</p>
            <p className="text-xs text-gray-500 truncate">beyonce@xiaomi.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignSidebar;
