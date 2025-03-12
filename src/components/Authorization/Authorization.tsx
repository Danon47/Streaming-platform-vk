import { useForm, SubmitHandler } from 'react-hook-form';
import apiClient from '../../API/api';
import { useState } from 'react';
import './Authorization.css'

interface AuthModalProps {
    onClose: () => void;
    onLoginSuccess: () => void;
}

interface FormData {
    email: string;
    firstName?: string;
    lastName?: string;
    password: string;
    confirmPassword?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            const endpoint = isLoginMode ? '/auth/login' : '/user';
            const payload = isLoginMode
            ? { email: data.email, password: data.password }
            : { 
                email: data.email, 
                password: data.password, 
                name: data.firstName,
                surname: data.lastName,
              };

            const response = await apiClient.post(endpoint, payload, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Accept: "application/json",
                  },
                  withCredentials: true, 
                });

            console.log('Успешно:', response.data);
            if (!isLoginMode) {
                setIsRegistrationSuccess(true);
            } else {
                onLoginSuccess();
                onClose();
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const handleLoginAfterRegistration = () => {
        setIsRegistrationSuccess(false);
        setIsLoginMode(true);
        reset();
    };

    return (
        <div className="auth-modal-overlay">
            <div className="auth-modal">
                {isRegistrationSuccess ? (
                    <div className='registration-success-div'>
                        <button className="close-button" onClick={onClose}></button>
                        <img src="../src/assets/black.svg" alt="logo" className="logo-icon" />
                        <h2>Регистрация завершена</h2>
                        <p>Используйте вашу электронную почту для входа</p>
                        <button onClick={handleLoginAfterRegistration} className="success-button">
                            Войти
                        </button>
                    </div>
                ) : (
                    <div>
                        <button className="close-button" onClick={onClose}></button>
                        <img src="../src/assets/black.svg" alt="logo" className="logo-icon" />
                        {isLoginMode ? '' : <h2>Регистрация</h2>}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            
                        {errors.email && <span className="error-message">{errors.email.message}</span>}
                            <div className={`input-container input-email ${errors.email ? 'input-error' : ''}`}>
                                <input
                                    type="email"
                                    placeholder="Электронная почта"
                                    {...register('email', {
                                        required: 'Email обязателен',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Некорректный email',
                                        },
                                    })}
                                />
                            </div>

                            {!isLoginMode && (
                                <>
                                    {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
                                    <div className={`input-container input-name ${errors.firstName ? 'input-error' : ''}`}>
                                        <input
                                            type="text"
                                            placeholder="Имя"
                                            {...register('firstName', { required: 'Имя обязательно' })}
                                        />
                                    </div>
                                    {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
                                    <div className={`input-container input-name ${errors.lastName ? 'input-error' : ''}`}>
                                        <input
                                            type="text"
                                            placeholder="Фамилия"
                                            {...register('lastName', { required: 'Фамилия обязательна' })}
                                        />
                                    </div>
                                </>
                            )}
                            
                            {errors.password && <span className="error-message">{errors.password.message}</span>}
                            <div className={`input-container input-password ${errors.password ? 'input-error' : ''}`}>
                                <input
                                    type="password"
                                    placeholder="Пароль"
                                    {...register('password', {
                                        required: 'Пароль обязателен',
                                        minLength: {
                                            value: 6,
                                            message: 'Пароль должен быть не менее 6 символов',
                                        },
                                    })}
                                    />
                                </div>

                                {!isLoginMode && (
                                    <>
                                     {errors.confirmPassword && (
                                            <span className="error-message">{errors.confirmPassword.message}</span>
                                        )}
                                        <div className={`input-container input-password ${errors.confirmPassword ? 'input-error' : ''}`}>
                                            <input
                                                type="password"
                                                placeholder="Повторите пароль"
                                                {...register('confirmPassword', {
                                                    required: 'Подтверждение пароля обязательно',
                                                    validate: (value) => value === watch('password') || 'Пароли не совпадают',
                                                })}
                                            />
                                        </div>
                                    </>
                                )}

                                <button type="submit">
                                    {isLoginMode ? 'Войти' : 'Создать аккаунт'}
                                </button>
                        </form>
                        <button onClick={() => setIsLoginMode(!isLoginMode)} className="toggle-mode-button">
                            {isLoginMode ? 'Регистрация' : 'У меня есть пароль'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthModal;