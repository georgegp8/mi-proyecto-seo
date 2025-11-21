// GUERRA PACHECO GEORGE MIKY -5C24B
const BASE_URL = "https://mi-proyecto-seo-psi.vercel.app";
const API_BASE = "https://web-production-0c2d.up.railway.app";

export default async function handler(req, res) {
  try {
    // Obtener productos reales de la API para generar URLs dinámicas
    const stores = ["sercoplus", "pcimpacto", "memorykings"];
    const categories = [
      "procesadores",
      "tarjetas-video",
      "memorias-ram",
      "almacenamiento",
      "placas-madre"
    ];
    
    const allUrls = [];
    
    // Agregar rutas estáticas
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
    
    // Obtener productos de cada tienda y categoría desde la API
    for (const store of stores) {
      for (const category of categories) {
        try {
          const response = await fetch(
            `${API_BASE}/api/stores/${store}/products?component_type=${category}&limit=5`,
            { timeout: 5000 }
          );
          
          if (response.ok) {
            allUrls.push({
              url: `/productos?store=${store}&category=${category}`,
              priority: "0.8",
              changefreq: "weekly"
            });
          }
        } catch (error) {
          // Si falla la API, aún agregar la URL
          allUrls.push({
            url: `/productos?store=${store}&category=${category}`,
            priority: "0.8",
            changefreq: "weekly"
          });
        }
      }
    }
    
    // Formato W3C Datetime (YYYY-MM-DD)
    const lastmod = new Date().toISOString().split('T')[0];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
    res.status(200).send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
}
