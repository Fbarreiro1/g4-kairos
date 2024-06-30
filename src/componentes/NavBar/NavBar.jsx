import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { eliminarDato, obtenerDato  } from '../../funciones/localStorageUtils.js';
import logo from '../../media/logo.jpg';
import {IconLogout} from '@tabler/icons-react';

import './NavBar.css'

const NavBar = () => {
  const navigate = useNavigate();
  const tipo = obtenerDato('tipo');
  const nombreUsuario = obtenerDato('USERNAME');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProf, setIsProf] = useState(false);
  const [isClin, setIsClin] = useState(false);

  useEffect(() => {
    setIsAdmin(tipo === 'AD' || tipo === 'CO');
  }, [tipo]);



  useEffect(() => {
    setIsProf(tipo === 'PR');
  }, [tipo]);

  useEffect(() => {
    setIsClin(tipo === 'CL');
  }, [tipo]);


  


  const handleExit = () => {
    eliminarDato('USERNAME');
    eliminarDato('tipo');
    eliminarDato('clinica');
    eliminarDato('campo');
    navigate('/');
  }

  return (
    <div>
      <nav className="navbarContainer">
  <div className="container-fluid-cont">
    <Link to={'/home'} className="navbar-brand-cont"><img src={logo} alt='logo de una G y un 4' className='logoNavBar'/></Link>
    <div>
      <ul className="navbar-nav-cont">
        <li className="nav-item-cont">
        <Link to={'/home'} className="nav-link-cont active" aria-current="page">Home</Link>
        </li>
        <li className="nav-item-cont">
        <Link to={'/admin'} className={isAdmin ? 'isAdmin nav-link-cont' : 'notAdmin nav-link-cont'}>Administrador</Link>
        <Link to={'/turnos-disponibles'} className={isProf ? 'isAdmin nav-link-cont' : 'notAdmin nav-link-cont'}>Turnos Disponibles</Link>
        <Link to={'/turnos-disponibles'} className={isClin ? 'isAdmin nav-link-cont' : 'notAdmin nav-link-cont'}>Turnos Disponibles</Link>
        </li>
        <li className="nav-item-cont ">
          <a className="nav-link-cont " aria-expanded="false" onClick={handleExit}>
          {nombreUsuario}<IconLogout className='iconLogout'/>
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  );
};

export default NavBar;
