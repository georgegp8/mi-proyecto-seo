// GUERRA PACHECO GEORGE MIKY -5C24B
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>TechStore Perú - Compara Precios de Componentes de PC | Los Mejores Precios</title>
        <meta name="description" content="Compara precios de componentes de PC en las mejores tiendas de Perú: SercoPlus, PCImpacto y MemoryKings. Encuentra procesadores, tarjetas de video, RAM y más al mejor precio." />
        <meta name="keywords" content="componentes PC Perú, procesadores AMD Intel, tarjetas de video, RAM, SSD, comparar precios PC" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mi-proyecto-seo-psi.vercel.app/" />
        <meta property="og:title" content="TechStore Perú - Compara Precios de Componentes de PC" />
        <meta property="og:description" content="Encuentra los mejores precios en componentes de PC. Compara entre SercoPlus, PCImpacto y MemoryKings." />
        <meta property="og:image" content="/images/cocker-spaniel.webp" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://mi-proyecto-seo-psi.vercel.app/" />
        <meta property="twitter:title" content="TechStore Perú - Compara Precios de Componentes de PC" />
        <meta property="twitter:description" content="Encuentra los mejores precios en componentes de PC." />
        <meta property="twitter:image" content="/images/cocker-spaniel.webp" />
      </Head>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <header style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "3.5rem", fontWeight: "900", marginBottom: "1rem", color: "#1f2937" }}>
            TechStore Perú 🖥️
          </h1>
          <p style={{ fontSize: "1.5rem", fontWeight: "300", color: "#6b7280", marginBottom: "2rem" }}>
            Compara precios de componentes de PC en las mejores tiendas
          </p>
        </header>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "1.5rem" }}>
            ¿Qué ofrecemos?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            <div style={{ padding: "1.5rem", border: "2px solid #e5e7eb", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>💻 Procesadores</h3>
              <p>AMD Ryzen, Intel Core - Los mejores CPUs al mejor precio</p>
            </div>
            <div style={{ padding: "1.5rem", border: "2px solid #e5e7eb", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>🎮 Tarjetas de Video</h3>
              <p>NVIDIA, AMD - GPUs para gaming y diseño</p>
            </div>
            <div style={{ padding: "1.5rem", border: "2px solid #e5e7eb", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>🧠 Memoria RAM</h3>
              <p>Kingston, Corsair, Crucial - RAM de alto rendimiento</p>
            </div>
            <div style={{ padding: "1.5rem", border: "2px solid #e5e7eb", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>💾 Almacenamiento</h3>
              <p>SSD, NVMe, HDD - Velocidad y capacidad</p>
            </div>
            <div style={{ padding: "1.5rem", border: "2px solid #e5e7eb", borderRadius: "8px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>🔧 Placas Madre</h3>
              <p>ASUS, MSI, Gigabyte - Motherboards de calidad</p>
            </div>
          </div>
        </section>

        <section style={{ textAlign: "center", marginBottom: "3rem", padding: "2rem", backgroundColor: "#f3f4f6", borderRadius: "8px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "1rem" }}>
            Tiendas que Comparamos
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
            <div style={{ fontSize: "1.25rem", fontWeight: "600" }}>🏪 SercoPlus</div>
            <div style={{ fontSize: "1.25rem", fontWeight: "600" }}>🏪 PCImpacto</div>
            <div style={{ fontSize: "1.25rem", fontWeight: "600" }}>🏪 MemoryKings</div>
          </div>
        </section>

        <nav style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "3rem" }}>
          <Link href="/productos" style={{ 
            padding: "1rem 2rem", 
            backgroundColor: "#3b82f6", 
            color: "white", 
            borderRadius: "8px", 
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1.125rem"
          }}>
            Ver Productos
          </Link>
          <Link href="/contacto" style={{ 
            padding: "1rem 2rem", 
            backgroundColor: "#6b7280", 
            color: "white", 
            borderRadius: "8px", 
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "1.125rem"
          }}>
            Contacto
          </Link>
        </nav>
      </div>
    </>
  );
}
