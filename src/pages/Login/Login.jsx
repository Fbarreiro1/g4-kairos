import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../../media/avatar.png';
import { fetchData } from '../../funciones/Api';
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
      const data = await fetchData('usuarios');
      const usuarioRegistrado = data.find(usuario => usuario.USERNAME === formData.USERNAME);

      if (!usuarioRegistrado) {
        if (formData.USERNAME === 'user' && formData.PASSWORD === '123') {
          guardarDato('USERNAME', 'user');
          navigate('/home');
        } else {
          alert('El usuario no está registrado o los datos ingresados son incorrectos.');
        }
      } else {
        if (usuarioRegistrado.PASSWORD === formData.PASSWORD) {
          guardarDato('USERNAME', usuarioRegistrado.USERNAME);
          navigate('/home');
        } else {
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


