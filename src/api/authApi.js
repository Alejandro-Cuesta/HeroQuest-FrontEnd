import API from './axiosConfig';

/**
 * LOGIN (doble paso)
 * Valida credenciales en /auth/login
 * Genera token JWT en /auth/token con Basic Auth
 */
export const login = async (credentials) => {
  try {
    // Paso 1: validar credenciales
    const loginResponse = await API.post('/auth/login', credentials);
    console.log('Credenciales válidas:', loginResponse.data);

    // Paso 2: solicitar token JWT
    const basicAuthHeader = 'Basic ' + btoa(`${credentials.username}:${credentials.password}`);

    const tokenResponse = await API.post('/auth/token', null, {
      headers: {
        Authorization: basicAuthHeader,
      },
    });

    const token = tokenResponse.data;
    console.log('Token JWT recibido:', token);

    // Devolvemos al frontend el usuario y el token
    return { user: loginResponse.data, token };
  } catch (error) {
    console.error('Error en login:', error.response?.status, error.response?.data);
    throw new Error('Error de inicio de sesión');
  }
};

/**
 * REGISTRO de nuevo usuario
 */
export const register = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    console.log('Usuario registrado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error en registro:', error.response?.data);
    throw new Error('Error en el registro');
  }
};