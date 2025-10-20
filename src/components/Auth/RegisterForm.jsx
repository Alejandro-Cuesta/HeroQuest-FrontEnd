import { useState } from 'react';
import { register } from '../../api/authApi';
import { useNavigate } from 'react-router-dom'; // hook para redirigir al login 

// RegisterForm: componente para registrar un nuevo usuario
const RegisterForm = () => {
  const navigate = useNavigate(); // hook para redirección al login (no automaticamente como antes)
  
  const [form, setForm] = useState({
    username: '',       // email del usuario, será el identificador único
    displayName: '',    
    password: '',       
    confirmPassword: '' 
  });

  // Estado para manejar errores en el formulario
  const [error, setError] = useState(null);

  // handleChange: actualiza el estado del formulario al escribir en los inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handleSubmit: se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // evitar recarga de página
    setError(null);     // limpiar errores previos

    // Validación básica en frontend: password y confirmPassword deben coincidir
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Llamada al backend para registrar el usuario
      await register(form); 
      
      // Mostrar mensaje de éxito
      alert('Registration successful! Please check your email and then log in.');

      // Redirigir al login usando React Router (SPA sin recargar la página)
      navigate('/login');
    } catch (err) {
      // Mostrar cualquier error devuelto por el backend
      setError(err.response?.data?.message || 'An error occurred during registration');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      {/* Mostrar error si existe */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Input para email / username */}
      <input
        type="email"
        name="username"
        placeholder="Email"
        value={form.username}
        onChange={handleChange}
        required
      />

      {/* Input para displayName */}
      <input
        type="text"
        name="displayName"
        placeholder="Display Name"
        value={form.displayName}
        onChange={handleChange}
        required
      />

      {/* Input para password */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      {/* Input para confirmPassword */}
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
        required
      />

      {/* Botón de envío */}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;