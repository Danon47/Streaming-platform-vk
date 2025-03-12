import { useState, useEffect } from 'react';
import apiClient from '../../API/api';
import { MovieProps } from '../../utils/MovieProps';
import formatRating from '../../utils/FormatRating';
import { Link } from 'react-router-dom';
import './SearchInput.css'

const SearchInput = () => {
    const [query, setQuery] = useState(''); 
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }

        const fetchMovies = async () => {
            try {
                const response = await apiClient.get(`/movie`, { params: { title: query, count: 5 }}); 
                setResults(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке фильмов:', error);
            }
        };

        fetchMovies();
    }, [query]);

    const clearSearch = () => {
        setQuery('');
        setResults([]);
    };

    const getRatingColor = (rating: number) => {
        if (rating >= 8) return '#A59400';
        if (rating >= 7) return '#308E21';
        if (rating >= 6) return '#777777';
        return '#C82020';
    };

    return (
        <div className="search-container">
            <div className="search-input-container">
                <img
                    src="../../assets/search.svg"
                    alt="Search"
                    className="search-icon"
                />
                <input
                    type="text"
                    placeholder="Поиск фильмов..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                />
                {query && (
                    <img
                        src="../src/assets/closebttn.svg"
                        alt="Clear"
                        className="clear-icon"
                        onClick={clearSearch}
                    />
                )}
            </div>

            {results.length > 0 && (
                <div className="dropdown-results">
                    {results.map((movie: MovieProps) => {
                        const hours = Math.floor(movie.runtime / 60);
                        const minutes = movie.runtime % 60;

                        const ratingColor = getRatingColor(movie.tmdbRating);

                        return (
                            <Link to={`/movie/${movie.id}`} key={movie.id}>
                                <div key={movie.id} className="movie-card">
                                    <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
                                    <div>
                                        <div className="movie-inf-mini">
                                            <span className="rating-mini" style={{ backgroundColor: ratingColor }}>
                                                {formatRating(movie.tmdbRating)}
                                            </span>
                                            <span className="span-gray-mini">{movie.relaseYear}</span>
                                            <span className="span-gray-mini">{movie.genres.join(', ')}</span>
                                            <span className="span-gray-mini">{`${hours} ч ${minutes} мин`}</span>
                                        </div>
                                        <div>
                                            <h1 className="main-inf-mini">{movie.title}</h1>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SearchInput;
