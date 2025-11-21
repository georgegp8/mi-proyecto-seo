// GUERRA PACHECO GEORGE MIKY -5C24B
const BASE_URL = "https://mi-proyecto-seo-psi.vercel.app";

export default async function handler(req, res) {
  try {
    // Tiendas y categorías
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
    
    // Agregar URLs por categoría
    for (const category of categories) {
      allUrls.push({
        url: `/productos?category=${category}`,
        priority: "0.8",
        changefreq: "daily"
      });
    }
    
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
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
      .map(
        (item) =>
          `  <url>
    <loc>${BASE_URL}${item.url.replace(/&/g, '&amp;')}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
      )
      .join("\n")}
</urlset>`;

    res.setHeader("Content-Type", "text/xml; charset=UTF-8");
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
    res.status(200).send(sitemap);
  } catch (error) {
    console.error("Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
}
