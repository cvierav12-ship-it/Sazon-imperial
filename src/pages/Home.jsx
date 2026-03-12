import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import './Home.css';

// Imágenes de servicios (usando placeholders de alta calidad)
const services = [
  {
    id: 1,
    title: 'Buffet',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80',
    description: 'Disfruta de nuestra variedad de platos en nuestro buffet premium'
  },
  {
    id: 2,
    title: 'Catering',
    image: 'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=800&q=80',
    description: 'Servicio de catering para tus eventos especiales'
  },
  {
    id: 3,
    title: 'Eventos Especiales',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    description: 'Celebra tus momentos más importantes con nosotros'
  }
];

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleServiceClick = (service) => {
    if (user) {
      navigate('/reservaciones', { state: { service } });
    } else {
      navigate('/login', { state: { from: '/reservaciones', service } });
    }
  };

  return (
    <div className="home">
      <Header />

      <main className="home__main">
        {/* Hero Section */}
        <section className="home__hero">
          <div className="home__hero-overlay" />
          <div className="home__hero-content">
            <h1 className="home__title">Sazon Imperial</h1>
          </div>
        </section>

        {/* Services Section */}
        <section className="home__services">
          <h2 className="home__services-title">Nuestros Servicios</h2>
          <div className="home__services-grid">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                image={service.image}
                onClick={() => handleServiceClick(service)}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
