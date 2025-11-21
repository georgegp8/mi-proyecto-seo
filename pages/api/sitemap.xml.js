export default function handler(req, res) {
  const baseUrl = 'https://mi-proyecto-seo.vercel.app';
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>2025-11-21</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/productos</loc>
    <lastmod>2025-11-21</lastmod>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/contacto</loc>
    <lastmod>2025-11-21</lastmod>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/productos?category=procesadores</loc>
    <lastmod>2025-11-21</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/productos?category=tarjetas-video</loc>
    <lastmod>2025-11-21</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/productos?category=memorias-ram</loc>
    <lastmod>2025-11-21</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/productos?category=almacenamiento</loc>
    <lastmod>2025-11-21</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/productos?category=placas-madre</loc>
    <lastmod>2025-11-21</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>`;

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.status(200).send(sitemap);
}
