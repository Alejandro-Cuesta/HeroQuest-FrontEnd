import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Hook personalizado para usar AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};