import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const searchMovies = async () => {
    if (!query) {
      setMessage("Please enter a movie name");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=126017d9`
      );
      const data = await response.json();

      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setMessage("No movies found");
      }
    } catch (error) {
      setMessage("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🎬 Movie Search App</h1>
        <p>Search movies using a third-party API</p>
      </header>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter movie name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies}>Search</button>
      </div>

      {loading && <p className="status">Loading...</p>}
      {message && <p className="status">{message}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.imdbID}>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
