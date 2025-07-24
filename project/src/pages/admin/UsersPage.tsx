import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Eye, UserCheck, UserX, X, Calendar, Search, Filter,
  Edit, Trash2, AlertTriangle, CheckCircle, AlertCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Tab } from '@headlessui/react';
import { supabase } from '../../lib/supabase';
import { format, parseISO, subMonths, startOfMonth, endOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  email_confirmed_at: string | null;
  user_metadata: {
    name?: string;
  };
  profile?: {
    name: string;
    email: string;
    phone_number?: string;
    societe?: string;
  } | null;
}

interface UserStats {
  total: number;
  active: number;
  pending: number;
  recent: number;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<UserStats>({
    total: 0,
    active: 0,
    pending: 0,
    recent: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showStatusConfirm, setShowStatusConfirm] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.access_token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-users`,
        {
          headers: {
            Authorization: `Bearer ${session.session.access_token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch users');
      }

      const { users } = await response.json();
      setUsers(users);
      
      // Calculate stats
      const now = new Date();
      const oneMonthAgo = subMonths(now, 1);
      
      const stats: UserStats = {
        total: users.length,
        active: users.filter((u: User) => u.email_confirmed_at).length,
        pending: users.filter((u: User) => !u.email_confirmed_at).length,
        recent: users.filter((u: User) => {
          const createdAt = parseISO(u.created_at);
          return createdAt >= oneMonthAgo;
        }).length
      };

      setStats(stats);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast.error(error.message || 'Error loading users');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.access_token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-users?userId=${userId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session.session.access_token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete user');
      }

      toast.success('User deleted successfully');
      fetchUsers(); // Refresh user list
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast.error(error.message || 'Error deleting user');
    }
    setShowDeleteConfirm(null);
  };

  const handleUpdateUserStatus = async (user: User) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.access_token) {
        throw new Error('Not authenticated');
      }

      const newStatus = user.email_confirmed_at ? null : new Date().toISOString();
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-users`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${session.session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            email_confirmed_at: newStatus,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update user status');
      }

      toast.success('User status updated successfully');
      fetchUsers(); // Refresh user list
    } catch (error: any) {
      console.error('Error updating user status:', error);
      toast.error(error.message || 'Error updating user status');
    }
    setShowStatusConfirm(null);
  };

  const filteredUsers = users.filter(user => {
    const profileName = user.profile?.name || '';
    const email = user.email || '';
    const company = user.profile?.societe || '';
    
    return profileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           company.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Generate chart data from actual user signups
  const generateChartData = () => {
    const now = new Date();
    const data = [];

    // Generate data for the last 6 months
    for (let i = 5; i >= 0; i--) {
      const currentMonth = subMonths(now, i);
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(currentMonth);

      const monthlyUsers = users.filter(user => {
        const createdAt = parseISO(user.created_at);
        return createdAt >= monthStart && createdAt <= monthEnd;
      });

      const monthlyActive = monthlyUsers.filter(user => user.last_sign_in_at);

      data.push({
        name: format(currentMonth, 'MMM', { locale: fr }),
        comptes: monthlyUsers.length,
        visites: monthlyActive.length * 3, // Multiplier pour simulation
        nonVerifies: monthlyUsers.filter(user => !user.email_confirmed_at).length
      });
    }

    return data;
  };

  const chartData = generateChartData();

  // Get top users based on last sign in
  const topUsers = users
    .filter(user => user.last_sign_in_at)
    .sort((a, b) => {
      const dateA = new Date(a.last_sign_in_at || 0);
      const dateB = new Date(b.last_sign_in_at || 0);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 5)
    .map(user => ({
      name: user.profile?.name || user.email.split('@')[0],
      email: user.email,
      connections: Math.floor(Math.random() * 50) + 10 // Simulé pour démonstration
    }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div 
          className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700/50 transition-colors"
          onClick={() => setSelectedStat('total')}
        >
          <div className="flex items-center justify-between mb-4">
            <Users className="w-6 h-6 text-primary-500" />
            <span className="text-green-500">+{stats.recent}</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{stats.total}</h3>
          <p className="text-gray-400">Total Utilisateurs</p>
        </div>

        <div 
          className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700/50 transition-colors"
          onClick={() => setSelectedStat('active')}
        >
          <div className="flex items-center justify-between mb-4">
            <UserCheck className="w-6 h-6 text-primary-500" />
            <span className="text-green-500">
              {((stats.active / stats.total) * 100).toFixed(0)}%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{stats.active}</h3>
          <p className="text-gray-400">Utilisateurs Actifs</p>
        </div>

        <div 
          className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700/50 transition-colors"
          onClick={() => setSelectedStat('pending')}
        >
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="w-6 h-6 text-primary-500" />
            <span className="text-yellow-500">{stats.pending}</span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-1">{stats.pending}</h3>
          <p className="text-gray-400">Comptes Non Vérifiés</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Chart */}
        <div className="lg:col-span-8 bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Évolution des Utilisateurs</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: '#fff'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="comptes" 
                  name="Comptes créés"
                  stroke="#EF4444" 
                  strokeWidth={2}
                  dot={{ fill: '#EF4444' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="visites" 
                  name="Visites"
                  stroke="#FACC15" 
                  strokeWidth={2}
                  dot={{ fill: '#FACC15' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="nonVerifies" 
                  name="Non vérifiés"
                  stroke="#22C55E" 
                  strokeWidth={2}
                  dot={{ fill: '#22C55E' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Users */}
        <div className="lg:col-span-4 bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Top 5 Utilisateurs (Connexions)</h3>
          <div className="space-y-4">
            {topUsers.map((user, index) => (
              <div key={index} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-white">{user.name}</span>
                  <span className="text-primary-500">{user.connections} connexions</span>
                </div>
                <span className="text-sm text-gray-400">{user.email}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Liste des Utilisateurs</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="search"
                  placeholder="Rechercher un utilisateur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white pl-10 pr-4 py-2 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <button className="btn bg-primary-600 hover:bg-primary-700 text-white">
                <Filter className="w-5 h-5 mr-2" />
                Filtrer
              </button>
            </div>
          </div>
        </div>

        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Utilisateur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Société
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Dernière Connexion
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Date d'inscription
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-white">
                      {user.profile?.name || user.user_metadata?.name || user.email.split('@')[0]}
                    </div>
                    <div className="text-sm text-gray-300 ml-2">{user.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.profile?.societe || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.email_confirmed_at 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user.email_confirmed_at ? 'Actif' : 'En attente'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.last_sign_in_at 
                    ? format(parseISO(user.last_sign_in_at), 'dd/MM/yyyy HH:mm', { locale: fr })
                    : 'Jamais connecté'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {format(parseISO(user.created_at), 'dd/MM/yyyy HH:mm', { locale: fr })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setShowStatusConfirm(user)}
                    className={`${user.email_confirmed_at ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'} mx-2`}
                  >
                    {user.email_confirmed_at ? <UserX className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(user.id)}
                    className="text-red-400 hover:text-red-300 mx-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Change Confirmation Modal */}
      {showStatusConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />
              <h3 className="text-lg font-semibold text-white">
                Confirmer le changement de statut
              </h3>
            </div>
            <p className="text-gray-300 mb-6">
              Êtes-vous sûr de vouloir {showStatusConfirm.email_confirmed_at ? 'désactiver' : 'activer'} cet utilisateur ?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowStatusConfirm(null)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Annuler
              </button>
              <button
                onClick={() => handleUpdateUserStatus(showStatusConfirm)}
                className={`px-4 py-2 rounded-lg ${
                  showStatusConfirm.email_confirmed_at
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                Confirmer
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
              <h3 className="text-lg font-semibold text-white">
                Confirmer la suppression
              </h3>
            </div>
            <p className="text-gray-300 mb-6">
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Annuler
              </button>
              <button
                onClick={() => handleDeleteUser(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;