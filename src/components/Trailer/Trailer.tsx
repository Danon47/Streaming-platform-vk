import React, { useState } from "react";
import { MovieProps } from "../../utils/MovieProps";
import './Trailer.css'

interface TrailerModalProps {
  movie: MovieProps;
}

const TrailerModal: React.FC<TrailerModalProps> = ({ movie }) => {
  const [isOpen, setIsOpen] = useState(false); 
  
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className="blue-button">
        Трейлер
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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