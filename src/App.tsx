import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import MainPage from './pages/MainPage/MainPage';
import GenresPage from './pages/GenresPage/GenresPage';
import FilmPage from './pages/FilmPage/FilmPage';
import AccountPage from './pages/AccountPage/AccountPage';
import GenreMovies from './pages//GenreMovies/GenreMovies'

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/genres" element={<GenresPage />} />
            <Route path="/genres/:name" element={<GenreMovies />} />
            <Route path="/movie/:id" element={<FilmPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default App;

