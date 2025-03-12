import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchInput from '../SearchInput/SearchInput';
import apiClient from '../../API/api';
import { ProfileProps } from '../../utils/ProfileProps';
import AuthModal from '../Authorization/Authorization';
import './Header.css'

const Header: React.FC = () => {
    const location = useLocation();
    const [profile, setProfile] = useState<ProfileProps | null>(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    
    const fetchProfile = async () => {
        await apiClient.get('/profile')
        .then(response => {
            setProfile(response.data)});
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <header className="main-header">
            <div className="header">
                <Link to="/" className="logo">
                    <img src="../src/assets/logo.svg" alt="Логотип" className="logo" />
                </Link>

                <nav className="main-nav">
                    <Link to="/" className={location.pathname === '/' || location.pathname.startsWith('/movie') ? 'underline' : ''}>
                        Главная
                    </Link>
                </nav>

                <nav className="main-nav">
                    <Link to="/genres" className={location.pathname.startsWith('/genres') ? 'underline' : ''}>Жанры</Link>
                </nav>
                < SearchInput/>
                {profile ? (
                    <nav className="main-nav">
                        <Link to="/account" className={location.pathname === '/account' ? 'underline' : ''}>{profile.name || 'Аккаунт'}</Link>
                    </nav>
                ) : (
                    <nav className="main-nav">
                        <button onClick={() => setIsAuthModalOpen(true)} className='login-button'>Войти</button>
                    </nav>  
                )}
                {isAuthModalOpen && (
                    <AuthModal onClose={() => setIsAuthModalOpen(false)}
                    onLoginSuccess={fetchProfile} />
                )}
            </div>
        </header>
    );
};

export default Header;