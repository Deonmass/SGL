import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit, Trash2, CheckCircle, X, AlertCircle } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  type: string;
  status: string;
  contact: string;
  email: string;
  phone: string;
  joinDate: string;
}

const PartnersPage: React.FC = () => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const partners: Partner[] = [
    {
      id: '1',
      name: 'UNICEF',
      type: 'Organisation Internationale',
      status: 'Actif',
      contact: 'John Doe',
      email: 'contact@unicef.org',
      phone: '+1 212-326-7000',
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'MSF',
      type: 'ONG',
      status: 'Actif',
      contact: 'Jane Smith',
      email: 'contact@msf.org',
      phone: '+33 1 40 21 29 29',
      joinDate: '2024-02-01'
    },
    {
      id: '2',
      name: 'MSF',
      type: 'ONG',
      status: 'Actif',
      contact: 'Jane Smith',
      email: 'contact@msf.org',
      phone: '+33 1 40 21 29 29',
      joinDate: '2024-02-01'
    },
    {
      id: '2',
      name: 'MSF',
      type: 'ONG',
      status: 'Actif',
      contact: 'Jane Smith',
      email: 'contact@msf.org',
      phone: '+33 1 40 21 29 29',
      joinDate: '2024-02-01'
    }
  ];

  const handleView = (partner: Partner) => {
    setSelectedPartner(partner);
  };

  const handleEdit = (partner: Partner) => {
    // Implement edit functionality
    console.log('Edit partner:', partner);
  };

  const handleDelete = (partner: Partner) => {
    // Implement delete functionality
    console.log('Delete partner:', partner);
  };

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-4">Gestion des Partenaires</h1>
        <div className="flex justify-between items-center">
          <button className="btn btn-primary">
            Ajouter un partenaire
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Partenaire
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Type
              </th>
              
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Date d'adhésion
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredPartners.map((partner) => (
              <tr key={partner.id} className="hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded ${
                    partner.status === 'Actif' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {partner.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{partner.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{partner.type}</div>
                </td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {partner.joinDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleView(partner)}
                    className="text-blue-400 hover:text-blue-300 mx-2"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleEdit(partner)}
                    className="text-yellow-400 hover:text-yellow-300 mx-2"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(partner)}
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

      {/* Partner Details Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Détails du Partenaire</h2>
              <button
                onClick={() => setSelectedPartner(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Nom
                </label>
                <p className="text-white">{selectedPartner.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Type
                </label>
                <p className="text-white">{selectedPartner.type}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Contact
                </label>
                <p className="text-white">{selectedPartner.contact}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Email
                </label>
                <p className="text-white">{selectedPartner.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Téléphone
                </label>
                <p className="text-white">{selectedPartner.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Date d'adhésion
                </label>
                <p className="text-white">{selectedPartner.joinDate}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => handleEdit(selectedPartner)}
                className="btn btn-primary"
              >
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </button>
              <button
                onClick={() => setSelectedPartner(null)}
                className="btn btn-outline"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PartnersPage;