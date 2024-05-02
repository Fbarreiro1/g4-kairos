import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { eliminarDato, obtenerDato  } from '../../funciones/localStorageUtils.js';
import logo from '../../media/logo.jpg';

import './NavBar.css'

const NavBar = () => {
  const navigate = useNavigate();
  const tipo = obtenerDato('tipo');
  const usuario = obtenerDato('nombre_usuario');
  const [isAdmin, setIsAdmin] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setIsAdmin(tipo === 'A');
  }, [tipo]);

  
  const handleClick = () =>{
    setClicked(!clicked);
  }

  const handleExit = () => {
    eliminarDato('nombre_usuario');
    eliminarDato('tipo');
    navigate('/');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link to={'/home'} className="navbar-brand"><img src={logo} alt='logo de una G y un 4' className='logoNavBar'/></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link to={'/home'} className="nav-link active" aria-current="page">Home</Link>
        </li>
        <li className="nav-item">
        <Link to={'/admin'} className={isAdmin ? 'isAdmin nav-link' : 'notAdmin nav-link'} >Administrador</Link>
        </li>
        <li className="nav-item ">
          <a className="nav-link " aria-expanded="false" onClick={handleClick}>
            {usuario}
          </a>
          <div className={clicked ? 'dropDownNavBar' : 'disable'}>
          <div onClick={handleExit}>Salir</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  );
};

export default NavBar;
