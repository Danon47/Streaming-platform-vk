import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { ProfileProps } from '../../utils/ProfileProps';
import apiClient from '../../API/api';
import { MovieProps } from '../../utils/MovieProps';
import { Link } from 'react-router-dom';
import './AccountPage.css'

const AccountPage: React.FC = () => {
    const [profile, setProfile] = useState<ProfileProps>();
    const [favorites, setFavorites] = useState<MovieProps[]>([]);
    const [isProfileInfoPicked, setIsProfileInfoPicked] = useState(false);

    useEffect(() => {
        apiClient.get('/profile')
            .then(response => setProfile(response.data))
            .catch(error => console.error("Ошибка загрузки аккаунта:", error));
    }, []);

    useEffect(() => {
        apiClient.get('/favorites')
            .then(response => setFavorites(response.data))
            .catch(error => console.error("Ошибка загрузки фильмов:", error));
    }, []);

    useEffect(() => {
        console.log(profile);
    }, [profile]);

    useEffect(() => {
        console.log(favorites);
    }, [favorites]);

    const toggleView = (isProfileInfo: boolean) => {
        setIsProfileInfoPicked(isProfileInfo);
    };

    const handleLogout = async () => {
        try {
            await apiClient.get('/auth/logout');
            setProfile(undefined);
            window.location.href = '/';
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };

    const handleFavDelite = async (id: number) => {
        try {
            await apiClient.delete(`/favorites/${id}`, {
                withCredentials: true,
            });
    
            setFavorites((prevFavorites) => prevFavorites.filter(movie => movie.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении фильма:', error);
        }
    }

    return (
        <div>
            <Header />
            <main className='account-container'>
                <h1 className='account-h1'>Мой аккаунт</h1>
                <div className='account-bttn-wrapper'>
                    <button className={isProfileInfoPicked ? 'auth-bttn' : 'auth-bttn underline'} onClick={() => toggleView(false)}>Избранные фильмы</button>
                    <button className={isProfileInfoPicked ? 'auth-bttn underline' : 'auth-bttn'} onClick={() => toggleView(true)}>Настройка аккаунта</button>
                </div>
                {!isProfileInfoPicked ? (
                    favorites.length === 0 ? (
                        <p>У вас пока нет избранных фильмов.</p>
                    ) : (
                        <ul className='fav-list'>
                            {favorites.map((movie: MovieProps) => (
                                <li key={movie.id} className="fav-item">
                                    <button onClick={() => handleFavDelite(movie.id)} className="fav-delite"/>
                                    <Link to={`/movie/${movie.id}`} className="nav-link">
                                        <img src={movie.posterUrl || "/assets/404.jpg"} alt={movie.title} className="top-movie-img" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )
                ) : (
                    <>
                        <div className='account-info-wrapper name'>
                            <div className='name-div'>{profile?.name?.[0]}{profile?.surname?.[0]}</div>
                            <div><span>Имя Фамилия</span><p>{profile?.name} {profile?.surname}</p></div>
                        </div>
                        <div className='account-info-wrapper email'>
                            <div className='email-div'></div>
                            <div><span>Электронная почта</span><p>{profile?.email}</p></div>
                        </div>
                        <button className='account-bttn' onClick={handleLogout}>Выйти из аккаунта</button>
                    </>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default AccountPage;