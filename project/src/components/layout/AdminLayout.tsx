import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { 
  BarChart3, Users, FileText, Activity, TrendingUp, Settings,
  Bell, Search, Menu, X, LogOut, ArrowLeft, Handshake, UserCog
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/admin/users', icon: Users, label: 'Utilisateurs' },
    { path: '/admin/admins', icon: UserCog, label: 'Administrateurs' },
    { path: '/admin/clients', icon: Handshake, label: 'Clients' },
    { path: '/admin/reports', icon: TrendingUp, label: 'Rapports' },
    { path: '/admin/settings', icon: Settings, label: 'Paramètres' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Fixed Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-800 transition-transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full px-3 py-4">
          <div className="flex items-center justify-between mb-6 px-2">
            <span className="text-xl font-semibold text-white">SHIPPING GL</span>
          </div>
          
          <ul className="space-y-2">
            <li>
              <Link to="/" className="flex items-center p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700">
                <ArrowLeft className="w-6 h-6" />
                <span className="ml-3">Retour au site</span>
              </Link>
            </li>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2 rounded-lg ${
                    location.pathname === item.path
                      ? 'text-white bg-primary-600'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  <span className="ml-3">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 ml-64">
        {/* Fixed Top bar */}
        <div className="fixed top-0 right-0 left-64 z-30 bg-gray-800 p-4 flex items-center justify-between">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="search"
                placeholder="Rechercher..."
                className="w-full bg-gray-700 border-gray-600 text-white pl-10 pr-4 py-2 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                4
              </span>
            </button>
            <Link to="/" className="text-gray-400 hover:text-white">
              <LogOut className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Page content with padding for fixed header */}
        <div className="pt-20 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;