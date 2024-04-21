// App.js
import React, { useState, useEffect } from 'react';
import { fetchData } from '../../funciones/Api';
import './Admin.css';
import NavBar from '../../componentes/NavBar/NavBar';
import { useNavigate } from 'react-router-dom'; 
import avatar from '../../media/avatar.png';
import { IconX, IconArrowRight } from '@tabler/icons-react';





function Admin() {
  const [data, setData] = useState([]); 
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre_usuario: '',
    password: '',
    email: '',
    tipo: ''
  });

  // aca determina la solapa que esta clickeada
  const [solapa, setSolapa] = useState(1);
  const cambiarSolapa = (value) =>{
    setSolapa(value);
  }


  const handleClick = () => {
    setClicked(!clicked);
    setFormData({
        nombre_usuario:'',
        password:'',
        email:'',
        tipo:''
    })
  }

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

  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
        await fetchData('usuarios', 'POST', formData);
        fetchDataAndUpdate();
        handleClick();
    }
    catch (error){
        console.error('Error', error);
    }
  };


  function DataList({ data, reloadData  }) {
    const handleDelete = async (id) => {
        try {
          await fetchData(`usuarios/${id}`, 'DELETE');
          // Después de eliminar, recargar los datos
          reloadData();
        } catch (error) {
          console.error('Error al eliminar el usuario:', error);
        }
      };

  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>
        <div className='deletUserButton' onClick={() => handleDelete(item.id)}><IconX/></div>
          {item.nombre_usuario}, {item.password}, {item.email}, {item.tipo}
          {/* Botón para eliminar */}
        </li>
      ))}
    </ul>
  );
}



  return (
    <div>






  {/* CUANDO DAMOS CLICK EN REGISTRAR NUEVO USUARIO ABRE ESTO */}
  <div className={clicked ? 'regVisible' : 'disable'}>
    <div className='registerContainer'>
        <IconX className='xRegister' onClick={handleClick}/>
        <img className='avatarReg' src={avatar} alt='avatar'/>
      <form onSubmit={handleSubmit} className='formRegContainer'>
      <label className='labelReg'>
        Nombre de usuario:
        <input type="text" name="nombre_usuario" value={formData.nombre_usuario} onChange={handleChange} />
      </label>
      <label className='labelReg'>
        Contraseña:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <label className='labelReg'>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <select name="tipo" value={formData.tipo} onChange={handleChange} required className='selectTipoUser'>
        <option value="" disabled selected>Tipo de usuario:</option>
        <option value="A">Administrador</option>
        <option value="P">Profesional</option>
        <option value="C">Clinica</option>
      </select>
      <button type="submit" className='botReg'>Enviar</button>
    </form>
    </div>
    </div>


        <NavBar/>


 {/* CONTENEDOR DE LAS SOLAPAS */}
  <div className="list-group solapasContainer">
  <button type="button" onClick={()=> cambiarSolapa(1)} className={solapa===1 ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} aria-current="true">Usuarios</button>
  <button type="button" onClick={()=> cambiarSolapa(2)} className={solapa===2 ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} >Turnos Profesionales</button>
  <button type="button" onClick={()=> cambiarSolapa(3)} className={solapa===3 ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>Turnos Clinicas</button>
  <button type="button" onClick={()=> cambiarSolapa(4)} className={solapa===4 ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>Pacientes</button>
</div>



    {/* MODULO USUARIOS/REGISTRAR NUEVO USUARIO */}
    <div className={solapa === 1 ? 'moduloRegUsers activeModule' : 'disable'}>
    <h3>Usuarios registrados</h3>
    <DataList data={data} reloadData={fetchDataAndUpdate}/>
    <div onClick={handleClick} className='regButtonNew'>Registrar nuevo usuario <IconArrowRight/></div>
    </div>


     {/* MODULO ADMINISTRACION DE TURNOS PROFESIONALES */}
     <div className={solapa === 2 ? 'moduloRegProf activeModule' : 'disable'}>
    <h3>Turnos profesionales</h3>
    </div>

         {/* MODULO ADMINISTRACION DE TURNOS CLINICAS */}
         <div className={solapa === 3 ? 'moduloRegProf activeModule' : 'disable'}>
    <h3>Turnos clinicas</h3>
    </div>

         {/* MODULO ADMINISTRACION DE PACIENTES */}
         <div className={solapa === 4 ? 'moduloRegProf activeModule' : 'disable'}>
    <h3>Administracion de pacientes</h3>
    </div>


    </div>
  );
}

export default Admin;
