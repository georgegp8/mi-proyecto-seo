// GUERRA PACHECO GEORGE MIKY -5C24B
const BASE_URL = "https://mi-proyecto-seo-psi.vercel.app";
const API_BASE = "https://web-production-0c2d.up.railway.app";

export default async function handler(req, res) {
  try {
    // Rutas estáticas
    const staticUrls = ["/", "/productos", "/contacto"];
    
    // Categorías de productos para el sitemap
    const categories = [
      "procesadores",
      "tarjetas-video",
      "memorias-ram",
      "almacenamiento",
      "placas-madre"
    ];
    
    // Tiendas disponibles
    const stores = ["sercoplus", "pcimpacto", "memorykings"];
    
    // Generar URLs dinámicas para cada combinación de tienda y categoría
    const dynamicUrls = [];
    for (const store of stores) {
      for (const category of categories) {
        dynamicUrls.push(`/productos?store=${store}&category=${category}`);
      }
    }
    
    // Combinar todas las URLs
    const allUrls = [...staticUrls, ...dynamicUrls];
    
    // Formato W3C Datetime (YYYY-MM-DD)
    const lastmod = new Date().toISOString().split('T')[0];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
      .map(
        (url) =>
          `  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${url === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${url === '/' ? '1.0' : '0.8'}</priority>
  </url>`
      )
      .join("\n")}
</urlset>`;

    res.setHeader("Content-Type", "text/xml; charset=UTF-8");
    res.status(200).send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
}
