import API from './axiosConfig';

/**
 * Obtener héroe del usuario autenticado
 */
export const getHero = async () => {
  try {
    const response = await API.get('/hero');
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) return null;
    console.error('Error al obtener héroe:', error);
    throw new Error('No se pudo obtener el héroe');
  }
};

/**
 * Crear héroe para el usuario autenticado
 */
export const createHero = async (heroClass) => {
  try {
    const response = await API.post('/hero', { heroClass });
    return response.data;
  } catch (error) {
    console.error('Error al crear héroe:', error.response?.data || error);
    throw new Error(error.response?.data?.message || 'No se pudo crear el héroe');
  }
};

/**
 * Actualizar estadísticas del héroe (PUT /hero/update-stats)
 * Se envían los nombres esperados por HeroUpdateStatsDTO
 */
export const updateHeroStats = async (hero) => {
  try {
    const updatedStats = {
      vida: hero.health,
      defensa: hero.defense,
      ataque: hero.attack,
      movimiento: hero.movement,
      puntosRestantes: hero.puntosRestantes,
    };
    const response = await API.put('/hero/update-stats', updatedStats);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar estadísticas del héroe:', error);
    throw new Error('No se pudieron guardar los cambios del héroe');
  }
};