// GUERRA PACHECO GEORGE MIKY -5C24B
// Forzar sitemap como XML con Content-Type correcto

export async function getServerSideProps({ res }) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mi-proyecto-seo-psi.vercel.app/</loc>
    <lastmod>2025-11-21</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://mi-proyecto-seo-psi.vercel.app/productos</loc>
    <lastmod>2025-11-21</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://mi-proyecto-seo-psi.vercel.app/productos?category=procesadores</loc>
    <lastmod>2025-11-21</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mi-proyecto-seo-psi.vercel.app/productos?category=tarjetas-video</loc>
    <lastmod>2025-11-21</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mi-proyecto-seo-psi.vercel.app/productos?category=memorias-ram</loc>
    <lastmod>2025-11-21</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mi-proyecto-seo-psi.vercel.app/productos?category=almacenamiento</loc>
    <lastmod>2025-11-21</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mi-proyecto-seo-psi.vercel.app/productos?category=placas-madre</loc>
    <lastmod>2025-11-21</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://mi-proyecto-seo-psi.vercel.app/contacto</loc>
    <lastmod>2025-11-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}
