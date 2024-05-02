// App.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Exit.css';
import coverImg from '../../media/coverWelcome.jpg';
import logo from '../../media/logo.jpg';




function Exit() {

  return (
    <div className='welcomeContainer'>
        <img src={coverImg} alt='imagen difuminada de una clinica' className='coverImgWelcom'/>
        <img src={logo} alt='logo con una G y un 4' className='logoHome'/>
        <h1>Te damos la bienvenida a nuestro sistema de turnos</h1>
        <h3>Para continuar por favor inicie sesión</h3>
        <Link to={'/login'} className='linkWelcome'>INGRESAR</Link>
    </div>
  );
}

export default Exit;
