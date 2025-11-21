// GUERRA PACHECO GEORGE MIKY -5C24B
import Head from "next/head";
import { useState, useEffect } from "react";
import Link from "next/link";

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

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "2rem" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#3b82f6", marginBottom: "1rem", display: "inline-block" }}>
          ← Volver al inicio
        </Link>

        <h1 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "2rem" }}>
          Catálogo de Componentes 🛒
        </h1>

        {/* Filtros */}
        <div style={{ marginBottom: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <label style={{ fontWeight: "600", marginRight: "0.5rem" }}>Tienda:</label>
            <select 
              value={store} 
              onChange={(e) => setStore(e.target.value)}
              style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #d1d5db" }}
            >
              <option value="sercoplus">SercoPlus</option>
              <option value="pcimpacto">PCImpacto</option>
              <option value="memorykings">MemoryKings</option>
            </select>
          </div>

          <div>
            <label style={{ fontWeight: "600", marginRight: "0.5rem" }}>Categoría:</label>
            <select 
              value={componentType} 
              onChange={(e) => setComponentType(e.target.value)}
              style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid #d1d5db" }}
            >
              <option value="procesadores">Procesadores</option>
              <option value="tarjetas-video">Tarjetas de Video</option>
              <option value="memorias-ram">Memorias RAM</option>
              <option value="almacenamiento">Almacenamiento</option>
              <option value="placas-madre">Placas Madre</option>
            </select>
          </div>
        </div>

        {/* Productos */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "3rem", fontSize: "1.25rem" }}>
            Cargando productos...
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {products.map((product, index) => (
              <div 
                key={index} 
                style={{ 
                  border: "1px solid #e5e7eb", 
                  borderRadius: "8px", 
                  padding: "1rem",
                  backgroundColor: "white",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                }}
              >
                {product.image_url && (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    style={{ width: "100%", height: "200px", objectFit: "contain", marginBottom: "1rem" }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.5rem", minHeight: "3rem" }}>
                  {product.name}
                </h3>
                <p style={{ color: "#6b7280", marginBottom: "0.5rem" }}>
                  <strong>Marca:</strong> {product.brand}
                </p>
                <p style={{ fontSize: "1.5rem", fontWeight: "700", color: "#3b82f6", marginBottom: "0.5rem" }}>
                  ${product.price_usd?.toFixed(2)} USD
                </p>
                <p style={{ color: "#6b7280", marginBottom: "0.5rem" }}>
                  S/ {product.price_local?.toFixed(2)} PEN
                </p>
                <p style={{ 
                  fontSize: "0.875rem", 
                  fontWeight: "600",
                  color: product.stock > 0 ? "#10b981" : "#ef4444",
                  marginBottom: "1rem"
                }}>
                  {product.stock > 0 ? `En stock: ${product.stock}` : "Sin stock"}
                </p>
                {product.source_url && (
                  <a 
                    href={product.source_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      display: "block", 
                      textAlign: "center",
                      padding: "0.5rem", 
                      backgroundColor: "#3b82f6", 
                      color: "white", 
                      borderRadius: "4px",
                      textDecoration: "none",
                      fontWeight: "600"
                    }}
                  >
                    Ver en {store}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem", fontSize: "1.25rem", color: "#6b7280" }}>
            No se encontraron productos
          </div>
        )}
      </div>
    </>
  );
}
