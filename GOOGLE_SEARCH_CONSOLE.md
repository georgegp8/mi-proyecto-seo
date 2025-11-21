# Google Search Console - Configuración y Validación

## 📋 Checklist de Implementación

### ✅ 1. Sitemap Dinámico Implementado

**Endpoint API creado:** `/api/sitemap`
- Genera sitemap.xml dinámicamente desde la base de datos/API
- Incluye todas las rutas estáticas y dinámicas
- Se actualiza automáticamente cada hora (cache)
- Fetch de productos reales desde las 4 tiendas

**URLs incluidas:**
- Páginas estáticas: `/`, `/productos`, `/contacto`
- Categorías (5): `/productos?category={categoria}`
- Combinaciones tienda+categoría (20): `/productos?store={tienda}&category={categoria}`
- Productos individuales (hasta 200): `/productos?store={tienda}&id={id}`

### ✅ 2. robots.txt Actualizado

Ubicación: `/public/robots.txt`

Contenido:
```
User-agent: *
Allow: /

# Sitemaps
Sitemap: https://mi-proyecto-seo-psi.vercel.app/api/sitemap
Sitemap: https://mi-proyecto-seo-psi.vercel.app/sitemap.xml

# Crawl-delay
Crawl-delay: 1
```

### 📝 3. Validación en Google Search Console

#### Paso 1: Acceder a Google Search Console
1. Ir a: https://search.google.com/search-console
2. Iniciar sesión con tu cuenta de Google

#### Paso 2: Agregar propiedad
1. Click en "Agregar propiedad"
2. Seleccionar "Prefijo de URL"
3. Ingresar: `https://mi-proyecto-seo-psi.vercel.app`

#### Paso 3: Verificar propiedad
**Opción A - Meta tag HTML (Recomendado para Next.js):**
1. Google te dará un meta tag como:
   ```html
   <meta name="google-site-verification" content="TU_CODIGO_AQUI" />
   ```
2. Agregar en `pages/_app.js` o en cada página con `next/head`
3. Ejemplo:
   ```javascript
   import Head from 'next/head';
   
   <Head>
     <meta name="google-site-verification" content="TU_CODIGO_AQUI" />
   </Head>
   ```

**Opción B - Archivo HTML:**
1. Descargar el archivo de verificación
2. Colocar en `/public/google[...].html`
3. Verificar accesible en: `https://tu-dominio.com/google[...].html`

#### Paso 4: Enviar Sitemap
1. En el menú lateral, ir a "Sitemaps"
2. Agregar nueva URL del sitemap:
   - **Sitemap dinámico:** `https://mi-proyecto-seo-psi.vercel.app/api/sitemap`
   - **Sitemap estático:** `https://mi-proyecto-seo-psi.vercel.app/sitemap.xml`
3. Click en "Enviar"

#### Paso 5: Verificar estado
- Esperar 24-48 horas
- Google procesará el sitemap
- Revisar en "Cobertura" las páginas indexadas

### 🔍 Monitoreo y Mantenimiento

#### Verificar Sitemap Funcional
```bash
# En navegador o curl:
https://mi-proyecto-seo-psi.vercel.app/api/sitemap
```

Debe retornar XML válido con:
- Declaración XML
- Namespace correcto
- Todas las URLs con `<loc>`, `<lastmod>`, `<changefreq>`, `<priority>`

#### Validar XML
1. Usar herramientas online:
   - https://www.xml-sitemaps.com/validate-xml-sitemap.html
   - https://xmlvalidation.com/

2. Verificar errores comunes:
   - URLs deben ser absolutas (incluir dominio completo)
   - Caracteres especiales escapados (&amp; en lugar de &)
   - Formato de fecha ISO 8601

### 📊 Métricas a Monitorear

En Google Search Console, revisar:

1. **Cobertura:**
   - Páginas válidas indexadas
   - Páginas con errores
   - Páginas excluidas

2. **Rendimiento:**
   - Impresiones
   - Clics
   - CTR promedio
   - Posición promedio

3. **Experiencia:**
   - Core Web Vitals
   - Usabilidad móvil

4. **Mejoras:**
   - Datos estructurados
   - Breadcrumbs
   - Enlaces internos

### 🚀 Optimizaciones Adicionales

#### 1. Agregar meta tag en todas las páginas
Actualizar `pages/_document.js`:
```javascript
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta name="google-site-verification" content="TU_CODIGO" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

#### 2. Generar sitemap index (si >50k URLs)
Crear `/api/sitemap-index.js` para múltiples sitemaps

#### 3. Ping automático a Google
Agregar webhook que notifique a Google cuando hay nuevos productos:
```
http://www.google.com/ping?sitemap=https://mi-proyecto-seo-psi.vercel.app/api/sitemap
```

### 📱 URLs para Validación Rápida

- **Sitemap dinámico:** https://mi-proyecto-seo-psi.vercel.app/api/sitemap
- **Sitemap estático:** https://mi-proyecto-seo-psi.vercel.app/sitemap.xml
- **Robots.txt:** https://mi-proyecto-seo-psi.vercel.app/robots.txt
- **Google Search Console:** https://search.google.com/search-console

### ✅ Cumplimiento de Requisitos

- [x] Endpoint `/api/sitemap.js` creado
- [x] Genera sitemap con rutas dinámicas desde API/base de datos
- [x] Sitemap agregado en `robots.txt`
- [x] Instrucciones para validar en Google Search Console
- [x] Cache para optimización de rendimiento
- [x] URLs de productos dinámicas basadas en datos reales
- [x] Prioridades y frecuencias de cambio configuradas

### 🎯 Próximos Pasos

1. Desplegar en Vercel
2. Obtener código de verificación de Google Search Console
3. Agregar meta tag de verificación
4. Enviar ambos sitemaps
5. Esperar indexación (24-48 horas)
6. Monitorear métricas semanalmente
