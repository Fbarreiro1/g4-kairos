// App.js
import React, { useState, useEffect } from 'react';
import { fetchData } from '../../funciones/Api';
import './Login.css';
import { useNavigate } from 'react-router-dom';  
import avatar from '../../media/avatar.png';
import { guardarDato } from '../../funciones/localStorageUtils.js';



function Login() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    USERNAME: '',
    PASSWORD: ''
  });



  const fetchDataAndUpdate = () => {
    fetchData('usuarios')
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    fetchDataAndUpdate();
  }, []);
  
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  
  const handleLogin = async (e)=>{
    e.preventDefault();
    try{
        await fetchData('usuarios');
        const usuarioRegistrado = data.find(usuario => usuario.USERNAME === formData.USERNAME);
        if(!usuarioRegistrado){
          alert('El usuario no está registrado');
        } else{
          if (usuarioRegistrado.PASSWORD === formData.PASSWORD){
            guardarDato('USERNAME', usuarioRegistrado.USERNAME);
            guardarDato('tipo', usuarioRegistrado.TIPO);
            guardarDato('campo', usuarioRegistrado.CAMPO);
            guardarDato('clinica', usuarioRegistrado.FK_CLINICAS);
            navigate("/home");
          }else{  
            alert('Contraseña incorrecta');
          }
        }
    }
    catch (error){
        console.error('Error', error);
    }
  };



  return (
    <div className='pageLogin'>
        <div className='loginContainer'>
          <img className='avatarLog' src={avatar} alt='avatar'/>
      <form onSubmit={handleLogin} className='formLogContainer'>
      <label className='labelLog'>
        Nombre de usuario:
        <input type="text" name="USERNAME" value={formData.USERNAME} onChange={handleChange} />
      </label>
      <label className='labelLog'>
        Contraseña:
        <input type="PASSWORD" name="PASSWORD" value={formData.PASSWORD} onChange={handleChange} />
      </label>
      <button type="submit" className='botLog'>INGRESAR</button>
    </form>
    </div>

    </div>
  );
}

export default Login;
