// GUERRA PACHECO GEORGE MIKY -5C24B
// pages/sitemap.xml.js

const BASE_URL = "https://mi-proyecto-seo-psi.vercel.app";

function generateSitemap() {
  const stores = ["computershop", "cyccomputer", "pcimpacto", "sercoplus"];
  const categories = [
    "procesadores",
    "tarjetas-video",
    "memorias-ram",
    "almacenamiento",
    "placas-madre",
  ];

  const allUrls = [];

  // Rutas estáticas
  allUrls.push({ url: "/", priority: "1.0", changefreq: "daily" });
  allUrls.push({ url: "/productos", priority: "0.9", changefreq: "daily" });
  allUrls.push({ url: "/contacto", priority: "0.7", changefreq: "monthly" });

  // Por categoría
  for (const category of categories) {
    allUrls.push({
      url: `/productos?category=${category}`,
      priority: "0.8",
      changefreq: "daily",
    });
  }

  // Tienda + categoría
  for (const store of stores) {
    for (const category of categories) {
      allUrls.push({
        url: `/productos?store=${store}&category=${category}`,
        priority: "0.7",
        changefreq: "weekly",
      });
    }
  }

  const lastmod = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${BASE_URL}${item.url.replace(/&/g, "&amp;")}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return xml;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSitemap();

  res.setHeader("Content-Type", "application/xml; charset=UTF-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=604800"
  );
  res.write(sitemap);
  res.end();

  return { props: {} };
}

// No renderiza nada en React; solo sirve para que Next no falle
export default function SiteMap() {
  return null;
}
