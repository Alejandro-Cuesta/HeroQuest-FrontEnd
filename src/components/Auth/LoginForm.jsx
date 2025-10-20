import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authApi';
import { useAuth } from '../../hooks/useAuth';


const LoginForm = () => {
  const { loginUser } = useAuth(); // acceso al contexto
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  // Actualiza el estado del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Enviar formulario
  const handleSubmit = async (e) => { // constante asincrona (Giacomo recomienda usar async/await no fetch directo)
    e.preventDefault();
    setError(null);
    try {
      const data = await login(form); // llamada al backend
      loginUser(data.user, data.token); // actualizar contexto y token
      alert('Login successful'); // temporal, luego reemplazar por UI más bonita si me da tiempo
      navigate('/home'); // redirigir a la página principal
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials or server error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
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
    </form>
  );
};

export default LoginForm;