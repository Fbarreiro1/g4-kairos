// App.js
import React, { useState, useEffect } from 'react';
import { fetchData } from '../../funciones/Api.js';
import './TurnosDisponibles.css';
import NavBar from '../../componentes/NavBar/NavBar';
import { obtenerDato } from '../../funciones/localStorageUtils.js';
import { IconCheck,IconArrowRight } from '@tabler/icons-react';
import { formatDate, formatTime } from '../../funciones/formatDate';
import { Link } from 'react-router-dom';



function TurnosDisponibles() {
  const nombreUsuario = obtenerDato('USERNAME');
  const campo = obtenerDato('campo');
  const clinica = obtenerDato('clinica');
  const tipo = obtenerDato('tipo');
  const [turnosProf, setTurnosProf] = useState([]);
  const [turnosClin, setTurnosClin] = useState([]);


  // SECCION DE FUNCIONES PARA TURNOS DISPONIBLES PROFESIONAL


  const fetchDataTurnosProfAndUpdate = () => {
    fetchData(`turnos-disp/${campo}`, 'GET')
      .then(data => setTurnosProf(data))
      .catch(error => console.error('Error:', error));
  };
  
  useEffect(() => {
    fetchDataTurnosProfAndUpdate();
  }, [campo]);
  

  
  
   function TurnosProfList({data}) {
     const handleAsignarTurnoProf = async (id) => {
       try {
         const body = { turnoId: id, profId: nombreUsuario};
         await fetchData(`turnos-disp/${id}`, 'POST', body);
        // Después de eliminar, recargar los datos
         fetchDataTurnosProfAndUpdate();
       } catch (error) {
         console.error('Error al eliminar el turno:', error);
       }
     };
  
   return (
    <div>
    <div className={turnosProf.length === 0 ? 'noTurnos' : 'disable'}><span>NO HAY TURNOS<br/>DISPONIBLES</span>
      <Link className='turnosDispButton' to={'/home'}><IconArrowRight/>VER TURNOS ASIGNADOS</Link>  
      </div>
    <div class="grid-container">
    {turnosProf.map(turno => (
    <div className="grid-item" key={turno.ID}>
      FECHA: {formatDate(turno.FECHA)}<br/>
      HORA: {formatTime(turno.HORA)}<br/>
      CLINICA: {turno.NOMBRE} - {turno.DIRECCION}<br/>
      PACIENTE: {turno.N_PACIENTE} {turno.AP_PACIENTE} - DNI: {turno.P_DNI} - TELEFONO: {turno.P_TELEFONO}<br/>
      <div className='asignarButton' onClick={() => handleAsignarTurnoProf(turno.ID)}>Tomar turno <IconCheck/></div>
    </div>
  ))}
    </div>
    </div>
           
   );
   }




   // SECCION DE FUNCIONES PARA TURNOS DISPONIBLES CLINICA


  const fetchDataTurnosClinAndUpdate = () => {
    fetchData(`turnos-disp-clin/${campo}`, 'GET')
      .then(data => setTurnosClin(data))
      .catch(error => console.error('Error:', error));
  };
  
  useEffect(() => {
    fetchDataTurnosClinAndUpdate();
  }, [campo]);
  

  
  
   function TurnosClinList({data}) {
     const handleAsignarTurnoClin= async (id) => {
       try {
         const body = { turnoId: id, clinId: clinica};
         await fetchData(`turnos-disp-clin/${id}`, 'POST', body);
        // Después de eliminar, recargar los datos
         fetchDataTurnosClinAndUpdate();
       } catch (error) {
         console.error('Error al eliminar el turno:', error);
       }
     };
  
   return (
    <div>
    <div className={turnosClin.length === 0 ? 'noTurnos' : 'disable'}><span>NO HAY TURNOS<br/>DISPONIBLES</span>
      <Link className='turnosDispButton' to={'/home'}><IconArrowRight/>VER TURNOS ASIGNADOS</Link>  
      </div>
    <div class="grid-container">
    {turnosClin.map(turno => (
    <div className="grid-item" key={turno.ID}>
      FECHA: {formatDate(turno.FECHA)}<br/>
      HORA: {formatTime(turno.HORA)}<br/>
      CAMPO: {turno.CAMPO_DESC}<br/>
      PACIENTE: {turno.N_PACIENTE} {turno.AP_PACIENTE} - DNI: {turno.P_DNI} - TELEFONO: {turno.P_TELEFONO}<br/>
      <div className='asignarButton' onClick={() => handleAsignarTurnoClin(turno.ID)}>Tomar turno <IconCheck/></div>
    </div>
  ))}
    </div>
    </div>      
   );
   }

  return (
    <div className='dispContainerAll'>
        <NavBar/>
        <div className={tipo === 'PR' ? '' : 'disable'}>
          <TurnosProfList data={turnosProf} reloadData={fetchDataTurnosProfAndUpdate}/>
        </div>
        <div className={tipo === 'CL' ? '' : 'disable'}>
          hola
          <TurnosClinList data={turnosClin} reloadData={fetchDataTurnosClinAndUpdate}/>
        </div>
        
    </div>
  );
}

export default TurnosDisponibles;
