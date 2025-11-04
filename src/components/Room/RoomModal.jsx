import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components/roomModal.css';
import { getRooms, enterRoom } from '../../api/roomApi';

/**
 * Modal para seleccionar una habitación antes de entrar en el juego.
 * - Carga las rooms desde el backend.
 * - Muestra imagen y nombre de cada room.
 * - Al seleccionar, guarda la room en localStorage y navega a GameBoard.
 */
const RoomModal = ({ onClose }) => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getRooms();
        setRooms(data);
      } catch (error) {
        console.error('Error al obtener habitaciones:', error);
        setMensaje('No se pudieron cargar las habitaciones.');
      }
    };
    fetchRooms();
  }, []);

  const handleEnterRoom = async (roomId) => {
    try {
      setMensaje('💾 Entrando en la habitación...');
      const result = await enterRoom(roomId);

      setSelectedRoom(result.room);
      localStorage.setItem('currentRoom', JSON.stringify(result.room));

      onClose();
      navigate('/game');
    } catch (error) {
      console.error('Error al entrar en la habitación:', error);
      setMensaje('❌ No se pudo entrar en la habitación');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="room-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>Selecciona una Puerta</h2>

        <div className="room-grid">
          {rooms.length === 0 && <p>No hay habitaciones disponibles</p>}
          {rooms.map((room, index) => {
            const imagePath = `/assets/images/rooms/Puerta ${index + 1}.jpg`; 
            return (
              <div
                key={room.id}
                className={`room-card ${selectedRoom?.id === room.id ? 'selected' : ''}`}
                onClick={() => handleEnterRoom(room.id)}
              >
                <img src={imagePath} alt={room.name} />
                <p>{room.name}</p>
              </div>
            );
          })}
        </div>

        {mensaje && <p className="room-modal__message">{mensaje}</p>}
      </div>
    </div>
  );
};

export default RoomModal;