import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              TechStore
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-purple-600 font-semibold transition-colors duration-300"
            >
              Inicio
            </Link>
            <Link
              href="/productos"
              className="text-gray-700 hover:text-purple-600 font-semibold transition-colors duration-300"
            >
              Productos
            </Link>
            <Link
              href="/contacto"
              className="text-gray-700 hover:text-purple-600 font-semibold transition-colors duration-300"
            >
              Contacto
            </Link>
            <Link
              href="/productos"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:scale-105 transform transition-all duration-300 shadow-lg"
            >
              Ver Ofertas
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/productos"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Productos
            </Link>
            <Link
              href="/contacto"
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-purple-50 hover:text-purple-600 font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
