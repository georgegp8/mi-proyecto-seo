// GUERRA PACHECO GEORGE MIKY -5C24B
import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_BASE = "https://web-production-0c2d.up.railway.app";

export default function Productos() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [componentType, setComponentType] = useState(router.query.category || "procesadores");
  const [selectedStores, setSelectedStores] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const stores = ["computershop", "cyccomputer", "pcimpacto", "sercoplus"];

  useEffect(() => {
    if (router.query.category) {
      setComponentType(router.query.category);
    }
  }, [router.query.category]);

  useEffect(() => {
    fetchAllProducts();
  }, [componentType]);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const allProducts = [];
      
      const promises = stores.map(store =>
        fetch(`${API_BASE}/api/stores/${store}/products?component_type=${componentType}&limit=50`)
          .then(res => res.json())
          .then(data => ({
            store,
            products: (data.products || []).map(p => ({ ...p, storeName: store }))
          }))
          .catch(err => {
            console.error(`Error fetching ${store}:`, err);
            return { store, products: [] };
          })
      );

      const results = await Promise.all(promises);
      results.forEach(result => {
        allProducts.push(...result.products);
      });

      setProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
    setLoading(false);
  };

  const allBrands = [...new Set(products.map(p => p.brand).filter(Boolean))].sort();
  const minPrice = Math.min(...products.map(p => p.price_usd || 0), 0);
  const maxPrice = Math.max(...products.map(p => p.price_usd || 1000), 1000);

  useEffect(() => {
    if (products.length > 0) {
      setPriceRange([minPrice, maxPrice]);
    }
  }, [products.length]);

  const filteredProducts = products.filter(p => {
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedStores.length > 0 && !selectedStores.includes(p.storeName)) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
    if (p.price_usd < priceRange[0] || p.price_usd > priceRange[1]) return false;
    return true;
  });

  const toggleStore = (store) => {
    setSelectedStores(prev => prev.includes(store) ? prev.filter(s => s !== store) : [...prev, store]);
    setCurrentPage(1);
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedStores([]);
    setSelectedBrands([]);
    setPriceRange([minPrice, maxPrice]);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>Componentes de PC - {componentType} | TechStore Perú</title>
        <meta name="description" content={`Encuentra los mejores ${componentType} en Perú. Compara precios entre SercoPlus, PCImpacto y MemoryKings. AMD, Intel, NVIDIA y más marcas.`} />
        <meta name="keywords" content={`${componentType} Perú, comprar ${componentType}, precios ${componentType}, componentes PC`} />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://mi-proyecto-seo-psi.vercel.app/productos?category=${componentType}`} />
        <meta property="og:title" content={`Componentes de PC - ${componentType} | TechStore Perú`} />
        <meta property="og:description" content={`Encuentra los mejores ${componentType} en Perú. Compara precios entre las mejores tiendas.`} />
        <meta property="og:image" content="/images/cocker-spaniel.webp" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://mi-proyecto-seo-psi.vercel.app/productos?category=${componentType}`} />
        <meta name="twitter:title" content={`Componentes de PC - ${componentType} | TechStore Perú`} />
        <meta name="twitter:description" content={`Encuentra los mejores ${componentType} en Perú. Compara precios.`} />
        <meta name="twitter:image" content="/images/cocker-spaniel.webp" />
      </Head>

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-orange-400 hover:text-orange-300 font-semibold mb-6 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>

          <h1 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
            Catálogo de Componentes
          </h1>
          <p className="text-xl text-cyan-400 mb-8">Compara precios entre todas las tiendas</p>

          {/* Layout con Filtros Laterales */}
          <div className="flex gap-6">
            {/* Sidebar Izquierdo - Filtros */}
            <aside className="w-72 flex-shrink-0">
              {/* Búsqueda */}
              <div className="bg-gray-800 border-2 border-orange-500 rounded-2xl shadow-2xl p-4 mb-4 sticky top-4">
                <h3 className="text-sm font-bold text-white mb-3">🔍 Búsqueda</h3>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Buscar productos..."
                  className="w-full px-3 py-2 bg-gray-900 border-2 border-gray-700 text-white text-sm rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Filtros */}
              <div className="bg-gray-800 border-2 border-orange-500 rounded-2xl shadow-2xl p-4 sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-sm font-bold text-white">⚙️ Filtros</h2>
                  <button
                    onClick={clearFilters}
                    className="px-2 py-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded transition-colors"
                  >
                    Limpiar
                  </button>
                </div>

                {/* Categoría */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-cyan-400 mb-2">Categoría:</label>
                  <select 
                    value={componentType} 
                    onChange={(e) => {
                      setComponentType(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-2 py-2 bg-gray-900 border-2 border-gray-700 text-white text-xs rounded-lg focus:border-orange-500 focus:outline-none"
                  >
                    <option value="procesadores">Procesadores</option>
                    <option value="tarjetas-video">Tarjetas de Video</option>
                    <option value="memorias-ram">Memorias RAM</option>
                    <option value="almacenamiento">Almacenamiento</option>
                    <option value="placas-madre">Placas Madre</option>
                  </select>
                </div>

                {/* Tiendas */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-cyan-400 mb-2">Tiendas:</label>
                  <div className="space-y-1.5">
                    {stores.map(store => (
                      <label key={store} className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedStores.includes(store)}
                          onChange={() => toggleStore(store)}
                          className="w-3 h-3 rounded border-gray-700 bg-gray-900 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-white text-xs group-hover:text-orange-400 transition-colors">
                          {store === 'computershop' ? 'ComputerShop' : 
                           store === 'cyccomputer' ? 'CYC Computer' : 
                           store === 'pcimpacto' ? 'PCImpacto' : 'SercoPlus'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Marcas */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-cyan-400 mb-2">Marcas:</label>
                  <div className="max-h-32 overflow-y-auto space-y-1.5 pr-2">
                    {allBrands.length === 0 ? (
                      <p className="text-gray-500 text-xs">Cargando...</p>
                    ) : (
                      allBrands.map(brand => (
                        <label key={brand} className="flex items-center space-x-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                            className="w-3 h-3 rounded border-gray-700 bg-gray-900 text-orange-500 focus:ring-orange-500"
                          />
                          <span className="text-white text-xs group-hover:text-orange-400 transition-colors">{brand}</span>
                        </label>
                      ))
                    )}
                  </div>
                </div>

                {/* Rango de Precios */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-cyan-400 mb-2">
                    Precio: ${priceRange[0].toFixed(0)} - ${priceRange[1].toFixed(0)}
                  </label>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-gray-400">Mínimo</label>
                      <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        step="10"
                        value={priceRange[0]}
                        onChange={(e) => {
                          const newMin = Number(e.target.value);
                          if (newMin <= priceRange[1]) {
                            setPriceRange([newMin, priceRange[1]]);
                            setCurrentPage(1);
                          }
                        }}
                        className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400">Máximo</label>
                      <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        step="10"
                        value={priceRange[1]}
                        onChange={(e) => {
                          const newMax = Number(e.target.value);
                          if (newMax >= priceRange[0]) {
                            setPriceRange([priceRange[0], newMax]);
                            setCurrentPage(1);
                          }
                        }}
                        className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Contador */}
                <div className="pt-3 border-t border-gray-700">
                  <div className="text-xs text-gray-400">
                    <span className="text-orange-400 font-bold">{currentProducts.length}</span> de{' '}
                    <span className="text-cyan-400 font-bold">{filteredProducts.length}</span> productos
                  </div>
                  {(selectedStores.length > 0 || selectedBrands.length > 0 || searchQuery) && (
                    <div className="text-xs text-gray-500 mt-1">
                      Filtros: {selectedStores.length + selectedBrands.length + (searchQuery ? 1 : 0)}
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* Contenido Principal - Productos */}
            <main className="flex-1">
              {loading ? (
                <div className="text-center py-20">
                  <div className="inline-block w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-xl text-gray-400">Cargando productos...</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {currentProducts.map((product, index) => (
                      <div 
                        key={`${product.storeName}-${index}`} 
                        className="bg-gray-800 border-2 border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl hover:border-orange-500 transition-all duration-300 overflow-hidden group hover:scale-105"
                      >
                        {product.image_url && (
                          <div className="bg-white p-4 h-48 flex items-center justify-center relative overflow-hidden">
                            <img 
                              src={decodeURIComponent(product.image_url)} 
                              alt={product.name}
                              loading="lazy"
                              className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <span className="inline-block px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded-full mb-2 uppercase">
                            {product.storeName}
                          </span>
                          
                          <h3 className="text-sm font-semibold mb-2 text-white min-h-[2.5rem] line-clamp-2 group-hover:text-orange-400 transition-colors">
                            {product.name}
                          </h3>
                          {product.description && (
                            <p className="text-xs text-gray-400 mb-2 line-clamp-4 min-h-[3.5rem]">
                              {product.description}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mb-2">
                            <strong className="text-cyan-400">Marca:</strong> {product.brand}
                          </p>
                          <div className="border-t border-gray-700 pt-3 mt-3">
                            <p className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600 mb-1">
                              ${product.price_usd?.toFixed(2)}
                            </p>
                            <p className="text-xs text-gray-400 mb-2">
                              S/ {product.price_local?.toFixed(2)}
                            </p>
                            <p className={`text-xs font-semibold mb-3 ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {product.stock > 0 ? `✓ Stock: ${product.stock}` : '✗ Sin stock'}
                            </p>
                            {product.source_url && (
                              <a 
                                href={product.source_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block text-center px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm rounded-xl font-bold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-orange-500/50"
                              >
                                Ver en tienda
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Paginación */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-800 border-2 border-orange-500 text-white rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-500 transition-colors"
                      >
                        Anterior
                      </button>
                      
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                        ) {
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => paginate(pageNumber)}
                              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                                currentPage === pageNumber
                                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white scale-110'
                                  : 'bg-gray-800 border-2 border-gray-700 text-gray-400 hover:border-orange-500 hover:text-white'
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        } else if (pageNumber === currentPage - 3 || pageNumber === currentPage + 3) {
                          return <span key={pageNumber} className="text-gray-500">...</span>;
                        }
                        return null;
                      })}
                      
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-800 border-2 border-orange-500 text-white rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-500 transition-colors"
                      >
                        Siguiente
                      </button>
                    </div>
                  )}

                  {filteredProducts.length === 0 && (
                    <div className="text-center py-20 bg-gray-800 rounded-2xl border-2 border-gray-700">
                      <p className="text-2xl text-gray-400">No se encontraron productos</p>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
