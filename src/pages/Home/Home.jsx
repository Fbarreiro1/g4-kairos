// App.js
import React, { useState, useEffect } from 'react';
import { fetchData } from '../../funciones/Api';
import './Home.css';
import NavBar from '../../componentes/NavBar/NavBar';
import { obtenerDato } from '../../funciones/localStorageUtils.js';
import { IconX, IconArrowRight } from '@tabler/icons-react';
import { formatDate, formatTime } from '../../funciones/formatDate';
import { Link } from 'react-router-dom';



function Home() {
  const nombreUsuario = obtenerDato('USERNAME');
  const tipo = obtenerDato('tipo');
  const clinica = obtenerDato('clinica');
  const [turnosAdmin, setTurnosAdmin] = useState([]);
  const [turnosProf, setTurnosProf] = useState([]);
  const [turnosClin, setTurnosClin] = useState([]);
  const [turnosPac, setTurnosPac] = useState([]);





  // SECCION DE FUNCIONES PARA HOME PROFESIONAL

  const fetchDataProfAndUpdate = () => {
    fetchData(`turnos-prof/${nombreUsuario}`, 'GET')
      .then(data => setTurnosProf(data))
      .catch(error => console.error('Error:', error));
  };
  
  useEffect(() => {
    fetchDataProfAndUpdate();
  }, [nombreUsuario]);
  

  
  
  function ProfList({data, reloadData}) {
    const handleCancelarTurnos = async (id) => {
      try {
        await fetchData(`turnos-prof/${id}`, 'POST');
        reloadData();
      } catch (error) {
        console.error('Error al eliminar el turno:', error);
        alert('Error al eliminar el turno');
      }
    };
    return (
      <div>
      <div className={turnosProf.length === 0 ? 'noTurnos' : 'disable'}><span>NO HAY TURNOS<br/>ASIGNADOS</span>
      <Link className='turnosDispButton' to={'/turnos-disponibles'}><IconArrowRight/>VER TURNOS DISPOBILES</Link>  
      </div>
      <div class="grid-container">
      {turnosProf.map(turno => (
      <div className="grid-item">
        FECHA: {formatDate(turno.FECHA)}<br/>
        HORA: {formatTime(turno.HORA)}<br/>
        CLINICA: {turno.NOMBRE} - {turno.DIRECCION}<br/>
        PACIENTE: {turno.N_PACIENTE} {turno.AP_PACIENTE} - DNI: {turno.P_DNI} - TELEFONO: {turno.P_TELEFONO}<br/>
        PROFESIONAL: {turno.PROFESIONAL}<br/>
        CAMPO: {turno.CAMPO}
        <div className='cancelarButton' key={turno.ID} onClick={() => handleCancelarTurnos(turno.ID)}>Cancelar turno <IconX/></div>
      </div>
    ))}
      </div>
      </div>
    );
    }



      // SECCION DE FUNCIONES PARA HOME CLINICA

  const fetchDataClinAndUpdate = () => {
    fetchData(`turnos-clin/${clinica}`, 'GET')
      .then(data => setTurnosClin(data))
      .catch(error => console.error('Error:', error));
  };
  
  useEffect(() => {
    fetchDataClinAndUpdate();
  }, [clinica]);
  

  
  
  function ClinList({data, reloadData}) {
    const handleCancelarTurnosClin = async (id) => {
      try {
        await fetchData(`turnos-clin/${id}`, 'POST');
        reloadData();
      } catch (error) {
        console.error('Error al eliminar el turno:', error);
        alert('Error al eliminar el turno');
      }
    };
    return (
      <div>
      <div className={turnosClin.length === 0 ? 'noTurnos' : 'disable'}><span>NO HAY TURNOS<br/>ASIGNADOS</span>
      <Link className='turnosDispButton' to={'/turnos-disponibles'}><IconArrowRight/>VER TURNOS DISPOBILES</Link>  
      </div>
      <div className="grid-container">
      {turnosClin.map(turno => (
      <div className="grid-item">
       FECHA: {formatDate(turno.FECHA)}<br/>
       HORA: {formatTime(turno.HORA)}<br/>
        CLINICA: {turno.NOMBRE} - {turno.DIRECCION}<br/>
        PACIENTE: {turno.N_PACIENTE} {turno.AP_PACIENTE} - DNI: {turno.P_DNI} - TELEFONO: {turno.P_TELEFONO}<br/>
        PROFESIONAL: {turno.PROFESIONAL}<br/>
        CAMPO: {turno.CAMPO}
        <div className='cancelarButton' key={turno.ID} onClick={() => handleCancelarTurnosClin(turno.ID)}>Cancelar turno <IconX/></div>
      </div>
      
    ))}
      </div>
      </div>
    );
    }



          // SECCION DE FUNCIONES PARA HOME PACIENTES

  const fetchDataPacAndUpdate = () => {
    fetchData(`turnos-pac/${nombreUsuario}`, 'GET')
      .then(data => setTurnosPac(data))
      .catch(error => console.error('Error:', error));
  };
  
  useEffect(() => {
    fetchDataPacAndUpdate();
  }, [nombreUsuario]);
  

  
  
  function PacList({data, reloadData}) {
    return (<div>
      <div className={turnosPac.length === 0 ? 'noTurnos' : 'disable'}><span>NO HAY TURNOS<br/>ASIGNADOS</span></div>
      <div className="grid-container">
      {turnosPac.map(turno => (
      <div className="grid-item">
       FECHA: {formatDate(turno.FECHA)}<br/>
       HORA: {formatTime(turno.HORA)}<br/>
        CLINICA: {turno.NOMBRE} - {turno.DIRECCION}<br/>
        PROFESIONAL: {turno.PROFESIONAL}<br/>
        CAMPO: {turno.CAMPO}
      </div>
    ))}
      </div>
      </div>
    );
    }

  //   // SECCION DE FUNCIONES PARA HOME ADMINISTRADOR

  const fetchDataAdminAndUpdate = () => {
    fetchData('turnos')
    .then(data => setTurnosAdmin(data))
    .catch(error => console.error('Error:', error));
  };
  
  useEffect(() => {
    fetchDataAdminAndUpdate();
  }, []);

  
  
  function AdminList({ data, reloadData  }) {
    const handleCancelarTurnos = async (id) => {
        try {
          await fetchData(`turnos/${id}`, 'DELETE');
          reloadData();
        } catch (error) {
          console.error('Error al eliminar el turno:', error);
          alert('Error al eliminar el turno');
        }
      };

      return (
        <div>
        <div className={turnosAdmin.length === 0 ? 'noTurnos' : 'disable'}><span>NO HAY TURNOS<br/>PENDIENTES</span></div>
        <div className="grid-container">
      {turnosAdmin.map(turno => (
      <div className="grid-item">
        FECHA: {formatDate(turno.FECHA)}<br/>
        HORA: {formatTime(turno.HORA)}<br/>
        CLINICA: {turno.CLINICA}<br/>
        PACIENTE: {turno.N_PACIENTE} {turno.AP_PACIENTE}<br/>
        PROFESIONAL: {turno.PROFESIONAL}<br/>
        CAMPO: {turno.CAMPO_DESC}
        <div className='cancelarButton' key={turno.ID} onClick={() => handleCancelarTurnos(turno.ID)}>Cancelar turno <IconX/></div>
      </div>
    ))}
      </div>
      </div>
      );
      }
  




  return (
    <div className='homeContainerAll'>
        <NavBar/>
      <div className='homeContainer'>

        {/* HOME ADMINISTRADOR */}
      <div className={tipo === 'AD' ? '' : 'disable'}> 
        <AdminList data={turnosAdmin} reloadData={fetchDataAdminAndUpdate}/>
        </div>
      
        {/* HOME ADMINISTRADOR */}
        <div className={tipo === 'CO' ? '' : 'disable'}> 
        <AdminList data={turnosAdmin} reloadData={fetchDataAdminAndUpdate}/>
        </div>

    {/* HOME PROFESIONAL */}
      <div className={tipo === 'PR' ? '' : 'disable'}> 
        <div className='homeProf'>
        <ProfList data={turnosProf} reloadData={fetchDataProfAndUpdate}/>
          </div>

      </div>



    {/* HOME CLINICA */}
      <div className={tipo === 'CL' ? '' : 'disable'}>
      <div className='homeProf'>
        <ClinList data={turnosClin} reloadData={fetchDataClinAndUpdate}/>
          </div>
      </div>

      {/* HOME PACIENTE */}
      <div className={tipo === 'PA' ? '' : 'disable'}>
      <PacList data={turnosPac} reloadData={fetchDataPacAndUpdate}/>
      </div>
      </div>
    </div>
  );
}

export default Home;
