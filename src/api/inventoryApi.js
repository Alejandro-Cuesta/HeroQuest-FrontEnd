import API from './axiosConfig';

/**
 * Obtener el inventario del héroe autenticado
 * GET /api/inventory
 */
export const getInventory = async () => {
  try {
    const response = await API.get('/inventory');
    return response.data; // lista de items
  } catch (error) {
    console.error('Error al obtener inventario:', error);
    throw error;
  }
};

/**
 * Añadir un nuevo ítem al inventario
 * POST /api/inventory/add
 */
export const addItem = async (newItem) => {
  try {
    const response = await API.post('/inventory/add', newItem);
    return response.data; // item añadido
  } catch (error) {
    console.error('Error al añadir ítem:', error);
    throw error;
  }
};

/**
 * Eliminar ítem del inventario
 * DELETE /api/inventory/item/{id}
 */
export const removeItem = async (itemId) => {
  try {
    await API.delete(`/inventory/item/${itemId}`);
    return itemId; // devolvemos el id eliminado
  } catch (error) {
    console.error('Error al eliminar ítem:', error);
    throw error;
  }
};