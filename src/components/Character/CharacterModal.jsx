import React, { useState } from 'react';
import { updateHeroStats } from '../../api/characterApi'; // importamos la función del API
import '../../styles/components/characterModal.css';

/**
 * Modal que muestra las estadísticas del héroe.
 * - Cada clic en "+" sube el stat y lo guarda automáticamente en el backend.
 * - No hay botón de "Guardar cambios" (autosave).
 */
const CharacterModal = ({ onClose }) => {
  // Estado inicial del héroe (luego vendrá del backend)
  const [stats, setStats] = useState({
    vida: 10,
    defensa: 10,
    daño: 10,
    movimiento: 10,
  });

  const [puntos, setPuntos] = useState(15);
  const [personaje] = useState('Barbaro');
  const [nivel] = useState(1);
  const [expActual] = useState(10);
  const [expMax] = useState(100);
  const [mensaje, setMensaje] = useState('');

  /**
   * Incrementar estadísticas y guardarlas automáticamente
   */
  const aumentarStat = async (stat) => {
    if (puntos > 0) {
      const nuevosStats = { ...stats, [stat]: stats[stat] + 1 };
      const nuevosPuntos = puntos - 1;

      // Actualizamos visualmente
      setStats(nuevosStats);
      setPuntos(nuevosPuntos);

      // Guardamos en backend (autosave)
      try {
        setMensaje('Guardando...');
        const updatedStats = {
          ...nuevosStats,
          puntosRestantes: nuevosPuntos,
        };

        const data = await updateHeroStats(updatedStats);
        console.log('Hero actualizado:', data);
        setMensaje('Cambios guardados automáticamente');
      } catch (error) {
        console.error('Error al guardar cambios:', error);
        setMensaje('Error al guardar cambios');
      }
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
                  ? '/assets/images/home/BarbaroModal4.jpg'
                  : '/assets/images/home/GuerreroModal.jpg'
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
                  <button
                    onClick={() => aumentarStat(key)}
                    disabled={puntos === 0}
                  >
                    +
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contenedor inferior */}
        <div className="character-modal__bottom">
          <div className="character-modal__progress">
            <p>LVL: {nivel}</p>
            <p>EXP: {expActual}/{expMax}</p>
            <p>Puntos: {puntos}</p>
          </div>

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

          {/* Mensaje de guardado automático */}
          {mensaje && <p className="character-modal__message">{mensaje}</p>}
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;