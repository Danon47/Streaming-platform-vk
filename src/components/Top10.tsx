import React, { useEffect, useState } from "react";
import apiClient from "../API/api";
import { Link } from "react-router-dom";
import { MovieProps } from "../utils/MovieProps";

const Top10: React.FC = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        apiClient.get(`/movie/top10`, {
            params: { count: 500 }
        })
            .then(response => setMovies(response.data))
            .catch(error => console.error("Ошибка загрузки фильмов:", error));
    }, []);
    return (
        <div className="top-movies">
            <h2>Топ 10 фильмов</h2>
            <ul className="movies-list">
                {movies.map((movie: MovieProps, index) => (
                    <li key={movie.id} className="movie-item">
                        <div className="movie-rank">{index + 1}</div>
                        <Link to={`/movie/${movie.id}`} className="nav-link">
                        <img src={movie.posterUrl || "../src/assets/404.jpg"} alt={movie.title} className="top-movie-img"/>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Top10
