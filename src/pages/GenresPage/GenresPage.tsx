import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import { Link } from 'react-router-dom';
import apiClient from '../../API/api.ts';
import GENRE_TRANSLATIONS from '../../utils/Translations.ts';
import './GenresPage.css'


const GenresPage: React.FC = () => {
    const [genres, setGenres] = useState<string[]>([]);
    const [posters, setPosters] = useState<{ [key: string]: string }>({});


    useEffect(() => {
        apiClient.get(`/movie/genres`)
            .then((response) => setGenres(response.data))
            .catch(console.error);
    }, []);

    useEffect(() => {
        if (genres.length === 0) return;

        const fetchPostersForGenres = async () => {
            const genreImages: { [key: string]: string } = {};

            for (const genre of genres) {
                try {
                    const response = await apiClient.get('/movie', {
                        params: { genre: genre, limit: 1 },
                    });

                    if (response.data.length > 0) {
                        const randomMovie = response.data[5];
                        genreImages[genre] = randomMovie.posterUrl;
                    } else {
                        genreImages[genre] = "../src/assets/404.jpg";
                    }
                } catch {
                    genreImages[genre] = "../src/assets/404.jpg";
                }
            }

            setPosters(genreImages);
        };

        fetchPostersForGenres();
    }, [genres]);

    return (
        <div>
            < Header />
            <main>
            <h1 className='genres'>Жанры фильмов</h1>
            <ul className='genres-list'>
                {genres.map((genre, index) => (
                    <li key={index} className='genre-card'>
                        <Link to={`/genres/${genre}`}>
                        <div className='ganre-link'>
                            <div className='ganre-img'>
                                <img src={posters[genre]} alt={genre}/>
                            </div>
                            <div className='card-name'>
                                <h2>{GENRE_TRANSLATIONS[genre]}</h2>
                            </div>
                        </div>
                        </Link>
                    </li>
                ))}
            </ul>
            </main>
            <Footer/>
        </div>
    );
};

export default GenresPage;