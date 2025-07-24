import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, FileText } from 'lucide-react';

// Generate 20 items per category
const generateGalleryItems = (category: string, baseItems: any[]) => {
  const items = [];
  for (let i = 0; i < 20; i++) {
    const baseItem = baseItems[i % baseItems.length];
    items.push({
      ...baseItem,
      id: `${category}-${i + 1}`,
      title: `${baseItem.title} ${i + 1}`,
      category
    });
  }
  return items;
};

const baseOperations = [
  {
    image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg',
    title: 'Transport de Conteneurs',
    date: '15 Mars 2024',
    location: 'Port de Matadi, RDC',
    description: 'Chargement et transport de conteneurs pour export vers l\'Europe via le port de Matadi. Cette opération majeure implique la coordination de plusieurs équipes et la gestion précise des délais.',
    details: 'Opération de chargement de 50 conteneurs de 40 pieds contenant des minerais. Cette opération s\'inscrit dans le cadre d\'un contrat d\'export vers Rotterdam. Notre équipe a assuré la supervision complète, de la réception des marchandises jusqu\'à leur chargement sur le navire.'
  },
  {
    image: 'https://images.pexels.com/photos/1427541/pexels-photo-1427541.jpeg',
    title: 'Livraison Humanitaire',
    date: '22 Mars 2024',
    location: 'Goma, RDC',
    description: 'Distribution de fournitures médicales essentielles dans la région de Goma. Une opération délicate nécessitant une planification minutieuse et une coordination étroite avec les autorités locales.',
    details: 'Coordination de la livraison de 15 tonnes de fournitures médicales pour le compte de MSF. L\'opération a nécessité une logistique spéciale due à la nature sensible des produits et aux conditions de transport spécifiques.'
  }
];

const baseEvents = [
  {
    image: 'https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg',
    title: 'Inauguration Terminal',
    date: '1 Avril 2024',
    location: 'Dar es Salaam, Tanzanie',
    description: 'Inauguration de notre nouveau terminal logistique à Dar es Salaam. Un investissement majeur qui renforce notre présence en Afrique de l\'Est et améliore nos capacités de traitement.',
    details: 'Le nouveau terminal, d\'une superficie de 15 000 m², est équipé des dernières technologies en matière de gestion logistique. Il permettra d\'augmenter notre capacité de traitement de 40% dans la région.'
  }
];

const baseConferences = [
  {
    image: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg',
    title: 'Conférence Logistique',
    date: '15 Avril 2024',
    location: 'Kinshasa, RDC',
    description: 'Organisation de la première conférence sur l\'innovation logistique en Afrique centrale. Un événement majeur réunissant les acteurs clés du secteur.',
    details: 'La conférence a rassemblé plus de 200 participants venus de 15 pays différents. Les discussions ont porté sur l\'avenir de la logistique en Afrique et les opportunités offertes par les nouvelles technologies.'
  }
];

const baseWorkshops = [
  {
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
    title: 'Formation Douane',
    date: '20 Avril 2024',
    location: 'Lubumbashi, RDC',
    description: 'Session de formation sur les nouvelles réglementations douanières pour nos partenaires. Une initiative visant à renforcer les compétences de nos collaborateurs.',
    details: 'La formation a couvert les dernières mises à jour des procédures douanières et leur impact sur les opérations quotidiennes. Les participants ont pu bénéficier de cas pratiques et de retours d\'expérience.'
  }
];

// Generate 20 items for each category
const galleryItems = [
  ...generateGalleryItems('operations', baseOperations),
  ...generateGalleryItems('events', baseEvents),
  ...generateGalleryItems('conferences', baseConferences),
  ...generateGalleryItems('workshops', baseWorkshops)
];

const categories = [
  { id: 'all', label: 'Tout' },
  { id: 'operations', label: 'Opérations' },
  { id: 'events', label: 'Événements' },
  { id: 'conferences', label: 'Conférences' },
  { id: 'workshops', label: 'Ateliers' }
];

const GalleryPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 12;

  useEffect(() => {
    document.title = 'Galerie - SHIPPING GL';
  }, []);

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setPage(prev => prev + 1);
      setLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url(https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg)',
            backgroundPosition: '50% 30%'
          }}
        >
          <div className="absolute inset-0 bg-primary-900 opacity-75"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Notre Galerie</h1>
            <div className="text-xl text-gray-200 space-y-4">
              <p>
                Découvrez nos opérations logistiques en images à travers notre galerie interactive.
              </p>
              <p>
                De nos activités quotidiennes aux événements majeurs, explorez notre engagement
                dans le développement logistique en Afrique.
              </p>
              <p>
                Chaque image raconte une histoire unique de notre contribution à l'amélioration
                des services logistiques et du commerce international.
              </p>
              <p>
                Naviguez à travers nos différentes catégories pour découvrir l'étendue de nos activités
                et notre impact sur le terrain.
              </p>
            </div>
          </motion.div>
        </div>

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
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category Title */}
          {selectedCategory !== 'all' && (
            <div className="mb-8 bg-primary-600 text-white py-4 px-6 rounded-lg">
              <h2 className="text-2xl font-bold">
                {categories.find(c => c.id === selectedCategory)?.label}
              </h2>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.slice(0, page * itemsPerPage).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <div className="aspect-w-4 aspect-h-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/50 to-transparent">
                    <div className="absolute bottom-0 p-4 text-white">
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm opacity-90 line-clamp-2">{item.description}</p>
                      <div className="flex items-center mt-2 text-sm opacity-75">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{item.date}</span>
                        <MapPin className="w-4 h-4 ml-3 mr-1" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredItems.length > page * itemsPerPage && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'Chargement...' : 'Charger plus'}
              </button>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl overflow-hidden max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedItem.title}
                  </h2>
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {categories.find(c => c.id === selectedItem.category)?.label}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{selectedItem.date}</span>
                  <MapPin className="w-5 h-5 ml-4 mr-2" />
                  <span>{selectedItem.location}</span>
                </div>
                <p className="text-gray-700 mb-4">{selectedItem.description}</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Détails de l'opération</h3>
                  <p className="text-gray-700">{selectedItem.details}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GalleryPage;