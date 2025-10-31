import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api/authApi';
import { useAuth } from '../../hooks/useAuth';
import CharacterSelectModal from '../Character/CharacterSelectModal'; // importamos el modal
import { getHero, createHero } from '../../api/characterApi'; // nuevas funciones para héroe
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

  // Actualiza el estado del formulario al escribir
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Login al backend (doble paso)
      const data = await login(form);

      // Guardamos usuario y token en el contexto global
      loginUser(data.user, data.token);

      // Comprobamos si el usuario ya tiene héroe asignado en la BD
      const hero = await getHero(); // GET /api/hero

      if (!hero) {
        // Si no tiene héroe, mostramos modal de selección
        setShowCharacterModal(true);
      } else {
        // Si ya tiene héroe, guardamos en localStorage y redirigimos a home
        localStorage.setItem('character', hero.heroClass);
        navigate('/home');
      }
    } catch (err) {
      // Si falla cualquiera de los pasos, mostramos un error genérico
      setError(err.message || 'Credenciales inválidas o error del servidor');
    }
  };

  // Función que se ejecuta al seleccionar un personaje en el modal
  const handleCharacterSelect = async (character) => {
    try {
      // Guardamos el héroe en la BD mediante POST /api/hero
      const hero = await createHero(character);

      // Guardamos localmente también
      localStorage.setItem('character', hero.heroClass);

      // Cerramos modal y redirigimos a home
      setShowCharacterModal(false);
      navigate('/home');
    } catch (err) {
      // Mostramos error si no se pudo crear héroe
      alert(err.message);
    }
  };

  return (
    <div className="login-page">
      {/* Imagen de fondo */}
      <div className="login-page__background" />

      {/* Contenedor principal del formulario */}
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar sesión</h2>

        {/* Mostrar error si existe */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Inputs del formulario */}
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
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />

        {/* Botón de envío */}
        <button type="submit">Entrar</button>

        {/* Enlace a registro */}
        <p className="login-form__register">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </form>

      {/* Modal de selección de personaje (solo se muestra si no tiene héroe) */}
      {showCharacterModal && (
        <CharacterSelectModal onSelect={handleCharacterSelect} />
      )}
    </div>
  );
};

export default LoginForm;