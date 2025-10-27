import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api/authApi';
import { useAuth } from '../../hooks/useAuth';
import CharacterSelectModal from '../Character/CharacterSelectModal'; // importamos el nuevo modal
import '../../styles/pages/login.css'; // estilos del fondo y centrado

const LoginForm = () => {
  const { loginUser } = useAuth(); // acceso al contexto global
  const navigate = useNavigate();

  // Estado para los campos del formulario
  const [form, setForm] = useState({ username: '', password: '' });

  // Estado para errores de login
  const [error, setError] = useState(null);

  // Estado para mostrar/ocultar el modal de selección de personaje
  const [showCharacterModal, setShowCharacterModal] = useState(false);

  // Actualiza el estado del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {  // constante asincrona (Giacomo recomienda usar async/await no fetch directo)
    e.preventDefault();
    setError(null);

    try {
      const data = await login(form); // llamada al backend
      loginUser(data.user, data.token); // actualizar contexto y token

      // Comprobamos si el usuario ya tiene personaje seleccionado
      const storedCharacter = localStorage.getItem('character');

      if (!storedCharacter) {
        // Si no tiene personaje guardado, mostramos el modal de selección
        setShowCharacterModal(true);
      } else {
        // Si ya tiene personaje, lo redirigimos directamente a home
        navigate('/home');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciales inválidas o error del servidor');
    }
  };

  // Función que se ejecuta al seleccionar un personaje
  const handleCharacterSelect = (character) => {
    localStorage.setItem('character', character); // Guardar selección
    setShowCharacterModal(false); // Cerrar modal
    navigate('/home'); // Redirigir a la home
  };

  return (
    <div className="login-page">
      {/* Imagen de fondo */}
      <div className="login-page__background" />

      {/* Contenedor principal del formulario */}
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

        {/* Mostrar error si existe */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <input
          type="email"
          name="username"
          placeholder="Email"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        {/* Enlace a registro */}
        <p className="login-form__register">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </form>

      {/* Modal de selección de personaje (solo se muestra la primera vez) */}
      {showCharacterModal && (
        <CharacterSelectModal onSelect={handleCharacterSelect} />
      )}
    </div>
  );
};

export default LoginForm;