import "./Movies.css";
import React, { useEffect, useState } from "react";
import MovieCard from "../cards/movieCard/MovieCard";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNetwrokError, setIsNetwrokError] = useState(false);
  const [movieFilters, setMovieFiters] = useState({
    language: "kannada",
  });

  useEffect(() => {
    setIsLoading(true);
    fetch("https://hoblist.com/api/movieList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: "movies",
        language: movieFilters.language,
        genre: "all",
        sort: "voting",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.result);
        setIsLoading(false);
        setIsNetwrokError(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsNetwrokError(true);
        console.error("Error:", error);
      });
  }, [movieFilters.language]);

  return (
    <div className="movies-outer-container">
      <div className="movies-inner-container">
        <h2>Movies List</h2>
        <div className="movies-filters">
          <div className="wrapper">
            <label for="language">Language: </label>
            <select
              id="language"
              onChange={(e) => {
                setMovieFiters((prev) => {
                  return {
                    ...prev,
                    language: e.target.value,
                  };
                });
              }}
            >
              <option valu="kannada">Kannada</option>
              <option value="hindi">Hindi</option>
              <option value="bengali">Bengali</option>
              <option value="tamil">Tamil</option>
            </select>
          </div>
        </div>
        {isLoading ? (
          "Loading..."
        ) : isNetwrokError ? (
          <h2 style={{ color: "red" }}>
            Unable to fetch data, refresh the page
          </h2>
        ) : movies?.length > 0 ? (
          <div className="Movies-list-container">
            {movies?.map((movie, index) => {
              return (
                <MovieCard
                  key={index}
                  title={movie.title}
                  genre={movie.genre}
                  director={movie.director}
                  stars={movie.stars}
                  language={movie.language}
                  totalVoted={movie.totalVoted}
                  views={movie.pageViews}
                  poster={movie.poster}
                />
              );
            })}
          </div>
        ) : (
          "no data found"
        )}
      </div>
    </div>
  );
}

export default Movies;
