import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
/* --- NUEVO: Importamos el logo aquí --- */
/* Asegúrate de que la extensión (.webp o .png) coincida con tu archivo real */
import logoImg from './assets/logo3.jpg'; 

const App = () => {
  const [isAdultMode, setIsAdultMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);

  const kidsStories = [
    { id: 1, title: "Cenicienta", text: "Una joven que, con ayuda de su hada madrina, asiste al baile real.", icon: "👠", genre: "Fantasía" },
    { id: 2, title: "El Ratón Pérez", text: "El pequeño ratón que cambia dientes por tesoros bajo la almohada.", icon: "🐭", genre: "Aventura" },
    { id: 3, title: "Caperucita Roja", text: "Una niña que atraviesa el bosque para visitar a su abuelita.", icon: "🐺", genre: "Fábula" },
    { id: 4, title: "Pedro, el Conejo", text: "Las aventuras de un conejo travieso en el jardín de Mr. McGregor.", icon: "🐰", genre: "Aventura" },
    { id: 5, title: "Pinocho", text: "Un títere de madera que sueña con ser un niño de verdad.", icon: "🤥", genre: "Fantasía" },
    { id: 6, title: "Blancanieves", text: "La princesa más bella que encuentra refugio con siete enanitos.", icon: "🍎", genre: "Fantasía" },
  ];

  const adultStories = [
    { 
      id: 8, 
      title: "El almohadón de plumas", 
      author: "Horacio Quiroga", 
      text: "Un relato de horror sobre una enfermedad misteriosa.", 
      icon: "🪶", 
      genre: "Terror" 
    },
    { 
      id: 9, 
      title: "El corazón delator", 
      author: "Edgar Allan Poe", 
      text: "La angustiante confesión de un hombre perseguido por la culpa.", 
      icon: "🫀", 
      genre: "Terror" 
    },
    { 
      id: 10, 
      title: "La continuidad de los parques", 
      author: "Julio Cortázar", 
      text: "Un hombre lee una novela sin saber que él es parte de la trama.", 
      icon: "🛋️", 
      genre: "Realismo" 
    },
    // --- NUEVOS CUENTOS AÑADIDOS ---
    { 
      id: 11, 
      title: "El Aleph", 
      author: "Jorge Luis Borges", 
      text: "Un punto en el espacio que contiene todo el universo simultáneamente.", 
      icon: "🌌", 
      genre: "Ficción" 
    },
    { 
      id: 12, 
      title: "El mundo es un mar de fueguitos", 
      author: "Eduardo Galeano", 
      text: "Cada persona brilla con luz propia entre todas las demás. No hay dos fuegos iguales.", 
      icon: "🔥", 
      genre: "Relato" 
    },
  ];

  // Lógica de búsqueda y favoritos
  const currentStories = isAdultMode ? adultStories : kidsStories;
  const filteredStories = currentStories.filter(story => 
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]);
  };

  return (
    <div className={`app-container ${isAdultMode ? 'adult-theme' : 'kids-theme'}`}>
      {/* --- NAVEGACIÓN CON LOGO --- */}
      <nav className="navbar">
        {/* NUEVO: Contenedor para el logo y el nombre del sitio */}
        <div className="nav-brand">
          <img src={logoImg} alt="Logo Mundo Imaginario" className="nav-logo" />
          <span className="site-name">Mundo Imaginario</span>
        </div>

        <div className="nav-links">
          <a href="#generos">Géneros</a>
          <a href="#favoritos">Favoritos ({favorites.length})</a>
          <a href="#sobre-nosotros">Sobre Nosotros</a>
        </div>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Buscar cuento o género..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </nav>

      <header className={isAdultMode ? 'adult-header' : 'kids-header'}>
        <h1 className="main-title">{isAdultMode ? "Biblioteca Nocturna" : "Mis Cuentos Favoritos"}</h1>
        <button className="toggle-button" onClick={() => setIsAdultMode(!isAdultMode)}>
          {isAdultMode ? "Cambiar a Modo Niños 🧸" : "Sección Adultos 🍷"}
        </button>
      </header>

      <main className="content">
        <h2 className="section-subtitle">
          {searchTerm ? `Resultados para: "${searchTerm}"` : (isAdultMode ? "Grandes Autores" : "¡Había una vez...!")}
        </h2>

        <div className="stories-grid">
          <AnimatePresence mode="wait">
            {filteredStories.map((story) => (
              <motion.div 
                key={story.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={isAdultMode ? 'adult-card' : 'kids-card'}
              >
                <div className="card-header-actions">
                  <span className="genre-badge">{story.genre}</span>
                  <button 
                    className={`fav-btn ${favorites.includes(story.id) ? 'active' : ''}`}
                    onClick={() => toggleFavorite(story.id)}
                  >
                    {favorites.includes(story.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className="card-icon">{story.icon}</div>
                <h3>{story.title}</h3>
                {story.author && <p className="author-name">{story.author}</p>}
                <p className="story-desc">{story.text}</p>
                <button className="read-button">Leer ahora</button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* --- SECCIÓN SOBRE NOSOTROS --- */}
      <footer id="sobre-nosotros" className="footer-section">
        <h3>Sobre Nosotros</h3>
        <p>Somos una biblioteca digital creada para fomentar la lectura en todas las edades. Desde cuentos mágicos para los más pequeños hasta clásicos inolvidables para adultos.</p>
        <div className="footer-bottom">
          <p>© 2024 Mi Proyecto de Cuentos - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default App;