import React, { useState } from "react";
import { MovieProps } from "../../utils/MovieProps";
import './Trailer.css'

interface TrailerModalProps {
  movie: MovieProps;
}

const TrailerModal: React.FC<TrailerModalProps> = ({ movie }) => {
  const [isOpen, setIsOpen] = useState(false); // Состояние модального окна

  // Функция для открытия модального окна
  const openModal = () => {
    setIsOpen(true);
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {/* Кнопка для открытия модального окна */}
      <button onClick={openModal} className="blue-button">
        Трейлер
      </button>

      {/* Модальное окно */}
      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Кнопка закрытия */}
            <button onClick={closeModal} className="close-trailer-button"/>

            <iframe
              width="100%"
              height="400"
              src={movie.trailerUrl}
              title={movie.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrailerModal;