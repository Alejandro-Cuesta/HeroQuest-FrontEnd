import React from 'react';
import '../../styles/pages/characterSelectModal.css';

// Modal para seleccionar el personaje inicial del jugador
const CharacterSelectModal = ({ onSelect }) => {
  return (
    <div className="character-select-overlay">
      <div className="character-select-background" />
      <div className="character-select-modal">
        <h2>Elige tu héroe</h2>
        <div className="character-select-grid">
          <div
            className="character-option"
            onClick={() => onSelect('Barbaro')}
          >
            <img
              src="/assets/images/home/BarbaroModal4.jpg"
              alt="Barbaro"
            />
            <p>Bárbaro</p>
          </div>

          <div
            className="character-option"
            onClick={() => onSelect('Guerrero')}
          >
            <img
              src="/assets/images/home/GuerreroModal.jpg"
              alt="Guerrero"
            />
            <p>Guerrero</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelectModal;