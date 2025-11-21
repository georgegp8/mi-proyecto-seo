// GUERRA PACHECO GEORGE MIKY -5C24B
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Head>
        <title>Contacto - TechStore Perú | Consultas sobre Componentes de PC</title>
        <meta name="description" content="Contáctanos para consultas sobre componentes de PC. Asesoría personalizada en procesadores, tarjetas de video, RAM y más. Respondemos en 24 horas." />
        <meta name="keywords" content="contacto TechStore, asesoría componentes PC, consultas hardware, soporte técnico Perú" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contacto - TechStore Perú" />
        <meta property="og:description" content="Contáctanos para consultas sobre componentes de PC" />
        <meta property="og:image" content="/images/cocker-spaniel.webp" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contacto - TechStore Perú" />
        <meta name="twitter:description" content="Contáctanos para consultas sobre componentes de PC" />
      </Head>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
        <Link href="/" style={{ textDecoration: "none", color: "#3b82f6", marginBottom: "1rem", display: "inline-block" }}>
          ← Volver al inicio
        </Link>

        <h1 style={{ fontSize: "2.5rem", fontWeight: "900", marginBottom: "1rem" }}>
          Contáctanos 📧
        </h1>
        
        <p style={{ fontSize: "1.125rem", color: "#6b7280", marginBottom: "2rem" }}>
          ¿Tienes dudas sobre qué componente elegir? ¿Necesitas asesoría para armar tu PC? Estamos aquí para ayudarte.
        </p>

        <div style={{ marginBottom: "3rem", padding: "1.5rem", backgroundColor: "#f3f4f6", borderRadius: "8px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1rem" }}>
            Información de Contacto
          </h2>
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>Email:</strong> info@techstore.pe
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>WhatsApp:</strong> +51 999 888 777
          </p>
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>Horario:</strong> Lunes a Sábado, 9:00 AM - 6:00 PM
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
              Nombre:
            </label>
            <input 
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              style={{ 
                width: "100%", 
                padding: "0.75rem", 
                borderRadius: "4px", 
                border: "1px solid #d1d5db",
                fontSize: "1rem"
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
              Email:
            </label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ 
                width: "100%", 
                padding: "0.75rem", 
                borderRadius: "4px", 
                border: "1px solid #d1d5db",
                fontSize: "1rem"
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontWeight: "600", marginBottom: "0.5rem" }}>
              Mensaje:
            </label>
            <textarea 
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
              rows="6"
              style={{ 
                width: "100%", 
                padding: "0.75rem", 
                borderRadius: "4px", 
                border: "1px solid #d1d5db",
                fontSize: "1rem",
                resize: "vertical"
              }}
            />
          </div>

          <button 
            type="submit"
            style={{ 
              width: "100%",
              padding: "1rem", 
              backgroundColor: "#3b82f6", 
              color: "white", 
              borderRadius: "8px", 
              border: "none",
              fontSize: "1.125rem",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Enviar Mensaje
          </button>

          {submitted && (
            <div style={{ 
              marginTop: "1rem", 
              padding: "1rem", 
              backgroundColor: "#d1fae5", 
              color: "#065f46",
              borderRadius: "4px",
              textAlign: "center",
              fontWeight: "600"
            }}>
              ✓ Mensaje enviado correctamente. Te responderemos pronto.
            </div>
          )}
        </form>

        <div style={{ padding: "1.5rem", backgroundColor: "#fef3c7", borderRadius: "8px", borderLeft: "4px solid #f59e0b" }}>
          <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.5rem", color: "#92400e" }}>
            💡 Consejo
          </h3>
          <p style={{ color: "#78350f" }}>
            Antes de contactarnos, explora nuestro catálogo de productos. Comparamos precios de SercoPlus, PCImpacto y MemoryKings para que encuentres las mejores ofertas.
          </p>
        </div>
      </div>
    </>
  );
}
