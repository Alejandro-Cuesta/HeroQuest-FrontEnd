import React, { useState } from 'react';
import '../../styles/components/characterModal.css';

const CharacterModal = ({ onClose }) => {
  // Estado de ejemplo para las estadísticas
  const [stats, setStats] = useState({
    vida: 10,
    defensa: 10,
    dano: 10,
    movimiento: 10,
  });

  const [puntos, setPuntos] = useState(15);
  const [personaje] = useState('Barbaro'); // o 'Guerrero'
  const [nivel] = useState(1);
  const [expActual] = useState(10);
  const [expMax] = useState(100);

  // Incrementar estadísticas
  const aumentarStat = (stat) => {
    if (puntos > 0) {
      setStats({ ...stats, [stat]: stats[stat] + 1 });
      setPuntos(puntos - 1);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="character-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Contenedor superior */}
        <div className="character-modal__top">
          {/* Izquierda: imagen del personaje */}
          <div className="character-modal__image">
            <img
              src={
                personaje === 'Barbaro'
                  ? '/assets/images/characters/BarbaroModal.png'
                  : '/assets/images/characters/GuerreroModal.png'
              }
              alt={personaje}
            />
          </div>

          {/* Derecha: estadísticas */}
          <div className="character-modal__stats">
            <h2>{personaje}</h2>
            <ul>
              {Object.entries(stats).map(([key, value]) => (
                <li key={key}>
                  <span>{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                  <span>{value}</span>
                  <button onClick={() => aumentarStat(key)} disabled={puntos === 0}>
                    +
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contenedor inferior */}
        <div className="character-modal__bottom">
          {/* Nivel, experiencia y puntos */}
          <div className="character-modal__progress">
            <p>LVL: {nivel}</p>
            <p>EXP: {expActual}/{expMax}</p>
            <p>Puntos: {puntos}</p>
          </div>

          {/* Habilidades */}
          <div className="character-modal__skills">
            <h3>Habilidades</h3>
            <div className="character-modal__skills-grid">
              {personaje === 'Barbaro' ? (
                <>
                  <div className="skill">
                    <h4>Lvl 3</h4>
                    <p>Revela trampas cercanas</p>
                  </div>
                  <div className="skill">
                    <h4>Lvl 5</h4>
                    <p>Duplica Vida y Daño</p>
                  </div>
                  <div className="skill">
                    <h4>Lvl 10</h4>
                    <p>Daño en área</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="skill">
                    <h4>Lvl 3</h4>
                    <p>Revela trampas cercanas</p>
                  </div>
                  <div className="skill">
                    <h4>Lvl 5</h4>
                    <p>Duplica Vida y Defensa</p>
                  </div>
                  <div className="skill">
                    <h4>Lvl 10</h4>
                    <p>Contraataque (devuelve daño)</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;