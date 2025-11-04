import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api/authApi';
import { useAuth } from '../../hooks/useAuth';
import CharacterSelectModal from '../Character/CharacterSelectModal';
import { getHero, createHero } from '../../api/characterApi';
import '../../styles/pages/login.css';

const LoginForm = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [showCharacterModal, setShowCharacterModal] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await login(form);
      loginUser(data.user, data.token);

      const hero = await getHero();
      if (!hero) setShowCharacterModal(true);
      else {
        localStorage.setItem('character', hero.heroClass);
        navigate('/home');
      }
    } catch (err) {
      setError(err.message || 'Credenciales inválidas o error del servidor');
    }
  };

  const handleCharacterSelect = async (character) => {
    try {
      const hero = await createHero(character);
      localStorage.setItem('character', hero.heroClass);
      setShowCharacterModal(false);
      navigate('/home');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__background" />
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar sesión</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input type="email" name="username" placeholder="Email" value={form.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
        <button type="submit">Entrar</button>
        <p className="login-form__register">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </form>
      {showCharacterModal && <CharacterSelectModal onSelect={handleCharacterSelect} />}
    </div>
  );
};

export default LoginForm;