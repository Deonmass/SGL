import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Search, Filter, Calendar } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  type: string;
  period: string;
  date: string;
  status: string;
  size: string;
}

const ReportsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const reports: Report[] = [
    {
      id: '1',
      title: 'Rapport d\'Activité Mensuel',
      type: 'Activité',
      period: 'Mars 2024',
      date: '2024-03-31',
      status: 'Disponible',
      size: '2.5 MB'
    },
    {
      id: '2',
      title: 'Rapport Financier Q1',
      type: 'Finance',
      period: 'Q1 2024',
      date: '2024-03-31',
      status: 'En cours',
      size: '-'
    },
    {
      id: '3',
      title: 'Analyse des Partenariats',
      type: 'Partenariat',
      period: 'Q1 2024',
      date: '2024-03-30',
      status: 'Disponible',
      size: '1.8 MB'
    }
  ];

  const handleDownload = (report: Report) => {
    // Implement download functionality
    console.log('Download report:', report);
  };

  const filteredReports = reports.filter(report =>
    (report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedPeriod === 'all' || report.period.includes(selectedPeriod))
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-4">Rapports</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full bg-gray-800 border-gray-700 text-white pl-10 pr-4 py-2 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="bg-gray-800 border-gray-700 text-white px-4 py-2 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="all">Toutes les périodes</option>
              <option value="2024">2024</option>
              <option value="Q1">Q1 2024</option>
              <option value="Mars">Mars 2024</option>
            </select>
            <button className="btn btn-primary">
              <Calendar className="w-5 h-5 mr-2" />
              Générer un rapport
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Titre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Période
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Taille
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredReports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-700/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-primary-500 mr-2" />
                    <div className="text-sm font-medium text-white">{report.title}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{report.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{report.period}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{report.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    report.status === 'Disponible' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{report.size}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {report.status === 'Disponible' && (
                    <button
                      onClick={() => handleDownload(report)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;