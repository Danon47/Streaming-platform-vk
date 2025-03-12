import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link, useParams } from 'react-router-dom';
import apiClient from '../../API/api';
import { MovieProps } from '../../utils/MovieProps';
import GENRE_TRANSLATIONS from '../../utils/Translations';
import './GenreMovies.css'

const GenreMovies: React.FC = () => {
    const genre = useParams().name;
    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [limit, setLimit] = useState(15);

    useEffect(() => {
        const fetchMoviesByGenre = async () => {
            try {
                const response = await apiClient.get(`/movie`, {
                    params: { genre: genre }
                });
                console.error(response);
                setMovies(response.data);
            } catch (error) {
                console.error("Ошибка загрузки фильмов:", error);
            }
        };

        fetchMoviesByGenre();
    }, [genre]);

    const showMore = () => {
        setLimit(prevLimit => prevLimit + 15);
    };

    return (
        <div>
            < Header />
            <main>
                <Link to="/genres">
                    <h1 className='genre'>{GENRE_TRANSLATIONS[genre as string]}</h1>
                </Link>
                {movies.length === 0 ? (
                    <p>Фильмы не найдены</p>
                ) : (
                    <>
                        <ul className="movies-list">
                            {movies.slice(0, limit).map((movie: MovieProps) => (
                                <li key={movie.id} className="movie-item">
                                    <Link to={`/movie/${movie.id}`} className="nav-link">
                                        <img src={movie.posterUrl || "../src/assets/404.jpg"} alt={movie.title} className="top-movie-img" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {movies.length > limit && (
                            <div className='show-more-div'>
                                <button onClick={showMore}>
                                    Показать ещё
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default GenreMovies;