import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../../media/avatar.png';
import { fetchData } from '../../funciones/Api'; // Importa la función fetchData si aún no lo has hecho
import { guardarDato } from '../../funciones/localStorageUtils.js';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    USERNAME: '',
    PASSWORD: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Obtener la lista de usuarios del backend
      const data = await fetchData('usuarios');
      const usuarioRegistrado = data.find(usuario => usuario.USERNAME === formData.USERNAME);

      if (!usuarioRegistrado) {
        // Si el usuario no está registrado, verificar si es el usuario de acceso directo
        if (formData.USERNAME === 'user' && formData.PASSWORD === '123') {
          // Autenticación exitosa para usuario 'user'
          guardarDato('USERNAME', 'user'); // Guardar en localStorage si es necesario
          navigate('/home'); // Redirigir al usuario a la página de inicio
        } else {
          // Mostrar mensaje de usuario no registrado
          alert('El usuario no está registrado o los datos ingresados son incorrectos.');
        }
      } else {
        // Verificar la contraseña ingresada con la del usuario registrado
        if (usuarioRegistrado.PASSWORD === formData.PASSWORD) {
          // Autenticación exitosa para usuario registrado
          guardarDato('USERNAME', usuarioRegistrado.USERNAME); // Guardar en localStorage si es necesario
          navigate('/home'); // Redirigir al usuario a la página de inicio
        } else {
          // Mostrar mensaje de contraseña incorrecta
          alert('Contraseña incorrecta');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de servidor');
    }
  };

  return (
    <div className='pageLogin'>
      <div className='loginContainer'>
        <img className='avatarLog' src={avatar} alt='avatar' />
        <form onSubmit={handleLogin} className='formLogContainer'>
          <label className='labelLog'>
            Nombre de usuario:
            <input type="text" name="USERNAME" value={formData.USERNAME} onChange={handleChange} />
          </label>
          <label className='labelLog'>
            Contraseña:
            <input type="password" name="PASSWORD" value={formData.PASSWORD} onChange={handleChange} />
          </label>
          <button type="submit" className='botLog'>INGRESAR</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
