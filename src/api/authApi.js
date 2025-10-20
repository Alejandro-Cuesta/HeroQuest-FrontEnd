import API from './axiosConfig'; // nuestra instancia de Axios con baseURL e interceptor

// Función para login
export const login = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    // response.data debe contener { user, token } desde backend
    return response.data;
  } catch (error) {
    // Podemos mejorar el mensaje según la respuesta del backend
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Función para registro
export const register = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    // response.data debe contener { user, token } desde backend
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};