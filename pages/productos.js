// GUERRA PACHECO GEORGE MIKY -5C24B
import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const API_BASE = "https://web-production-0c2d.up.railway.app";

export default function Productos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [componentType, setComponentType] = useState("procesadores");
  const [store, setStore] = useState("sercoplus");

  useEffect(() => {
    fetchProducts();
  }, [componentType, store]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE}/api/stores/${store}/products?component_type=${componentType}&limit=12`
      );
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
    setLoading(false);
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

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold mb-6 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver al inicio
          </Link>

          <h1 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            Catálogo de Componentes
          </h1>
          <p className="text-xl text-gray-600 mb-8">Explora nuestra selección de productos de alta calidad</p>

          {/* Filtros */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Filtros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tienda:</label>
                <select 
                  value={store} 
                  onChange={(e) => setStore(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                >
                  <option value="sercoplus">SercoPlus</option>
                  <option value="pcimpacto">PCImpacto</option>
                  <option value="memorykings">MemoryKings</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría:</label>
                <select 
                  value={componentType} 
                  onChange={(e) => setComponentType(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                >
                  <option value="procesadores">Procesadores</option>
                  <option value="tarjetas-video">Tarjetas de Video</option>
                  <option value="memorias-ram">Memorias RAM</option>
                  <option value="almacenamiento">Almacenamiento</option>
                  <option value="placas-madre">Placas Madre</option>
                </select>
              </div>
            </div>
          </div>

          {/* Productos */}
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-xl text-gray-600">Cargando productos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:scale-105"
                >
                  {product.image_url && (
                    <div className="bg-gray-50 p-4 h-48 flex items-center justify-center">
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-sm font-semibold mb-3 text-gray-800 min-h-[3rem] line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Marca:</strong> {product.brand}
                    </p>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <p className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-1">
                        ${product.price_usd?.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 mb-3">
                        S/ {product.price_local?.toFixed(2)}
                      </p>
                      <p className={`text-sm font-semibold mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `✓ En stock: ${product.stock}` : '✗ Sin stock'}
                      </p>
                      {product.source_url && (
                        <a 
                          href={product.source_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block text-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold hover:scale-105 transform transition-all duration-300 shadow-lg"
                        >
                          Ver en tienda
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500">No se encontraron productos</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
