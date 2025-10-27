import { useState } from 'react';
import { register } from '../../api/authApi';
import { useNavigate } from 'react-router-dom'; // hook para redirigir al login 
import '../../styles/pages/register.css';

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
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Llamada al backend para registrar el usuario
      await register(form); 
      
      // Mostrar mensaje de éxito
      alert('Registro exitoso! Revisa tu correo y luego inicia sesión');

      // Redirigir al login usando React Router (SPA sin recargar la página)
      navigate('/login');
    } catch (err) {
      // Mostrar cualquier error devuelto por el backend
      setError(err.response?.data?.message || 'Error al registrar el usuario');
    }
  };

  return (
     <div className="register-page">
      <div className="register-page__background" />

    <form onSubmit={handleSubmit}  className="register-form">
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
        placeholder="Nombre de usuario"
        value={form.displayName}
        onChange={handleChange}
        required
      />

      {/* Input para password */}
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
      />

      {/* Input para confirmPassword */}
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirmar Contraseña"
        value={form.confirmPassword}
        onChange={handleChange}
        required
      />

      {/* Botón de envío */}
      <button type="submit">Registrarse</button>

      <p className="register-form__login">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </form>
  </div>
  );
};

export default RegisterForm;