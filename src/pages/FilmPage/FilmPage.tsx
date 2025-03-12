import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import apiClient from '../../API/api';
import { MovieProps } from '../../utils/MovieProps';
import MovieCard from '../../components/MovieCard/MovieCard';
import Footer from '../../components/Footer/Footer';
import './FilmPage.css'

const FilmPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MovieProps | null>(null);

    useEffect(() => {
        if (id) {
             apiClient.get(`/movie/${id}`)
                .then((response) => setMovie(response.data))
                .catch((error) => console.error("Ошибка загрузки фильма:", error));
        }
    }, [id]);

    if (!movie) return <p>Загрузка...</p>;

    return (
        <div>
            <Header />
            <main>
            {movie ? <MovieCard movie={movie} setMovie={setMovie} /> : <p>Загрузка...</p>}
            <div>
                <h2 className='h2-about'>О фильме</h2>
                <ul className="movie-details">
                    {[
                        { label: 'Язык оригинала', value: movie.language },
                        { label: 'Бюджет', value: movie.budget },
                        { label: 'Выручка', value: movie.revenue },
                        { label: 'Режиссёр', value: movie.director },
                        { label: 'Продакшен', value: movie.production },
                        { label: 'Награды', value: movie.awardsSummary },
                    ].map((item, index) => (
                        <li key={index} className="detail-item">
                            <div className="label-wrapper">
                                <span className="detail-label">{item.label}</span>
                            </div>
                            
                            <div className="dots-wrapper">
                                <span className="dots-line"></span>
                            </div>

                            <div className="value-wrapper">
                                <span className="detail-value">{item.value || '—'}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            </main>
            <Footer/>
        </div>
    );
};

export default FilmPage;