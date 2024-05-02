// App.js
import React, { useState, useEffect } from 'react';
import { fetchData } from '../../funciones/Api';
import './Home.css';
import NavBar from '../../componentes/NavBar/NavBar';
import { obtenerDato } from '../../funciones/localStorageUtils.js';



function Home() {
  const [data, setData] = useState([]);
  const nombreUsuario = obtenerDato('nombre_usuario');
  const tipo = obtenerDato('tipo');



  const fetchDataAndUpdate = () => {
    fetchData('usuarios')
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    fetchDataAndUpdate();
  }, []);
  




  return (
    <div className='homeContainerAll'>
        <NavBar/>
      <div className='homeContainer'>
      <h1>Hola {nombreUsuario}</h1>
      <p>Usuario: 
      <span className={tipo === 'A' ? '' : 'disable'}> Administrador</span>
      <span className={tipo === 'P' ? '' : 'disable'}> Profesional</span>
      <span className={tipo === 'C' ? '' : 'disable'}> Clinica</span>
      </p>
      </div>
    </div>
  );
}

export default Home;
