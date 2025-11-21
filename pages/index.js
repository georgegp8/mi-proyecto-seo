// GUERRA PACHECO GEORGE MIKY -5C24B
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";

const DynamicComponent = dynamic(() => import("../components/LargeComponent"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Mi Sitio Optimizado - Home</title>
        <meta name="description" content="Aprende sobre optimización SEO y rendimiento en Next.js." />
        <meta name="keywords" content="Next.js, SEO, optimización web" />
        <meta property="og:title" content="Mi Sitio Optimizado" />
        <meta property="og:description" content="Descubre técnicas avanzadas para mejorar tu web con Next.js." />
        <meta property="og:image" content="/images/cocker-spaniel.webp" />
        <meta property="og:type" content="website" />
      </Head>

      <h1 style={{ fontSize: "3rem", fontWeight: "900", marginBottom: "1rem" }}>Bienvenido</h1>
      <p style={{ fontSize: "1.25rem", fontWeight: "300", fontStyle: "italic", marginBottom: "1rem" }}>
        Optimización SEO y rendimiento en Next.js
      </p>
      <p style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "2rem" }}>
        Ejemplo de diferentes pesos y tamaños de fuente
      </p>

      <DynamicComponent />
    </>
  );
}
