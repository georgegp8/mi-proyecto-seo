// GUERRA PACHECO GEORGE MIKY -5C24B
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Contáctanos
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ¿Tienes dudas sobre qué componente elegir? ¿Necesitas asesoría para armar tu PC? Estamos aquí para ayudarte.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Información de Contacto */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl">
              <h2 className="text-3xl font-black mb-6">Información de Contacto</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-bold text-lg">Email</p>
                    <p className="text-purple-100">info@techstore.pe</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-bold text-lg">WhatsApp</p>
                    <p className="text-purple-100">+51 999 888 777</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <svg className="w-6 h-6 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-bold text-lg">Horario</p>
                    <p className="text-purple-100">Lunes a Sábado</p>
                    <p className="text-purple-100">9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-purple-100">
                  Tiempo de respuesta promedio: <span className="font-bold text-white">24 horas</span>
                </p>
              </div>
            </div>

            {/* Formulario */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Envíanos un mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre completo
                  </label>
                  <input 
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mensaje
                  </label>
                  <textarea 
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  Enviar Mensaje
                </button>

                {submitted && (
                  <div className="bg-green-50 border-2 border-green-500 text-green-800 px-6 py-4 rounded-xl text-center font-semibold animate-pulse">
                    ✓ Mensaje enviado correctamente. Te responderemos pronto.
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Consejo */}
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-8 shadow-xl">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="text-white">
                <h3 className="text-2xl font-black mb-2">Consejo</h3>
                <p className="text-amber-50 leading-relaxed">
                  Antes de contactarnos, explora nuestro catálogo de productos. Comparamos precios de SercoPlus, PCImpacto y MemoryKings para que encuentres las mejores ofertas.
                </p>
                <Link 
                  href="/productos"
                  className="inline-block mt-4 px-6 py-3 bg-white text-orange-600 rounded-full font-bold hover:scale-105 transform transition-all duration-300 shadow-lg"
                >
                  Ver Productos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
