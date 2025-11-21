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
  const [selectedStore, setSelectedStore] = useState("all");
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
      
      // Fetch de todas las tiendas en paralelo
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
      
      // Combinar todos los productos
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

  // Filtrar productos por tienda seleccionada
  const filteredProducts = selectedStore === "all" 
    ? products 
    : products.filter(p => p.storeName === selectedStore);

  // Paginación
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
        <meta property="og:title" content={`Componentes de PC - ${componentType} | TechStore Perú`} />
        <meta property="og:description" content={`Los mejores ${componentType} al mejor precio en Perú`} />
        <meta property="og:image" content="/images/cocker-spaniel.webp" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Componentes de PC - ${componentType}`} />
        <meta name="twitter:description" content={`Los mejores ${componentType} al mejor precio`} />
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

          {/* Filtros */}
          <div className="bg-gray-800 border-2 border-orange-500 rounded-2xl shadow-2xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Filtros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">Categoría:</label>
                <select 
                  value={componentType} 
                  onChange={(e) => {
                    setComponentType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 text-white rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                >
                  <option value="procesadores">Procesadores</option>
                  <option value="tarjetas-video">Tarjetas de Video</option>
                  <option value="memorias-ram">Memorias RAM</option>
                  <option value="almacenamiento">Almacenamiento</option>
                  <option value="placas-madre">Placas Madre</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-cyan-400 mb-2">Tienda:</label>
                <select 
                  value={selectedStore} 
                  onChange={(e) => {
                    setSelectedStore(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 text-white rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                >
                  <option value="all">Todas las tiendas</option>
                  <option value="computershop">ComputerShop</option>
                  <option value="cyccomputer">CYC Computer</option>
                  <option value="pcimpacto">PCImpacto</option>
                  <option value="sercoplus">SercoPlus</option>
                </select>
              </div>
            </div>
            
            {/* Contador de productos */}
            <div className="mt-4 text-gray-400 text-sm">
              Mostrando {currentProducts.length} de {filteredProducts.length} productos
            </div>
          </div>

          {/* Productos */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-xl text-gray-400">Cargando productos de todas las tiendas...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {currentProducts.map((product, index) => (
                  <div 
                    key={`${product.storeName}-${index}`} 
                    className="bg-gray-800 border-2 border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl hover:border-orange-500 transition-all duration-300 overflow-hidden group hover:scale-105"
                  >
                    {product.image_url && (
                      <div className="bg-white p-4 h-56 flex items-center justify-center relative overflow-hidden">
                        <img 
                          src={product.image_url} 
                          alt={product.name}
                          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                    )}
                    <div className="p-5">
                      {/* Badge de tienda */}
                      <span className="inline-block px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full mb-3 uppercase">
                        {product.storeName}
                      </span>
                      
                      <h3 className="text-sm font-semibold mb-3 text-white min-h-[3rem] line-clamp-2 group-hover:text-orange-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">
                        <strong className="text-cyan-400">Marca:</strong> {product.brand}
                      </p>
                      <div className="border-t border-gray-700 pt-3 mt-3">
                        <p className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600 mb-1">
                          ${product.price_usd?.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-400 mb-3">
                          S/ {product.price_local?.toFixed(2)}
                        </p>
                        <p className={`text-sm font-semibold mb-4 ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {product.stock > 0 ? `✓ Stock: ${product.stock}` : '✗ Sin stock'}
                        </p>
                        {product.source_url && (
                          <a 
                            href={product.source_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block text-center px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-orange-500/50"
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
                    // Mostrar solo páginas cercanas a la actual
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
                    } else if (
                      pageNumber === currentPage - 3 ||
                      pageNumber === currentPage + 3
                    ) {
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
            </>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-gray-800 rounded-2xl border-2 border-gray-700">
              <p className="text-2xl text-gray-400">No se encontraron productos</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
