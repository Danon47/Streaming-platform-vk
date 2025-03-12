
import { FC, useEffect, useState } from "react";
import { MovieProps } from "../../utils/MovieProps";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../API/api";
import formatRating from "../../utils/FormatRating";
import AuthModal from "../Authorization/Authorization";
import TrailerModal from "../Trailer/Trailer";
import './MovieCard.css'

interface Movie {
  movie: MovieProps;
  setMovie: React.Dispatch<React.SetStateAction<MovieProps | null>>;
}

const MovieCard: FC<Movie> = ({ movie, setMovie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const checkIfFavorite = async () => {
      try {
        const response = await apiClient.get("/favorites", {
          withCredentials: true,
        });
        const favorites = response.data;
        const isMovieInFavorites = favorites.some(
          (favMovie: MovieProps) => favMovie.id === movie.id
        );
        setIsFavorite(isMovieInFavorites);
      } catch (error) {
        console.error("Ошибка при проверке избранного:", error);
      }
    };

    checkIfFavorite();
  }, [movie.id]);

  const handleToggleFavorite = async () => {
    try {

      if (isFavorite) {
        await apiClient.delete(`/favorites/${movie.id}`, {
          withCredentials: true,
        });
      } else {
        await apiClient.post(
          "/favorites",
          { id: movie.id.toString() },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            withCredentials: true,
          }
        );
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Ошибка при изменении статуса избранного:", error);
        setIsAuthModalOpen(true); // Показываем модальное окно, если пользователь не авторизован
      
    }
  };

    const handleRefresh = () => {
      apiClient.get('/movie/random')
          .then((response) => setMovie(response.data))
          .catch((error) => console.error("Ошибка загрузки нового фильма:", error));
  };

  const handleNavigate = () => {
    navigate(`/movie/${movie.id}`);
};

  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;

  const ratingColor =
    movie.tmdbRating >= 8
      ? "#A59400"
      : movie.tmdbRating >= 7
      ? "#308E21"
      : movie.tmdbRating >= 6
      ? "#777777"
      : "#C82020";

  return (
    <div className="main-wrapper">
      <div className="left-wrap">
        <div className="movie-inf">
          <span className="rating" style={{ backgroundColor: ratingColor }}>
            {formatRating(movie.tmdbRating)}
            </span>
          <span className="span-gray">{movie.relaseYear}</span>
          <span className="span-gray">{movie.genres.join(', ')}</span>
          <span className="span-gray">{`${hours} ч ${minutes} мин`}</span>
        </div>
        <div className="main-inf">
          <h1>{movie.title}</h1>
          <p>{movie.plot}</p>
        </div>
        <div className="bttn-wrapper">
          <TrailerModal movie={movie} />
          {isHomePage && (
            <button onClick={handleNavigate} className="about-button">О фильме</button>
          )}
          <button onClick={handleToggleFavorite} className={isFavorite ? 'fav-button active' : 'fav-button'}/>
            {isHomePage && (
            <button onClick={handleRefresh} className="change-button"/>
            )}
        </div>
      </div>
      <img src={movie.posterUrl || "../src/assets/404.jpg"} alt={movie.title} className="movie-img"/>
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={() => {
            setIsAuthModalOpen(false);
            handleToggleFavorite();
          }}
        />
      )}
    </div>
  )
}

export default MovieCard

