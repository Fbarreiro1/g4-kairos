import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { eliminarDato, obtenerDato  } from '../../funciones/localStorageUtils.js';
import './NavBar.css'

const NavBar = () => {
  const navigate = useNavigate();
  const tipo = obtenerDato('tipo');
  const usuario = obtenerDato('nombre_usuario');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(tipo === 'A');
  }, [tipo]);


  const handleExit = () => {
    eliminarDato('nombre_usuario');
    eliminarDato('tipo');
    navigate('/');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link to={'/home'} className="navbar-brand">Navbar</Link>
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
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {usuario}
          </a>
          <ul className="dropdown-menu">
            <li> <Link to={'/'} className="dropdown-divider"/></li>
            <li> <div className="dropdown-item exitButton" onClick={handleExit}>Salir</div></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  );
};

export default NavBar;
