import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import logoImg from './assets/logo3.jpg'; 

const App = () => {
  const [isAdultMode, setIsAdultMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null); 

  const kidsStories = [
    { 
      id: 1, title: "Cenicienta", icon: "👠", genre: "Fantasía",
      text: "Había una vez una joven llamada Cenicienta, cuya bondad superaba cualquier maldad. Con la ayuda de su Hada Madrina, transformó una calabaza en carruaje. En el baile, cautivó al príncipe, pero al sonar las doce, huyó dejando atrás un zapato de cristal. El príncipe recorrió el reino probando el zapato, hasta que llegó a Cenicienta. El zapato encajó perfectamente, y vivieron felices por siempre." 
    },
    { 
      id: 2, title: "El Ratón Pérez", icon: "🐭", genre: "Aventura",
      text: "En una pequeña caja de galletas vivía el Ratón Pérez. Cada vez que a un niño se le caía un diente, Pérez emprendía una aventura nocturna esquivando gatos. Una noche, un niño llamado Leo se quedó despierto para verlo. Pérez, usando su polvo de estrellas, hizo que Leo tuviera un sueño profundo para poder cambiar el diente por una moneda de oro." 
    },
    { 
      id: 3, title: "Caperucita Roja", icon: "🐺", genre: "Fábula",
      text: "Caperucita caminaba por el bosque con una cesta de pasteles. Un lobo astuto la engañó para tomar el camino largo. Cuando Caperucita llegó a la casa, el lobo estaba disfrazado de abuelita. Por suerte, un valiente cazador escuchó los gritos y rescató a ambas, enseñando a Caperucita a no confiar en extraños en el bosque." 
    },
    { 
      id: 4, title: "Pedro, el Conejo", icon: "🐰", genre: "Aventura",
      text: "Pedro era un conejo rebelde que entró al jardín del señor McGregor. Tras comer demasiados rábanos, McGregor lo persiguió con un rastrillo. Pedro perdió su chaqueta azul y sus zapatos, pero logró escapar por debajo de la valla justo a tiempo. Esa noche, su madre le dio una tila para el susto mientras sus hermanos cenaban moras." 
    },
    { 
      id: 5, title: "Pinocho", icon: "🤥", genre: "Fantasía",
      text: "Gepetto talló a Pinocho y el Hada Azul le dio vida. Cada vez que mentía, su nariz crecía. Tras muchas aventuras y salvar a su padre de una ballena, Pinocho demostró que era valiente y sincero. El Hada lo transformó en un niño de carne y hueso, premiando su sacrificio y su corazón puro." 
    },
    { 
      id: 6, title: "Blancanieves", icon: "🍎", genre: "Fantasía",
      text: "Blancanieves huyó de una reina envidiosa y encontró una casita con siete enanitos. La reina la engañó con una manzana envenenada, pero el beso de un príncipe rompió el hechizo. Blancanieves despertó y los enanitos celebraron con música, mientras la malvada reina desapareció para siempre del reino." 
    },
  ];

  const adultStories = [
    { 
      id: 8, title: "El almohadón de plumas", author: "Horacio Quiroga", icon: "🪶", genre: "Terror",
      text: "Alicia y Jordán vivían en una casa fría. Alicia enfermó de una anemia inexplicable que la consumía de noche. Tras su muerte, descubrieron manchas de sangre en su almohada. Al abrirla, hallaron un parásito monstruoso que le había succionado la vida cada noche. El horror se ocultaba en la suavidad de las plumas." 
    },
    { 
      id: 9, title: "El corazón delator", author: "Edgar Allan Poe", icon: "🫀", genre: "Terror",
      text: "Un hombre asesina a un anciano y oculta el cuerpo bajo el suelo. Cuando llega la policía, él se siente seguro, pero empieza a escuchar un latido. El sonido crece hasta volverse ensordecedor. Desesperado por el ruido de su propia culpa, confiesa el crimen gritando que es el latido del corazón del muerto." 
    },
    { 
      id: 10, title: "La continuidad de los parques", author: "Julio Cortázar", icon: "🛋️", genre: "Realismo",
      text: "Un hombre lee una novela sobre dos amantes que planean un crimen. El amante entra en una casa, sube las escaleras y llega a un estudio donde un hombre está leyendo una novela sentado en un sillón verde. La realidad y la ficción se unen en un círculo mortal en el último párrafo." 
    },
    { 
      id: 11, title: "El Aleph", author: "Jorge Luis Borges", icon: "🌌", genre: "Ficción",
      text: "En un sótano de Buenos Aires, un hombre encuentra el Aleph: un punto donde se ve todo el universo al mismo tiempo. Ve mares, desiertos y millones de rostros. Es la eternidad contenida en un solo rincón oscuro, demostrando que el infinito puede caber en un espacio pequeño." 
    },
    { 
      id: 12, title: "El mundo es un mar de fueguitos", author: "Eduardo Galeano", icon: "🔥", genre: "Relato",
      text: "El mundo es un mar de fueguitos. Cada persona brilla con luz propia. Hay fuegos grandes, chicos y de todos los colores. Hay gente de fuego sereno y gente de fuego loco que llena el aire de chispas. Algunos fuegos no alumbran, pero otros arden la vida con tantas ganas que es imposible mirarlos sin parpadear." 
    },
  ];

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
      <nav className="navbar">
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
                <p className="story-desc">
                  {story.text.substring(0, 80)}...
                </p>
                <button className="read-button" onClick={() => setSelectedStory(story)}>
                  Leer ahora
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {selectedStory && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStory(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal" onClick={() => setSelectedStory(null)}>×</button>
              <div className="modal-header-info">
                <span className="modal-icon">{selectedStory.icon}</span>
                <h2>{selectedStory.title}</h2>
                {selectedStory.author && <h4 className="modal-author">{selectedStory.author}</h4>}
              </div>
              <p className="modal-full-text">{selectedStory.text}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer id="sobre-nosotros" className="footer-section">
        <h3>Sobre Nosotros</h3>
        <p>Somos una biblioteca digital creada para fomentar la lectura en todas las edades.</p>
        <div className="footer-bottom">
          <p>© 2024 Mi Proyecto de Cuentos - Todos los derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};

export default App;