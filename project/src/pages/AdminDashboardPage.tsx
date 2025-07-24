import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Package, TrendingUp, Settings, Bell, Search, Menu, X, LogOut,
  BarChart3, FileText, Activity, ArrowLeft, Eye, CheckCircle, AlertCircle
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface StatsTableProps {
  data: any[];
  columns: { key: string; header: string }[];
}

const StatsTable: React.FC<StatsTableProps> = ({ data, columns }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead className="bg-gray-700">
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="p-4 text-gray-300">{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="p-4 text-gray-300">
                {row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AdminDashboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const location = useLocation();

  const stats = [
    { 
      title: 'Visites du Site', 
      value: '1,234', 
      icon: Eye, 
      change: '+14%',
      data: [
        { date: '2024-03-15', visitors: '156', pages: '423', duration: '3m 45s' },
        { date: '2024-03-14', visitors: '142', pages: '389', duration: '4m 12s' },
        { date: '2024-03-13', visitors: '168', pages: '456', duration: '3m 22s' }
      ],
      columns: [
        { key: 'date', header: 'Date' },
        { key: 'visitors', header: 'Visiteurs' },
        { key: 'pages', header: 'Pages vues' },
        { key: 'duration', header: 'Durée moyenne' }
      ]
    },
    { 
      title: 'Partenaires', 
      value: '45', 
      icon: Users, 
      change: '+28%',
      data: [
        { name: 'UNICEF', status: 'Actif', type: 'Organisation', date: '2024-01-15' },
        { name: 'MONUSCO', status: 'Actif', type: 'ONG', date: '2024-02-01' },
        { name: 'DHL', status: 'Actif', type: 'ONG', date: '2024-02-01' },
        { name: 'MSF B', status: 'Actif', type: 'ONG', date: '2024-02-01' },
        { name: 'MSF', status: 'Actif', type: 'ONG', date: '2024-02-01' },
        { name: 'DHL', status: 'Actif', type: 'Entreprise', date: '2024-02-15' }
      ],
      columns: [
        { key: 'name', header: 'Nom' },
        { key: 'status', header: 'Statut' },
        { key: 'type', header: 'Type' },
        { key: 'date', header: 'Date d\'adhésion' }
      ]
    },
    { 
      title: 'Demandes de Partenariat', 
      value: '12', 
      icon: AlertCircle, 
      change: 'En attente',
      data: [
        { company: 'Global Logistics', status: 'En attente', date: '2024-03-15', contact: 'John Doe' },
        { company: 'Fast Transit', status: 'En attente', date: '2024-03-14', contact: 'Jane Smith' },
        { company: 'Cargo Plus', status: 'En attente', date: '2024-03-13', contact: 'Mike Johnson' }
      ],
      columns: [
        { key: 'company', header: 'Entreprise' },
        { key: 'status', header: 'Statut' },
        { key: 'date', header: 'Date de demande' },
        { key: 'contact', header: 'Contact' }
      ]
    },
    { 
      title: 'Cotations', 
      value: '89', 
      icon: FileText, 
      change: '+35%',
      data: [
        { ref: 'COT001', client: 'UNICEF', service: 'Maritime', date: '2024-03-15' },
        { ref: 'COT002', client: 'MSF', service: 'Aérien', date: '2024-03-14' },
        { ref: 'COT003', client: 'WHO', service: 'Route', date: '2024-03-13' }
      ],
      columns: [
        { key: 'ref', header: 'Référence' },
        { key: 'client', header: 'Client' },
        { key: 'service', header: 'Service' },
        { key: 'date', header: 'Date' }
      ]
    }
  ];

  const menuItems = [
    { path: '/admin/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/admin/partners', icon: Users, label: 'Partenaires' },
    { path: '/admin/quotations', icon: FileText, label: 'Cotations' },
    { path: '/admin/tracking', icon: Activity, label: 'Suivi' },
    { path: '/admin/reports', icon: TrendingUp, label: 'Rapports' },
    { path: '/admin/settings', icon: Settings, label: 'Paramètres' }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
          <div className="flex items-center justify-between mb-6 px-2">
            <span className="text-xl font-semibold text-white">SHIPPING GL</span>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <ul className="space-y-2">
            <li>
              <Link to="/" className="flex items-center p-2 bg-white text-black hover:text-white rounded-lg hover:bg-gray-700">
                <ArrowLeft className="w-6 h-6" />
                  <span className="ml-3 ">
                    Retour au site
                  </span>
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
      <div className={`p-1 ${isSidebarOpen ? 'lg:ml-0' : ''}`}>
        {/* Top bar */}
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-lg p-4 border border-gray-700 cursor-pointer hover:bg-gray-700/50 transition-colors"
              onClick={() => setSelectedStat(selectedStat === stat.title ? null : stat.title)}
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-6 h-6 text-primary-500" />
                <span className={`text-sm ${
                  stat.change.startsWith('+') ? 'text-green-500' : 
                  stat.change.startsWith('-') ? 'text-red-500' : 
                  'text-yellow-500'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Detailed Stats Table */}
        {selectedStat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden mb-6"
          >
            <div className="p-4 border-b border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Détails - {selectedStat}</h2>
              <button 
                onClick={() => setSelectedStat(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <StatsTable 
              data={stats.find(s => s.title === selectedStat)?.data || []}
              columns={stats.find(s => s.title === selectedStat)?.columns || []}
            />
          </motion.div>
        )}

        {/* Recent Activity */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Activité Récente</h2>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span>Nouvelle demande de partenariat de Global Logistics</span>
                <span className="ml-auto text-sm text-gray-500">Il y a 5 min</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FileText className="w-5 h-5 text-blue-500 mr-3" />
                <span>Cotation #COT123 générée pour UNICEF</span>
                <span className="ml-auto text-sm text-gray-500">Il y a 15 min</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Users className="w-5 h-5 text-yellow-500 mr-3" />
                <span>Mise à jour du profil partenaire MSF</span>
                <span className="ml-auto text-sm text-gray-500">Il y a 1 heure</span>
              </div>
              <div className="flex items-center text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                <span>Nouvelle demande de partenariat de Global Logistics</span>
                <span className="ml-auto text-sm text-gray-500">Il y a 5 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;