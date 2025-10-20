import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Game from '../pages/Game';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/home" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/home" />}
        />

        {/* Rutas privadas */}
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/game"
          element={user ? <Game /> : <Navigate to="/login" />}
        />

        {/* Ruta raíz → redirige según estado */}
        <Route
          path="/"
          element={<Navigate to={user ? '/home' : '/login'} />}
        />

        {/* Página 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;