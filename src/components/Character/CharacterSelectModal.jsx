import React from 'react';
import '../../styles/pages/characterSelectModal.css';

/**
 * Modal para seleccionar el personaje inicial del jugador
 * onSelect función que se ejecuta al elegir héroe
 */
const CharacterSelectModal = ({ onSelect }) => {
  // Llamada interna al click de cada héroe
  const handleClick = (character) => {
    onSelect(character); // esto hace POST y cierra modal en LoginForm
  };

  return (
    <div className="character-select-overlay">
      <div className="character-select-background" />
      <div className="character-select-modal">
        <h2>Elige tu héroe</h2>
        <div className="character-select-grid">
          <div
            className="character-option"
            onClick={() => handleClick('Barbaro')}
          >
            <img
              src="/assets/images/home/BarbaroModal4.jpg"
              alt="Barbaro"
            />
            <p>Bárbaro</p>
          </div>

          <div
            className="character-option"
            onClick={() => handleClick('Guerrero')}
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