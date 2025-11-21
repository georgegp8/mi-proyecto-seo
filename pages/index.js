// GUERRA PACHECO GEORGE MIKY -5C24B
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_BASE = "https://web-production-0c2d.up.railway.app";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("procesadores");
  const [selectedStoresFilter, setSelectedStoresFilter] = useState([]);
  const [selectedBrandsFilter, setSelectedBrandsFilter] = useState([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState([0, 1000]);
  const [onlyStock, setOnlyStock] = useState(true); // Por defecto solo con stock
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cargar productos iniciales al montar el componente
  useEffect(() => {
    setCurrentPage(1); // Resetear a página 1 cuando cambia categoría
    loadInitialProducts();
  }, [selectedCategory]);

  // Función para cargar productos iniciales (con stock por defecto)
  const loadInitialProducts = async () => {
    setSearching(true);
    try {
      const storeNames = ["computershop", "cyccomputer", "pcimpacto", "sercoplus"];
      const promises = storeNames.map(store =>
        fetch(`${API_BASE}/api/stores/${store}/products?component_type=${selectedCategory}&limit=50`)
          .then(res => res.json())
          .then(data => ({
            store,
            products: (data.products || []).map(p => ({ ...p, storeName: store }))
          }))
          .catch(() => ({ store, products: [] }))
      );

      const results = await Promise.all(promises);
      
      // Agrupar productos similares por nombre
      const grouped = {};
      results.forEach(result => {
        result.products.forEach(product => {
          const key = product.name.toLowerCase().trim();
          if (!grouped[key]) {
            grouped[key] = {
              name: product.name,
              brand: product.brand,
              image_url: product.image_url,
              stores: []
            };
          }
          grouped[key].stores.push({
            storeName: result.store,
            price_usd: product.price_usd,
            price_local: product.price_local,
            stock: product.stock,
            source_url: product.source_url
          });
        });
      });

      // Aplicar filtros
      let resultsArray = Object.values(grouped);
      resultsArray = applyFilters(resultsArray);
      
      setSearchResults(resultsArray);
    } catch (error) {
      console.error("Error loading products:", error);
    }
    setSearching(false);
  };

  // Función para aplicar filtros
  const applyFilters = (resultsArray) => {
    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      resultsArray = resultsArray.filter(r => 
        r.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtrar por marcas
    if (selectedBrandsFilter.length > 0) {
      resultsArray = resultsArray.filter(r => selectedBrandsFilter.includes(r.brand));
    }
    
    // Filtrar por tiendas
    if (selectedStoresFilter.length > 0) {
      resultsArray = resultsArray.map(r => ({
        ...r,
        stores: r.stores.filter(s => selectedStoresFilter.includes(s.storeName))
      })).filter(r => r.stores.length > 0);
    }
    
    // Filtrar por precio
    resultsArray = resultsArray.map(r => ({
      ...r,
      stores: r.stores.filter(s => 
        s.price_usd >= priceRangeFilter[0] && s.price_usd <= priceRangeFilter[1]
      )
    })).filter(r => r.stores.length > 0);
    
    // Filtrar solo con stock
    if (onlyStock) {
      resultsArray = resultsArray.map(r => ({
        ...r,
        stores: r.stores.filter(s => s.stock > 0)
      })).filter(r => r.stores.length > 0);
    }

    return resultsArray;
  };

  // Función de búsqueda/filtrado
  const handleSearch = () => {
    setCurrentPage(1); // Resetear a página 1 cuando se busca
    loadInitialProducts();
  };

  // Obtener marcas únicas de los resultados
  const availableBrands = [...new Set(searchResults.map(r => r.brand).filter(Boolean))].sort();
  const storesList = ["computershop", "cyccomputer", "pcimpacto", "sercoplus"];

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
      logo: "/images/computershop-logo.webp",
      desc: "Especialistas en componentes gaming"
    },
    { 
      name: "CYC Computer", 
      slug: "cyccomputer",
      color: "from-blue-400 to-cyan-500", 
      shadow: "shadow-cyan-500/50",
      logo: "/images/cyccomputer-logo.webp",
      desc: "Tu tienda de confianza en tecnología"
    },
    { 
      name: "PCImpacto", 
      slug: "pcimpacto",
      color: "from-gray-700 to-gray-900", 
      shadow: "shadow-gray-500/50",
      logo: "/images/pcimpacto-logo.webp",
      desc: "Rendimiento y calidad garantizada"
    },
    { 
      name: "SercoPlus", 
      slug: "sercoplus",
      color: "from-orange-600 to-orange-700", 
      shadow: "shadow-orange-600/50",
      logo: "/images/sercoplus-logo.webp",
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

        {/* Price Comparison Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-5xl font-black mb-4 text-gray-900 tracking-tight">
                Comparador de Precios
              </h2>
              <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                Encuentra el mejor precio por componente entre todas nuestras tiendas
              </p>
            </div>

            {/* Layout con Filtros Laterales */}
            <div className="flex gap-6">
              {/* Filtros Izquierda - Categoría y Búsqueda */}
              <aside className="w-64 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-5 sticky top-4">
                  <h3 className="text-lg font-black text-gray-900 mb-4 pb-3 border-b-2 border-orange-500">
                    Buscar
                  </h3>
                  
                  {/* Categoría */}
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Categoría
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-sm"
                    >
                      <option value="procesadores">Procesadores</option>
                      <option value="tarjetas-video">Tarjetas de Video</option>
                      <option value="memorias-ram">Memorias RAM</option>
                      <option value="almacenamiento">Almacenamiento</option>
                      <option value="placas-madre">Placas Madre</option>
                    </select>
                  </div>

                  {/* Búsqueda */}
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Producto
                    </label>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="Ej: Ryzen 5, RTX 4060"
                      className="w-full px-3 py-2 bg-white border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-sm"
                    />
                  </div>

                  {/* Marcas */}
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Marcas
                    </label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {availableBrands.map(brand => (
                        <label key={brand} className="flex items-center space-x-2 cursor-pointer text-sm">
                          <input
                            type="checkbox"
                            checked={selectedBrandsFilter.includes(brand)}
                            onChange={() => {
                              setSelectedBrandsFilter(prev => 
                                prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
                              );
                            }}
                            className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
                          />
                          <span className="text-gray-700">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Solo con stock */}
                  <div className="mb-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={onlyStock}
                        onChange={(e) => setOnlyStock(e.target.checked)}
                        className="w-4 h-4 rounded text-green-500 focus:ring-green-500"
                      />
                      <span className="text-sm font-bold text-gray-700">Solo con stock</span>
                    </label>
                  </div>

                  {/* Botón Buscar */}
                  <button
                    onClick={handleSearch}
                    disabled={searching}
                    className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold hover:scale-105 transition-transform disabled:opacity-50 text-sm"
                  >
                    {searching ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Buscando...
                      </span>
                    ) : "Buscar"}
                  </button>
                </div>
              </aside>

              {/* Contenido Central - Resultados */}
              <main className="flex-1">
                {searchResults.length > 0 ? (
                  <>
                    <div className="space-y-4">
                      {searchResults
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((result, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden hover:border-orange-500 transition-all">
                          <div className="p-4">
                            <div className="flex gap-4 mb-4">
                              {result.image_url && (
                                <img
                                  src={decodeURIComponent(result.image_url)}
                                  alt={result.name}
                                  loading="lazy"
                                  className="w-20 h-20 object-contain bg-gray-50 rounded-lg flex-shrink-0"
                                  onError={(e) => { e.target.style.display = 'none'; }}
                                />
                              )}
                              <div className="flex-1">
                                <h4 className="font-bold text-gray-900 text-lg mb-1">{result.name}</h4>
                                <p className="text-sm text-gray-600">Marca: {result.brand}</p>
                              </div>
                            </div>
                            
                            {/* Tabla comparativa de precios */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                              {result.stores.map((store, sIdx) => (
                                <div key={sIdx} className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-3 border-2 border-gray-200 hover:border-orange-500 transition-all">
                                  <p className="text-xs font-bold text-orange-600 uppercase mb-2">
                                    {store.storeName}
                                  </p>
                                  <p className="text-xl font-black text-gray-900 mb-1">
                                    ${store.price_usd?.toFixed(2)}
                                  </p>
                                  <p className="text-xs text-gray-600 mb-2">
                                    S/ {store.price_local?.toFixed(2)}
                                  </p>
                                  <p className={`text-xs font-semibold mb-2 ${store.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {store.stock > 0 ? `✓ Stock: ${store.stock}` : '✗ Sin stock'}
                                  </p>
                                  {store.source_url && (
                                    <a
                                      href={store.source_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block text-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg font-bold transition-colors"
                                    >
                                      Ver en tienda →
                                    </a>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Paginación */}
                    {searchResults.length > itemsPerPage && (
                      <div className="mt-8 flex items-center justify-center gap-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-bold text-gray-700 hover:border-orange-500 hover:text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          ← Anterior
                        </button>
                        
                        <div className="flex gap-1">
                          {Array.from({ length: Math.ceil(searchResults.length / itemsPerPage) }, (_, i) => i + 1)
                            .filter(page => {
                              const totalPages = Math.ceil(searchResults.length / itemsPerPage);
                              if (totalPages <= 7) return true;
                              if (page === 1 || page === totalPages) return true;
                              if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                              return false;
                            })
                            .map((page, idx, arr) => {
                              const showEllipsis = idx > 0 && page - arr[idx - 1] > 1;
                              return (
                                <div key={page} className="flex items-center gap-1">
                                  {showEllipsis && <span className="px-2 text-gray-400">...</span>}
                                  <button
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-lg font-bold transition-all ${
                                      currentPage === page
                                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500'
                                    }`}
                                  >
                                    {page}
                                  </button>
                                </div>
                              );
                            })}
                        </div>

                        <button
                          onClick={() => setCurrentPage(prev => Math.min(Math.ceil(searchResults.length / itemsPerPage), prev + 1))}
                          disabled={currentPage === Math.ceil(searchResults.length / itemsPerPage)}
                          className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-bold text-gray-700 hover:border-orange-500 hover:text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          Siguiente →
                        </button>
                      </div>
                    )}

                    {/* Indicador de resultados */}
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-600">
                        Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, searchResults.length)} de {searchResults.length} resultados
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-12 text-center">
                    <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="text-gray-600 font-medium text-lg">
                      {searching ? "Buscando productos..." : "Utiliza los filtros para comparar precios"}
                    </p>
                  </div>
                )}
              </main>

              {/* Filtros Derecha - Tiendas y Precio */}
              <aside className="w-64 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-5 sticky top-4">
                  <h3 className="text-lg font-black text-gray-900 mb-4 pb-3 border-b-2 border-cyan-500">
                    Filtros
                  </h3>

                  {/* Tiendas */}
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Tiendas
                    </label>
                    <div className="space-y-2">
                      {storesList.map(store => (
                        <label key={store} className="flex items-center space-x-2 cursor-pointer text-sm">
                          <input
                            type="checkbox"
                            checked={selectedStoresFilter.includes(store)}
                            onChange={() => {
                              setSelectedStoresFilter(prev => 
                                prev.includes(store) ? prev.filter(s => s !== store) : [...prev, store]
                              );
                            }}
                            className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
                          />
                          <span className="text-gray-700">
                            {store === 'computershop' ? 'ComputerShop' : 
                             store === 'cyccomputer' ? 'CYC Computer' : 
                             store === 'pcimpacto' ? 'PCImpacto' : 'SercoPlus'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Rango de Precio */}
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Precio Máximo: ${priceRangeFilter[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="50"
                      value={priceRangeFilter[1]}
                      onChange={(e) => setPriceRangeFilter([0, Number(e.target.value)])}
                      className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>$0</span>
                      <span>$1000</span>
                    </div>
                  </div>

                  {/* Aplicar Filtros */}
                  <button
                    onClick={handleSearch}
                    className="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm rounded-lg font-bold transition-colors"
                  >
                    Aplicar Filtros
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Stores Section - Slider Horizontal Simple */}
        <section className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                Tiendas Asociadas
              </h2>
              <p className="text-gray-400 text-lg">
                Comparamos precios en tiempo real
              </p>
            </div>

            {/* Slider Horizontal de Tiendas */}
            <div className="relative overflow-hidden">
              <div className="overflow-x-auto pb-6 scrollbar-hide">
                <div className="flex gap-6 min-w-max px-2">
                  {stores.map((store, index) => (
                    <div key={index} className="w-72 bg-gray-900 rounded-2xl border-2 border-gray-800 hover:border-orange-500 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-orange-500/20 flex-shrink-0">
                      <div className={`h-1 bg-gradient-to-r ${store.color}`}></div>
                      
                      <div className="p-6">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-white flex items-center justify-center p-4">
                          {store.logo ? (
                            <img 
                              src={store.logo}
                              alt={store.name}
                              loading="lazy"
                              className="max-w-full max-h-full object-contain"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            <span className="text-3xl font-black text-gray-800">
                              {store.name.charAt(0)}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-2xl font-black mb-2 text-white text-center">{store.name}</h3>
                        <p className="text-sm text-gray-400 mb-4 text-center">{store.desc}</p>
                        
                        <Link 
                          href="/productos"
                          className="block text-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-bold hover:scale-105 transition-transform duration-300"
                        >
                          Ver productos
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Indicador de scroll */}
              <div className="text-center mt-2">
                <p className="text-sm text-gray-500">← Desliza para ver todas las tiendas →</p>
              </div>
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
