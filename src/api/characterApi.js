import API from './axiosConfig';

/**
 * Obtener héroe del usuario autenticado
 */
export const getHero = async () => {
  try {
    const response = await API.get('/hero'); // GET /api/hero
    return response.data; // devuelve objeto hero { heroClass, ... }
  } catch (error) {
    if (error.response?.status === 404) {
      // No tiene héroe todavía
      return null;
    }
    console.error('Error al obtener héroe:', error);
    throw new Error('No se pudo obtener el héroe');
  }
};

/**
 * Crear héroe para el usuario autenticado
 */
export const createHero = async (heroClass) => {
  try {
    const response = await API.post('/hero', { heroClass }); // POST /api/hero
    return response.data; // devuelve objeto hero creado
  } catch (error) {
    console.error('Error al crear héroe:', error.response?.data || error);
    throw new Error(
      error.response?.data?.message || 'No se pudo crear el héroe'
    );
  }
};

/**
 * Actualizar estadísticas del héroe (PUT /api/hero/update-stats)
 * Se llama automáticamente cada vez que el jugador sube una estadística.
 */
export const updateHeroStats = async (updatedStats) => {
  try {
    const response = await API.put('/hero/update-stats', updatedStats);
    console.log('Stats actualizadas automáticamente:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar estadísticas del héroe:', error);
    throw new Error('No se pudieron guardar los cambios del héroe');
  }
};