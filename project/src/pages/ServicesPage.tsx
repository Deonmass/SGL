import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Plane, Ship, Truck, Warehouse, Home, FileCheck } from 'lucide-react';

// Service detail component
const ServiceDetail: React.FC<{
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  icon: React.ReactNode;
  reversed?: boolean;
}> = ({ id, title, description, features, image, icon, reversed = false }) => {
  return (
    <section id={id} className="py-16 border-b border-gray-200 last:border-b-0">
      <div className="container-custom">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${reversed ? 'lg:flex-row-reverse' : ''}`}>
          <div className={`${reversed ? 'lg:order-2' : ''}`}>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mr-4">
                {icon}
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            </div>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {description}
            </p>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-1 mr-3 mt-1">
                    <svg className="w-4 h-4 text-primary-600" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`${reversed ? 'lg:order-1' : ''}`}>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src={image} alt={title} className="w-full h-100px" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesPage: React.FC = () => {
  const { t } = useTranslation();

  // Update document title
  useEffect(() => {
    document.title = t('services.title') + ' - SHIPPING GL';
  }, [t]);

  const services = [
    {
      id: 'air-freight',
      title: t('services.airFreight.title'),
      description: t('services.airFreight.description'),
      features: t('services.airFreight.features', { returnObjects: true }) as string[],
      image: 'https://i.pinimg.com/736x/3f/77/94/3f77942a87c5085122142685f37fca50.jpg',
      icon: <Plane className="w-6 h-6" />,
      reversed: false
    },
    {
      id: 'sea-freight',
      title: t('services.seaFreight.title'),
      description: t('services.seaFreight.description'),
      features: t('services.seaFreight.features', { returnObjects: true }) as string[],
      image: 'https://i.pinimg.com/736x/59/13/22/591322c0eac4312aa1952fc8a43b9ba4.jpg',
      icon: <Ship className="w-6 h-6" />,
      reversed: true
    },
    {
      id: 'transport',
      title: t('services.transport.title'),
      description: t('services.transport.description'),
      features: t('services.transport.features', { returnObjects: true }) as string[],
      image: 'https://i.pinimg.com/736x/04/f2/06/04f2060884851ba04fc836548f574d4d.jpg',
      icon: <Truck className="w-6 h-6" />,
      reversed: false
    },
    {
      id: 'warehousing',
      title: t('services.warehousing.title'),
      description: t('services.warehousing.description'),
      features: t('services.warehousing.features', { returnObjects: true }) as string[],
      image: 'https://i.pinimg.com/736x/3f/fa/39/3ffa39695c5645fce2cedd05693a791d.jpg',
      icon: <Warehouse className="w-6 h-6" />,
      reversed: true
    },
    {
      id: 'moving',
      title: t('services.moving.title'),
      description: t('services.moving.description'),
      features: t('services.moving.features', { returnObjects: true }) as string[],
      image: 'https://i.pinimg.com/736x/eb/e7/b6/ebe7b60acb7a8489ea5ac5a71fd4c901.jpg',
      icon: <Home className="w-6 h-6" />,
      reversed: false
    },
    {
      id: 'customs',
      title: t('services.customs.title'),
      description: t('services.customs.description'),
      features: t('services.customs.features', { returnObjects: true }) as string[],
      image: 'https://imgv2-1-f.scribdassets.com/img/document/692641992/original/3457560b4e/1?v=1',
      icon: <FileCheck className="w-6 h-6" />,
      reversed: true
    }
  ];

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
            backgroundImage: 'url(https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
            backgroundPosition: '50% 30%'
          }}
        >
          <div className="absolute inset-0 bg-primary-900 opacity-100"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">{t('services.title')}</h1>
            <p className="text-xl text-gray-200">
              {t('services.subtitle')}
            </p>
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
      
      <div className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <a 
                key={index} 
                href={`#${service.id}`} 
                className="flex items-center p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-200"
              >
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mr-4">
                  {service.icon}
                </div>
                <h3 className="font-medium text-gray-900">{service.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {services.map((service, index) => (
        <ServiceDetail
          key={index}
          id={service.id}
          title={service.title}
          description={service.description}
          features={service.features}
          image={service.image}
          icon={service.icon}
          reversed={service.reversed}
        />
      ))}
    </motion.div>
  );
};

export default ServicesPage;