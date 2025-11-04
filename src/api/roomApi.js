import API from './axiosConfig';
/* eslint-disable no-unreachable */

/**
 * Obtener lista de habitaciones o misiones
 * GET /api/rooms (simulado temporalmente)
 */
export const getRooms = async () => {
  try {
    // Backend listo:
    // const response = await API.get('/rooms');
    // return response.data;

    // Datos de ejemplo temporales
    return [
      { id: 1, name: 'Mazmorra de las Sombras', image: '/assets/images/rooms/dungeon.png' },
      { id: 2, name: 'Bosque de los Secretos', image: '/assets/images/rooms/forest.png' },
      { id: 3, name: 'Castillo del Destino', image: '/assets/images/rooms/castle.png' },
    ];
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

/**
 * Entrar en una habitación
 * POST /api/rooms/enter/:id (simulado temporalmente)
 */
export const enterRoom = async (roomId) => {
  try {
    const rooms = {
      1: 'Mazmorra de las Sombras',
      2: 'Bosque de los Secretos',
      3: 'Castillo del Destino',
    };
    return {
      room: { id: roomId, name: rooms[roomId] || `Habitación ${roomId}` },
    };
  } catch (error) {
    console.error('Error entering room:', error);
    throw error;
  }
};

/**
 * Obtener sesión de juego para el héroe (temporal)
 * GET /api/rooms/session
 */
export const getSession = async () => {
  try {
    // Simulación temporal de sesión
    return {
      room: { id: 1, name: 'Mazmorra de las Sombras' },
      hero: { id: 1, name: 'Merlín' },
      state: {} // estado inicial vacío
    };
  } catch (error) {
    console.error('Error fetching session:', error);
    throw error;
  }
};