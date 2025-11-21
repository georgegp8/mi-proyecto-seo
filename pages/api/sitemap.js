// GUERRA PACHECO GEORGE MIKY -5C24B
const BASE_URL = "https://mi-proyecto-seo-psi.vercel.app";
const API_BASE = "https://web-production-0c2d.up.railway.app";

export default async function handler(req, res) {
  try {
    // Tiendas y categorías actualizadas
    const stores = ["computershop", "cyccomputer", "pcimpacto", "sercoplus"];
    const categories = [
      "procesadores",
      "tarjetas-video",
      "memorias-ram",
      "almacenamiento",
      "placas-madre"
    ];
    
    const allUrls = [];
    
    // Agregar rutas estáticas principales
    allUrls.push({
      url: "/",
      priority: "1.0",
      changefreq: "daily"
    });
    
    allUrls.push({
      url: "/productos",
      priority: "0.9",
      changefreq: "daily"
    });
    
    allUrls.push({
      url: "/contacto",
      priority: "0.7",
      changefreq: "monthly"
    });
    
    // Agregar URLs por categoría (alta prioridad - páginas de landing)
    for (const category of categories) {
      allUrls.push({
        url: `/productos?category=${category}`,
        priority: "0.8",
        changefreq: "daily"
      });
    }
    
    // Obtener productos dinámicos desde la API para generar URLs
    const productUrls = new Set();
    
    for (const store of stores) {
      try {
        const response = await fetch(
          `${API_BASE}/api/stores/${store}/products`,
          { 
            signal: AbortSignal.timeout(5000)
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          
          // Agregar URLs de productos individuales (primeros 50 por tienda)
          if (data.products && Array.isArray(data.products)) {
            data.products.slice(0, 50).forEach(product => {
              if (product.id) {
                // URL única por producto
                productUrls.add(`/productos?store=${store}&id=${product.id}`);
              }
            });
          }
        }
      } catch (error) {
        console.error(`Error fetching from ${store}:`, error.message);
      }
    }
    
    // Agregar productos únicos al sitemap
    productUrls.forEach(url => {
      allUrls.push({
        url,
        priority: "0.6",
        changefreq: "weekly"
      });
    });
    
    // Agregar combinaciones de tienda + categoría
    for (const store of stores) {
      for (const category of categories) {
        allUrls.push({
          url: `/productos?store=${store}&category=${category}`,
          priority: "0.7",
          changefreq: "weekly"
        });
      }
    }
    
    // Formato W3C Datetime (YYYY-MM-DD)
    const lastmod = new Date().toISOString().split('T')[0];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls
      .map(
        (item) =>
          `  <url>
    <loc>${BASE_URL}${item.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
      )
      .join("\n")}
</urlset>`;

    res.setHeader("Content-Type", "text/xml; charset=UTF-8");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
}
