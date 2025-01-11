import React, { useState, useEffect } from 'react';
import { FaCalendar, FaUsers, FaLaptopCode, FaBars, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const posgrados = [
  { id: 1, nombre: 'Maestría en Educacion', descripcion: 'Aprende las últimas técnicas de la educacion moderna' },
  { id: 2, nombre: 'Maestría en Educacion Ciudadana', descripcion: 'Investiga y desarrolla nuevas tecnologías.' },
  { id: 3, nombre: 'Doctorado en Ciencias de la Educacion', descripcion: 'Aprende todo lo necesario para ser un doctor en ciencias de la educacion' }
];

const desarrolladores = [
  { id: 1, nombre: 'Yamilka Sosa Oliva', rol: 'Coordinadora del Programa Doctoral', imagen: 'Yamilka.jpg' },
  { id: 2, nombre: 'Hilda Elena Manchón', rol: 'Coordinadora del Programa Maestria en Educación', imagen: 'Hilda.jpg' },
  { id: 3, nombre: 'Claudio Rafael Izaguirre Remón', rol: 'Coordinadora del Programa Maestria en Educación Ciudadana', imagen: 'Claudio.jpg' },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? -45 : 45,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.8,
      transition: {
        duration: 0.8,
      },
    }),
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + newDirection;
      if (newIndex < 0) return posgrados.length - 1;
      if (newIndex >= posgrados.length) return 0;
      return newIndex;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Header con Navegación */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-6 fixed w-full z-10 backdrop-filter backdrop-blur-lg bg-opacity-30">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Gestión de Eventos de Posgrado</h1>
          <div className="hidden md:flex space-x-4 items-center">
            <nav>
              <ul className="flex space-x-4">
                <li><a href="#inicio" className="hover:text-purple-200 transition duration-300">Inicio</a></li>
                <li><a href="#posgrados" className="hover:text-purple-200 transition duration-300">Posgrados</a></li>
                <li><a href="#caracteristicas" className="hover:text-purple-200 transition duration-300">Características</a></li>
                <li><a href="#equipo" className="hover:text-purple-200 transition duration-300">Equipo</a></li>
              </ul>
            </nav>
            <button
              className="bg-white text-purple-600 px-4 py-2 rounded-full hover:bg-purple-100 transition duration-300 transform hover:scale-105"
              onClick={() => navigate('/login')}
            >
              Iniciar Sesión
            </button>
          </div>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-purple-500 mt-2">
            <nav className="px-2 pt-2 pb-4">
              <ul className="space-y-2">
                <li><a href="#inicio" className="block px-3 py-2 rounded-md hover:bg-purple-600 transition duration-300">Inicio</a></li>
                <li><a href="#posgrados" className="block px-3 py-2 rounded-md hover:bg-purple-600 transition duration-300">Posgrados</a></li>
                <li><a href="#caracteristicas" className="block px-3 py-2 rounded-md hover:bg-purple-600 transition duration-300">Características</a></li>
                <li><a href="#equipo" className="block px-3 py-2 rounded-md hover:bg-purple-600 transition duration-300">Equipo</a></li>
              </ul>
              <button
                className="mt-3 w-full bg-white text-purple-600 px-4 py-2 rounded-full hover:bg-purple-100 transition duration-300 transform hover:scale-105"
                onClick={() => navigate('/login')}
              >
                Iniciar Sesión
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white pt-40 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 animate-fade-in-down">
            Organiza tus eventos de posgrado con facilidad
          </h2>
          <p className="text-xl mb-8 animate-fade-in-up">Simplifica la gestión de eventos académicos y mejora la experiencia de tus estudiantes</p>
          <button
            className="bg-white text-purple-500 font-bold py-2 px-6 rounded-full hover:bg-purple-100 transition duration-300 transform hover:scale-105"
            onClick={() => navigate('/login')}
          >
            Comienza ahora
          </button>
        </motion.div>
      </section>

      {/* Posgrados Section with 3D Carousel */}
      <section id="posgrados" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Nuestros Posgrados
          </h2>
          <div className="relative w-full max-w-3xl mx-auto h-[400px] perspective-1000">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full h-full"
              >
                <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col justify-center items-center transform-style-3d">
                  <h3 className="text-2xl font-semibold mb-4 text-purple-600">{posgrados[currentIndex].nombre}</h3>
                  <p className="text-gray-600 text-center">{posgrados[currentIndex].descripcion}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md z-10"
              onClick={() => paginate(-1)}
            >
              <FaChevronLeft className="text-purple-600" />
            </button>
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-md z-10"
              onClick={() => paginate(1)}
            >
              <FaChevronRight className="text-purple-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Características Section */}
      <section id="caracteristicas" className="bg-gradient-to-b from-gray-100 to-gray-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Características de la Aplicación
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center transform hover:scale-105 transition duration-300">
              <FaCalendar className="text-5xl text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Gestión de Calendario</h3>
              <p className="text-gray-600">Organiza y visualiza todos tus eventos en un solo lugar</p>
            </div>
            <div className="text-center transform hover:scale-105 transition duration-300">
              <FaUsers className="text-5xl text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Registro de Participantes</h3>
              <p className="text-gray-600">Administra fácilmente la asistencia y los datos de los participantes</p>
            </div>
            <div className="text-center transform hover:scale-105 transition duration-300">
              <FaLaptopCode className="text-5xl text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Integración con Plataformas</h3>
              <p className="text-gray-600">Conecta con otras herramientas académicas y de videoconferencia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Desarrolladores Section with 3D rotating effect */}
      <section id="equipo" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Nuestro Equipo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {desarrolladores.map((dev) => (
              <div key={dev.id} className="perspective-1000">
                <div className="card-3d-wrap mx-auto" style={{ width: '300px', height: '400px' }}>
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="text-center">
                          <img
                            src={`/images/${dev.imagen}`}
                            alt={dev.nombre}
                            className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg"
                          />
                          <h3 className="text-xl font-semibold mb-2">{dev.nombre}</h3>
                          <p className="text-gray-600">{dev.rol}</p>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="text-center">
                          <h3 className="text-xl font-semibold mb-2">{dev.nombre}</h3>
                          <p className="text-gray-600 mb-4">{dev.rol}</p>
                          <p className="text-sm text-gray-500">
                            "La educación es el arma más poderosa que puedes usar para cambiar el mundo."
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Gestión de Eventos de Posgrado. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

