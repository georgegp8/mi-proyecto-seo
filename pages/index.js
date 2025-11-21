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
      setCurrentSlide((prev) => (prev + 1) % 6);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate stores
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStore((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { title: "Procesadores", desc: "AMD Ryzen, Intel Core - Máximo rendimiento", color: "from-blue-500 to-cyan-500", border: "border-blue-500" },
    { title: "Tarjetas de Video", desc: "NVIDIA, AMD - Gaming y diseño profesional", color: "from-purple-500 to-pink-500", border: "border-purple-500" },
    { title: "Memoria RAM", desc: "Kingston, Corsair - Velocidad garantizada", color: "from-green-500 to-emerald-500", border: "border-green-500" },
    { title: "Almacenamiento", desc: "SSD, NVMe - Rapidez extrema", color: "from-orange-500 to-red-500", border: "border-orange-500" },
    { title: "Placas Madre", desc: "ASUS, MSI, Gigabyte - Calidad premium", color: "from-indigo-500 to-purple-500", border: "border-indigo-500" },
    { title: "Periféricos", desc: "Teclados, Mouse - Gaming gear", color: "from-pink-500 to-rose-500", border: "border-pink-500" },
  ];

  const stores = [
    { name: "SercoPlus", color: "from-blue-600 to-blue-400", shadow: "shadow-blue-500/50" },
    { name: "PCImpacto", color: "from-purple-600 to-purple-400", shadow: "shadow-purple-500/50" },
    { name: "MemoryKings", color: "from-pink-600 to-pink-400", shadow: "shadow-pink-500/50" },
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
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <div className="text-center fade-in">
              <h1 className="text-5xl sm:text-7xl font-black mb-6 leading-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-200">
                  TechStore Perú
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-light mb-8 text-pink-100">
                Encuentra los mejores precios en componentes de PC
              </p>
              <p className="text-lg mb-12 text-pink-50 max-w-2xl mx-auto">
                Compara precios en tiempo real entre las tiendas líderes: SercoPlus, PCImpacto y MemoryKings
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/productos" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full overflow-hidden shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50">
                  <span className="relative z-10">Ver Productos</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                
                <Link href="/contacto" className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-purple-600 bg-white rounded-full shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <span>Contáctanos</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* Features Section con Carousel */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Categorías Destacadas
              </h2>
              <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                Explora nuestra amplia selección de componentes de alta calidad
              </p>
            </div>

            {/* Carousel Container */}
            <div className="relative max-w-5xl mx-auto">
              <div className="overflow-hidden rounded-3xl">
                <div 
                  className="flex transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {categories.map((item, index) => (
                    <div key={index} className="min-w-full px-4">
                      <div className={`relative bg-gradient-to-br ${item.color} rounded-2xl p-12 shadow-2xl`}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="relative z-10 text-white">
                          <div className="flex items-center justify-between mb-8">
                            <div className="w-24 h-24 rounded-2xl bg-white/20 backdrop-blur-lg flex items-center justify-center">
                              <div className="w-12 h-12 bg-white rounded-lg"></div>
                            </div>
                            <span className="text-white/60 text-lg font-medium">{index + 1} / {categories.length}</span>
                          </div>
                          <h3 className="text-4xl font-black mb-4">{item.title}</h3>
                          <p className="text-xl text-white/90 leading-relaxed">{item.desc}</p>
                          <Link 
                            href="/productos"
                            className="inline-block mt-8 px-8 py-4 bg-white text-gray-800 rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-xl"
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
                        ? 'w-12 h-3 bg-gradient-to-r from-purple-600 to-pink-600' 
                        : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Ir a slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + categories.length) % categories.length)}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
                aria-label="Anterior"
              >
                <svg className="w-6 h-6 text-gray-800 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % categories.length)}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
                aria-label="Siguiente"
              >
                <svg className="w-6 h-6 text-gray-800 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Stores Section con Slider Horizontal */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Tiendas Asociadas
              </h2>
              <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                Comparamos precios en las mejores tiendas del mercado peruano
              </p>
            </div>

            {/* Featured Store Display */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className={`relative bg-gradient-to-br ${stores[currentStore].color} rounded-3xl p-16 shadow-2xl transform transition-all duration-500`}>
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 text-center text-white">
                  <div className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-white/20 backdrop-blur-lg flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-5xl font-black mb-6">{stores[currentStore].name}</h3>
                  <p className="text-2xl text-white/90 mb-8">Amplio catálogo de componentes de PC</p>
                  <div className="flex justify-center gap-4">
                    <Link 
                      href="/productos"
                      className="px-10 py-4 bg-white text-gray-800 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-xl"
                    >
                      Ver productos
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Selector */}
            <div className="flex justify-center gap-6">
              {stores.map((store, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStore(index)}
                  className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    currentStore === index
                      ? `bg-gradient-to-r ${store.color} text-white shadow-xl scale-110`
                      : 'bg-white text-gray-700 shadow-md hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {store.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute transform rotate-45 -left-1/4 -top-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute transform -rotate-45 -right-1/4 -bottom-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
              ¿Listo para ahorrar?
            </h2>
            <p className="text-xl text-purple-100 mb-10">
              Compara precios y encuentra las mejores ofertas en componentes de PC
            </p>
            
            <Link href="/productos" className="inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-purple-600 bg-white rounded-full shadow-2xl hover:scale-110 transform transition-all duration-300 hover:shadow-white/50">
              Explorar Productos Ahora
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
