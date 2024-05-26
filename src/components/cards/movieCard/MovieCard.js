import React from "react";
import "./MovieCard.css";
import upArrow from "../.././../assets/up-arrow.png";
import downArrow from "../.././../assets/down-arrow.png";

const MovieCard = ({
  title,
  genre,
  director,
  stars,
  language,
  totalVoted,
  views,
  poster,
}) => {
  return (
    <div className="movie-card-outer-containe">
      <div className="movie-card-body">
        <div className="movie-card-left-section">
          <div className="movie-card-vote">
            <div className="arrow-container">
              <img src={upArrow} alt="vote-up-arrow-icon" />
            </div>
            <div>{totalVoted}</div>
            <div className="arrow-container">
              <img src={downArrow} alt="vote-down-arrow-icon" />
            </div>
          </div>
          <div className="movie-card-vote-text">
            <p>Vote</p>
          </div>
        </div>
        <div className="movie-card-right-section">
          <div className="movie-card-image-container">
            <img src={poster} alt={`movie-image`} />
          </div>
          <div className="movie-card-movie-info">
            <h2>{title}</h2>
            <div className="movie-card-movie-info-body">
              <p>
                <span>Genre: </span>
                {genre}
              </p>
              <p>
                <span>Director: </span>
                {director?.join(", ")}
              </p>
              <p>
                <span>Starting:</span>
                {stars[0].split(",")?.length > 1
                  ? stars[0].split(",").slice(1, 2)
                  : stars[0]}
              </p>
              <p>Mains | {language} | 2 Apr</p>
              <p className="card-vote-text-color">
                {views} views | Voted by {totalVoted} People
              </p>
            </div>
          </div>
        </div>
      </div>
      <button className="movie-card-btn">Watch Trailer</button>
    </div>
  );
};

export default MovieCard;
