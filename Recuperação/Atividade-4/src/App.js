import React, { useState, useEffect } from 'react';
import './App.css';

// Componente Header
const Header = () => {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`header ${showBackground ? 'header-black' : ''}`}>
      <div className="header-content">
        <div className="header-left">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
            alt="Netflix" 
            className="netflix-logo"
          />
          <nav className="header-nav">
            <a href="#home">Início</a>
            <a href="#series">Séries</a>
            <a href="#movies">Filmes</a>
            <a href="#recent">Recentes</a>
            <a href="#list">Minha Lista</a>
          </nav>
        </div>
        <div className="header-right">
          <div className="search-icon">🔍</div>
          <div className="notifications">🔔</div>
          <div className="profile">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente Hero Section
const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Stranger Things</h1>
        <p className="hero-description">
          Quando um garoto desaparece, a cidade toda participa das buscas. 
          Mas o que encontram são segredos, forças sobrenaturais e uma menina.
        </p>
        <div className="hero-buttons">
          <button className="play-button">
            ▶️ Reproduzir
          </button>
          <button className="info-button">
            ℹ️ Mais Informações
          </button>
        </div>
      </div>
      <div className="hero-fade"></div>
    </div>
  );
};

// Componente Row de Filmes/Séries
const MovieRow = ({ title, movies, isLargeRow = false }) => {
  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-posters">
        {movies.map((movie, index) => (
          <img
            key={index}
            className={`row-poster ${isLargeRow ? 'row-poster-large' : ''}`}
            src={movie.poster}
            alt={movie.title}
          />
        ))}
      </div>
    </div>
  );
};

// Componente Principal
const App = () => {
  const [movies, setMovies] = useState({
    netflixOriginals: [],
    trendingNow: [],
    topRated: [],
    actionMovies: [],
    comedyMovies: [],
    horrorMovies: [],
    romanceMovies: [],
    documentaries: []
  });

  // Dados mockados para demonstração
  useEffect(() => {
    const mockMovies = {
      netflixOriginals: [
        { title: "Stranger Things", poster: "https://image.tmdb.org/t/p/original/49WJfeN0moxb9IPfGn8AIqMGskD.jpg" },
        { title: "The Crown", poster: "https://image.tmdb.org/t/p/original/1M876Kj8VfK5M2y8YdQzqJZz8Qz.jpg" },
        { title: "Ozark", poster: "https://image.tmdb.org/t/p/original/mi4y5YwLz8X8Y8Y8Y8Y8Y8Y8Y8Y8.jpg" },
        { title: "The Witcher", poster: "https://image.tmdb.org/t/p/original/7vjaCdMw15FEbXyLQTVa04URsPm.jpg" },
        { title: "Bridgerton", poster: "https://image.tmdb.org/t/p/original/neMp82qR3B4uwk4O1gW6W6M6Q6M.jpg" }
      ],
      trendingNow: [
        { title: "Squid Game", poster: "https://image.tmdb.org/t/p/original/dDlEmu3EZ0Pgg93E1Tu7ljfNac.jpg" },
        { title: "Money Heist", poster: "https://image.tmdb.org/t/p/original/reEMJA1HymGMMAd6Q4j1c6Ralyl.jpg" },
        { title: "Dark", poster: "https://image.tmdb.org/t/p/original/5myQbDzw3l8K9yofUXRJ4UTVgam.jpg" },
        { title: "Lupin", poster: "https://image.tmdb.org/t/p/original/rsjwjVqwP0V7oZ8T4ijSQAuV8dl.jpg" },
        { title: "The Queen's Gambit", poster: "https://image.tmdb.org/t/p/original/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg" }
      ],
      topRated: [
        { title: "Breaking Bad", poster: "https://image.tmdb.org/t/p/original/ggFHVNu6YYI5L9pCfOacjizRGt.jpg" },
        { title: "Game of Thrones", poster: "https://image.tmdb.org/t/p/original/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg" },
        { title: "The Sopranos", poster: "https://image.tmdb.org/t/p/original/rTc7ZXdroqjkKivFPvCPX0Ru7uw.jpg" },
        { title: "The Wire", poster: "https://image.tmdb.org/t/p/original/4lbclFySvugI51fwsFq0Rl3Hly.jpg" },
        { title: "Better Call Saul", poster: "https://image.tmdb.org/t/p/original/fC2HDm5t2kHl0MZgo2oDBZ7XvjU.jpg" }
      ],
      actionMovies: [
        { title: "Extraction", poster: "https://image.tmdb.org/t/p/original/wlfDxbGEsW58vGhDmuYxTb3gVQT.jpg" },
        { title: "6 Underground", poster: "https://image.tmdb.org/t/p/original/lnWkyG3LLgbbrIEeylXYmIvl8L.jpg" },
        { title: "The Old Guard", poster: "https://image.tmdb.org/t/p/original/qFmvre1y0eTOUj5yZ8Y6Qj1Br4v.jpg" },
        { title: "Project Power", poster: "https://image.tmdb.org/t/p/original/TnOeov4w0sTtV2gqICqIxUg74s.jpg" },
        { title: "Spenser Confidential", poster: "https://image.tmdb.org/t/p/original/7BWVN07h3b2S2Vrbs6p6P3nULwq.jpg" }
      ],
      comedyMovies: [
        { title: "The Good Place", poster: "https://image.tmdb.org/t/p/original/eFV1OS5YjwY8AQvzBOGj6pEj8o.jpg" },
        { title: "Brooklyn Nine-Nine", poster: "https://image.tmdb.org/t/p/original/4lS5x4m7GqG5f5f5f5f5f5f5f5f5f.jpg" },
        { title: "The Office", poster: "https://image.tmdb.org/t/p/original/7DJKHzAiZS2H2kf5y4p7p7p7p7p7.jpg" },
        { title: "Friends", poster: "https://image.tmdb.org/t/p/original/f496cm9enuEsZkSPzCwnTESEK5s.jpg" },
        { title: "Parks and Recreation", poster: "https://image.tmdb.org/t/p/original/2Z5Zlrp8cNxkh5ByyZ8irvrkXVZ.jpg" }
      ]
    };
    setMovies(mockMovies);
  }, []);

  return (
    <div className="app">
      <Header />
      <HeroSection />
      
      <div className="content">
        <MovieRow 
          title="Originais Netflix" 
          movies={movies.netflixOriginals} 
          isLargeRow={true}
        />
        <MovieRow 
          title="Em Alta" 
          movies={movies.trendingNow}
        />
        <MovieRow 
          title="Mais Votados" 
          movies={movies.topRated}
        />
        <MovieRow 
          title="Filmes de Ação" 
          movies={movies.actionMovies}
        />
        <MovieRow 
          title="Comédias" 
          movies={movies.comedyMovies}
        />
      </div>
    </div>
  );
};

export default App;
