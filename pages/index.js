// GUERRA PACHECO GEORGE MIKY -5C24B
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentStore, setCurrentStore] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate stores
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStore((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { 
      title: "Procesadores", 
      slug: "procesadores",
      desc: "AMD Ryzen, Intel Core - Máximo rendimiento", 
      color: "from-orange-500 to-orange-600", 
      border: "border-orange-500",
      image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=400&fit=crop"
    },
    { 
      title: "Tarjetas de Video", 
      slug: "tarjetas-video",
      desc: "NVIDIA, AMD - Gaming y diseño profesional", 
      color: "from-blue-400 to-cyan-500", 
      border: "border-blue-400",
      image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=400&fit=crop"
    },
    { 
      title: "Memoria RAM", 
      slug: "memorias-ram",
      desc: "Kingston, Corsair - Velocidad garantizada", 
      color: "from-orange-600 to-orange-700", 
      border: "border-orange-600",
      image: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&h=400&fit=crop"
    },
    { 
      title: "Almacenamiento", 
      slug: "almacenamiento",
      desc: "SSD, NVMe - Rapidez extrema", 
      color: "from-gray-700 to-gray-900", 
      border: "border-gray-700",
      image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop"
    },
    { 
      title: "Placas Madre", 
      slug: "placas-madre",
      desc: "ASUS, MSI, Gigabyte - Calidad premium", 
      color: "from-cyan-500 to-blue-600", 
      border: "border-cyan-500",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop"
    },
  ];

  const stores = [
    { 
      name: "ComputerShop", 
      slug: "computershop",
      color: "from-orange-500 to-orange-600", 
      shadow: "shadow-orange-500/50",
      logo: "/images/computershop-logo.png",
      desc: "Especialistas en componentes gaming"
    },
    { 
      name: "CYC Computer", 
      slug: "cyccomputer",
      color: "from-blue-400 to-cyan-500", 
      shadow: "shadow-cyan-500/50",
      logo: "/images/cyccomputer-logo.jpg",
      desc: "Tu tienda de confianza en tecnología"
    },
    { 
      name: "PCImpacto", 
      slug: "pcimpacto",
      color: "from-gray-700 to-gray-900", 
      shadow: "shadow-gray-500/50",
      logo: "/images/pcimpacto-logo.png",
      desc: "Rendimiento y calidad garantizada"
    },
    { 
      name: "SercoPlus", 
      slug: "sercoplus",
      color: "from-orange-600 to-orange-700", 
      shadow: "shadow-orange-600/50",
      logo: "/images/sercoplus-logo.jpg",
      desc: "Líderes en hardware y componentes"
    },
  ];

  return (
    <>
      <Head>
        <title>TechStore Perú - Compara Precios de Componentes de PC | Los Mejores Precios</title>
        <meta name="description" content="Compara precios de componentes de PC en las mejores tiendas de Perú: SercoPlus, PCImpacto y MemoryKings. Encuentra procesadores, tarjetas de video, RAM y más al mejor precio." />
        <meta name="keywords" content="componentes PC Perú, procesadores AMD Intel, tarjetas de video, RAM, SSD, comparar precios PC" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mi-proyecto-seo-psi.vercel.app/" />
        <meta property="og:title" content="TechStore Perú - Compara Precios de Componentes de PC" />
        <meta property="og:description" content="Encuentra los mejores precios en componentes de PC. Compara entre SercoPlus, PCImpacto y MemoryKings." />
        <meta property="og:image" content="/images/cocker-spaniel.webp" />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://mi-proyecto-seo-psi.vercel.app/" />
        <meta property="twitter:title" content="TechStore Perú - Compara Precios de Componentes de PC" />
        <meta property="twitter:description" content="Encuentra los mejores precios en componentes de PC." />
        <meta property="twitter:image" content="/images/cocker-spaniel.webp" />
      </Head>

      <Navbar />

      <div className="min-h-screen">
        {/* Hero Section con Gradiente Animado */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23FF8700" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center">
              <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight animate-fadeIn">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
                  TechStore Perú
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-light mb-8 text-cyan-400 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                Encuentra los mejores precios en componentes de PC
              </p>
              <p className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                Compara precios en tiempo real entre ComputerShop, CYC Computer, PCImpacto y SercoPlus
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link href="/productos" className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-black bg-gradient-to-r from-orange-400 to-orange-500 rounded-full overflow-hidden shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-orange-500/50">
                  <span className="relative z-10">Ver Productos</span>
                </Link>
                
                <Link href="/contacto" className="group inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-orange-400 bg-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl border-2 border-orange-400 hover:bg-orange-400 hover:text-white">
                  <span>Contáctanos</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section con Carousel */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4 text-gray-900 tracking-tight">
                Categorías Destacadas
              </h2>
              <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                Explora nuestra amplia selección de componentes de alta calidad
              </p>
            </div>

            {/* Carousel Container */}
            <div className="relative max-w-5xl mx-auto">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <div 
                  className="flex transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {categories.map((item, index) => (
                    <div key={index} className="min-w-full px-4">
                      <div className={`relative bg-gradient-to-br ${item.color} rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300`}>
                        <div className="absolute inset-0 opacity-20">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        
                        <div className="relative z-10 p-10 text-white">
                          <div className="flex items-center justify-between mb-6">
                            <div className="w-28 h-28 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center overflow-hidden border-2 border-white/30">
                              <img 
                                src={item.image} 
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-white/80 text-lg font-bold bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full">
                              {index + 1} / {categories.length}
                            </span>
                          </div>
                          <h3 className="text-4xl sm:text-5xl font-black mb-4 drop-shadow-lg">{item.title}</h3>
                          <p className="text-xl text-white/90 leading-relaxed mb-6">{item.desc}</p>
                          <Link 
                            href={`/productos?category=${item.slug}`}
                            className="inline-block px-8 py-3 bg-white text-gray-800 rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-xl hover:bg-orange-400 hover:text-white"
                          >
                            Ver productos
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-3 mt-8">
                {categories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentSlide === index 
                        ? 'w-12 h-3 bg-gradient-to-r from-orange-400 to-orange-600' 
                        : 'w-3 h-3 bg-gray-300 hover:bg-orange-300'
                    }`}
                    aria-label={`Ir a slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + categories.length) % categories.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-14 h-14 bg-gray-800 border-2 border-orange-500 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
                aria-label="Anterior"
              >
                <svg className="w-6 h-6 text-orange-400 group-hover:text-orange-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % categories.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-14 h-14 bg-gray-800 border-2 border-orange-500 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
                aria-label="Siguiente"
              >
                <svg className="w-6 h-6 text-orange-400 group-hover:text-orange-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Stores Section */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                Tiendas Asociadas
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Comparamos precios en tiempo real
              </p>
            </div>

            {/* Featured Store Display */}
            <div className="max-w-4xl mx-auto mb-10">
              <div className={`relative bg-gradient-to-br ${stores[currentStore].color} rounded-3xl p-12 shadow-2xl transform transition-all duration-500 overflow-hidden`}>
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 text-center text-white">
                  <div className="w-36 h-36 mx-auto mb-6 rounded-3xl bg-white backdrop-blur-lg flex items-center justify-center p-5 shadow-2xl">
                    {stores[currentStore].logo ? (
                      <img 
                        src={stores[currentStore].logo}
                        alt={stores[currentStore].name}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-4xl font-black text-gray-800">
                        {stores[currentStore].name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-black mb-3 drop-shadow-lg">{stores[currentStore].name}</h3>
                  <p className="text-xl text-white/90 mb-6">{stores[currentStore].desc}</p>
                  <Link 
                    href="/productos"
                    className="inline-block px-8 py-3 bg-white text-gray-800 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-xl hover:bg-orange-400 hover:text-white"
                  >
                    Ver productos
                  </Link>
                </div>
              </div>
            </div>

            {/* Store Selector */}
            <div className="flex flex-wrap justify-center gap-4">
              {stores.map((store, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStore(index)}
                  className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                    currentStore === index
                      ? `bg-gradient-to-r ${store.color} text-white shadow-xl scale-110 border-2 border-orange-400`
                      : 'bg-gray-800 text-gray-300 shadow-md hover:shadow-lg hover:scale-105 border-2 border-gray-700 hover:border-orange-400'
                  }`}
                >
                  {store.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute transform rotate-45 -left-1/4 -top-1/4 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
            <div className="absolute transform -rotate-45 -right-1/4 -bottom-1/4 w-96 h-96 bg-black rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 drop-shadow-lg">
              ¿Listo para ahorrar?
            </h2>
            <p className="text-lg sm:text-xl text-orange-100 mb-8">
              Compara precios y encuentra las mejores ofertas
            </p>
            
            <Link href="/productos" className="inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-orange-600 bg-white rounded-full shadow-2xl hover:scale-110 transform transition-all duration-300 hover:shadow-white/50">
              Explorar Productos
              <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
