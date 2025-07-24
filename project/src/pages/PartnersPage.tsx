import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Partner categories and data
const partnerCategories = [
  {
    title: "Organisations Internationales",
    partners: [
      {
        name: 'UNICEF',
        logo: 'https://www.1min30.com/wp-content/uploads/2018/03/Couleur-logo-UNICEF.jpg',
        description: 'Notre collaboration avec l\'UNICEF permet d\'assurer la livraison rapide et sécurisée de fournitures essentielles pour les enfants dans les zones les plus reculées.',
        address: 'UNICEF House, 3 United Nations Plaza, New York, NY 10017, USA',
        contact: '+1 212-326-7000',
        hasContract: true
      },
      {
        name: 'PNUD',
        logo: 'https://tunisia.un.org/sites/default/files/styles/large/public/2022-11/UNDP%20Logo_0.jpg?h=2a479378&itok=dc4F90xS',
        description: 'En collaboration avec le PNUD, nous contribuons au développement durable à travers des solutions logistiques innovantes.',
        address: 'One United Nations Plaza, New York, NY 10017, USA',
        contact: '+1 212-906-5000',
        hasContract: true
      },
      {
        name: 'UNFPA',
        logo: 'https://www.matininfos.net/wp-content/uploads/2019/04/Logo-UNFPA-660x330.jpg',
        description: 'Partenariat pour la distribution de fournitures médicales et de santé reproductive.',
        address: '605 Third Avenue, New York, NY 10158, USA',
        contact: '+1 212-297-5000',
        hasContract: true
      },
      {
        name: 'MONUSCO',
        logo: 'https://storage.googleapis.com/images.businesspagescongo.com/44e7e4e3-fed2-4033-9d99-d3f58c521ddd.png',
        description: 'Partenariat pour les opérations de maintien de la paix en RDC.',
        address: '1 UN Plaza, New York, NY 10017, USA',
        contact: '+1 212-963-1234',
        hasContract: true
      }
    ]
  },
  {
    title: "Organisations Humanitaires",
    partners: [
      {
        name: 'MSF FRANCE',
        logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/69/MSF.svg/1200px-MSF.svg.png',
        description: 'Partenariat pour l\'acheminement de l\'aide médicale d\'urgence.',
        address: '8 rue Saint-Sabin, 75011 Paris, France',
        contact: '+33 1 40 21 29 29',
        hasContract: true
      },
      {
        name: 'MSF BELGIQUE',
        logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/6/69/MSF.svg/1200px-MSF.svg.png',
        description: 'Collaboration pour l\'aide médicale humanitaire.',
        address: 'Rue de l\'Arbre Bénit 46, 1050 Bruxelles, Belgique',
        contact: '+32 2 474 74 74',
        hasContract: true
      },
      {
        name: 'MERCY CORPS',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/MC_New_Logo_Horizontal_PMS_186_PC_10-15.jpg',
        description: 'Partenariat pour l\'aide humanitaire et le développement.',
        address: '45 SW Ankeny Street, Portland, OR 97204, USA',
        contact: '+1 503-896-5000',
        hasContract: true
      },
      {
        name: 'SAVE THE CHILDREN',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLCRJ_oWuTI6nQjYY2o0ikDDUVgNjd5iTWxaWzMSXBpqGm8yVwvRgLhDjDtWwP2sopxsw&usqp=CAU',
        description: 'Collaboration pour l\'aide aux enfants vulnérables.',
        address: '501 Kings Highway East, Suite 400, Fairfield, CT 06825, USA',
        contact: '+1 800-728-3843',
        hasContract: true
      }
    ]
  },
  {
    title: "Agences de Développement",
    partners: [
      {
        name: 'USAID',
        logo: 'https://agsci.oregonstate.edu/sites/agscid7/files/media/usaid-logo-png.png',
        description: 'Partenariat pour le développement international.',
        address: '1300 Pennsylvania Avenue NW, Washington, DC 20004, USA',
        contact: '+1 202-712-0000',
        hasContract: true
      },
      {
        name: 'CORDAID',
        logo: 'https://landportal.org/sites/default/files/2023-05/Cordaid1.png',
        description: 'Collaboration pour le développement et l\'aide humanitaire.',
        address: 'Lutherse Burgwal 10, 2512 CB Den Haag, Netherlands',
        contact: '+31 70 313 6300',
        hasContract: true
      },
      {
        name: 'ENABEL',
        logo: 'https://logovectorseek.com/wp-content/uploads/2020/09/enabel-belgian-development-agency-logo-vector.png',
        description: 'Agence belge de développement.',
        address: 'Rue Haute 147, 1000 Brussels, Belgium',
        contact: '+32 2 505 37 00',
        hasContract: true
      }
    ]
  },
  {
    title: "Transport et Logistique",
    partners: [
      {
        name: 'CMA CGM',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/CMA_CGM_logo.svg/1280px-CMA_CGM_logo.svg.png',
        description: 'Leader mondial du transport maritime.',
        address: '4, quai d\'Arenc, 13002 Marseille, France',
        contact: '+33 4 88 91 90 00',
        hasContract: true
      },
      {
        name: 'MAERSK',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Maersk_Group_Logo.svg/2560px-Maersk_Group_Logo.svg.png',
        description: 'Solutions de transport maritime intégrées.',
        address: 'Esplanaden 50, 1098 Copenhagen K, Denmark',
        contact: '+45 33 63 33 63',
        hasContract: true
      },
      {
        name: 'GEODIS',
        logo: 'https://mma.prnewswire.com/media/1490663/GEODIS_Logo.jpg?p=facebook',
        description: 'Solutions logistiques globales.',
        address: '26 Quai Charles Pasqua, 92300 Levallois-Perret, France',
        contact: '+33 1 56 76 27 00',
        hasContract: true
      }
    ]
  },
  {
    title: "Organisations de Santé",
    partners: [
      {
        name: 'IMA WORLD HEALTH',
        logo: 'https://imaworldhealth.org/sites/default/files/styles/image_bl/public/image-item/2020-05/imavert.png?h=82ae7057&itok=jFhKn6wx',
        description: 'Partenariat pour la santé mondiale.',
        address: '7 East Baltimore Street, Baltimore, MD 21202, USA',
        contact: '+1 410-635-8720',
        hasContract: true
      },
      {
        name: 'MEBS GLOBAL',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzG2y0bpO31Cmuev-CMewtb-aVTMRQTFol_Q&shttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzG2y0bpO31Cmuev-CMewtb-aVTMRQTFol_Q&s',
        description: 'Services médicaux d\'urgence.',
        address: 'Dubai Healthcare City, UAE',
        contact: '+971 4 362 9999',
        hasContract: true
      }
    ]
  },
  {
    title: "Autres Partenaires",
    partners: [
      {
        name: 'LIQUID TELECOM',
        logo: 'https://liquid.tech/wp-content/uploads/2022/12/logo_LIQUID.png',
        description: 'Solutions de connectivité pour la logistique.',
        address: '6 New Street Square, London EC4A 3BF, UK',
        contact: '+44 20 7101 6100',
        hasContract: true
      },
      {
        name: 'TRACTAFRIC',
        logo: 'https://www.irium-software.fr/hs-fs/hubfs/Temoignages-clients/Tractafric-Optorg/logo.png?width=500&height=137&name=logo.png',
        description: 'Solutions de transport et équipements.',
        address: 'Zone Industrielle de Mohammedia, Morocco',
        contact: '+212 5 23 32 88 00',
        hasContract: true
      },
      {
        name: 'VILLAGE REACH',
        logo: 'https://www.tala-com.com/medias/pictures/picture-38054-1650908121.png',
        description: 'Innovation dans la chaîne d\'approvisionnement de la santé.',
        address: '2900 Eastlake Ave E, Seattle, WA 98102, USA',
        contact: '+1 206-512-1530',
        hasContract: true
      }
    ]
  },
  {
    title: "Partenaires Physiques",
    partners: [
      {
        name: 'Jean Mukendi',
        logo: '/img/partners/mukendi.jpg',
        description: 'Expert en logistique avec plus de 15 ans d\'expérience dans le transport international.',
        address: 'Kinshasa, RDC',
        contact: '+243 123 456 789',
        hasContract: true
      },
      {
        name: 'Marie ',
        logo: '/img/partners/diallo.jpg',
        description: 'Spécialiste en dédouanement et conformité réglementaire.',
        address: 'Dakar, Sénégal',
        contact: '+221 77 123 45 67',
        hasContract: true
      },
      {
        name: 'David Nkosi',
        logo: '/img/partners/nkosi.jpg',
        description: 'Consultant en transport maritime et logistique portuaire.',
        address: 'Durban, Afrique du Sud',
        contact: '+27 82 123 4567',
        hasContract: true
      }
    ]
  }
];

const PartnersPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Nos Partenaires - SHIPPING GL';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="relative bg-primary-900 text-white py-20 md:py-24 overflow-hidden">
        {/* Background image with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
            backgroundPosition: '50% 30%'
          }}
        >
          <div className="absolute inset-0 bg-primary-900 opacity-75"></div>
        </div>

        {/* Content */}
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Partenaires Fidèles</h1>
            <p className="text-xl text-gray-300 mb-8">
              Nous sommes fiers de collaborer avec ces organisations prestigieuses qui nous font confiance
              pour leurs besoins logistiques.
            </p>
            
          </motion.div>
        </div>

        {/* Decorative Shape */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path 
              fill="#f9fafb" 
              fillOpacity="1" 
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          {partnerCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16 last:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-2 border-b-2 border-primary-200">
                {category.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.partners.map((partner, partnerIndex) => (
                  <motion.div
                    key={partnerIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: partnerIndex * 0.1 }}
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden relative transform transition-all duration-300 hover:z-10"
                  >
                    {partner.hasContract && (
                      <div className="absolute bottom-4 right-4 group">
                        <CheckCircle className="w-6 h-6 text-primary-600" />
                        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="bg-primary-600 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                            Avec un contrat
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="h-20 flex items-center justify-center mb-6">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{partner.name}</h3>
                      <p className="text-gray-600 mb-4">{partner.description}</p>
                      <div className="text-sm text-gray-500">
                        <p className="mb-2"><strong>Siège:</strong> {partner.address}</p>
                        <p><strong>Contact:</strong> {partner.contact}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default PartnersPage;