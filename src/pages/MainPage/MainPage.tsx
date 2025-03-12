import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import MovieCard from '../../components/MovieCard/MovieCard';
import apiClient from '../../API/api';
import { MovieProps } from '../../utils/MovieProps';
import Top10 from '../../components/Top10';
import Footer from '../../components/Footer/Footer';
import './MainPage.css'

const MainPage: React.FC = () => {
    const [movie, setMovie] = useState<MovieProps | null>(null);

    useEffect(() => {
        apiClient.get(`/movie/random`).then((response) => {
        setMovie(response.data);
        }).catch((error) => {
        console.error("Ошибка загрузки фильма:", error);
        });
    }, []);

    return (
        <div>
            <Header />
            
            <main>
                <div className="movie-sction">
                    {movie ? <MovieCard movie={movie} setMovie={setMovie} /> : <p>Загрузка...</p>}
                </div>
                < Top10 />
            </main>
            <Footer/>
        </div>
    );
};

export default MainPage;