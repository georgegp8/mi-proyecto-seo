/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://mi-proyecto-seo.vercel.app',
  generateRobotsTxt: false, // Ya tenemos robots.txt
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [],
  
  transform: async (config, path) => {
    // Configuración personalizada para cada página
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      }
    }
    
    if (path === '/productos') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      }
    }
    
    if (path === '/contacto') {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      }
    }

    // URLs con parámetros de categoría
    return {
      loc: path,
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }
  },
  
  additionalPaths: async (config) => [
    await config.transform(config, '/productos?category=procesadores'),
    await config.transform(config, '/productos?category=tarjetas-video'),
    await config.transform(config, '/productos?category=memorias-ram'),
    await config.transform(config, '/productos?category=almacenamiento'),
    await config.transform(config, '/productos?category=placas-madre'),
  ],
}
