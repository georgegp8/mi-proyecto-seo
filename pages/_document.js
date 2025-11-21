import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* Google Site Verification - Agregar código cuando lo obtengas de Search Console */}
        {/* <meta name="google-site-verification" content="TU_CODIGO_AQUI" /> */}
        
        {/* Preconnect para mejorar performance */}
        <link rel="preconnect" href="https://web-production-0c2d.up.railway.app" />
        <link rel="dns-prefetch" href="https://web-production-0c2d.up.railway.app" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
