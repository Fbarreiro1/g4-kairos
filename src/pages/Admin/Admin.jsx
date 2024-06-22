// App.js
import React, { useState, useEffect } from 'react';
import { fetchData } from '../../funciones/Api';
import './Admin.css';
import NavBar from '../../componentes/NavBar/NavBar';
import { useNavigate } from 'react-router-dom'; 
import avatar from '../../media/avatar.png';
import avatar2 from '../../media/avatar2.png';
import avatar3 from '../../media/avatar3.png';
import avatar4 from '../../media/avatar4.png';
import { IconX, IconPlus } from '@tabler/icons-react';
import { formatDate, formatTime } from '../../funciones/formatDate';
import { obtenerDato } from '../../funciones/localStorageUtils.js';





function Admin() {
  const [users, setUsers] = useState([]); 
  const [clinicas, setClinicas] = useState([]); 
  const [pacientes, setPacientes] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [campos, setCampos] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [clickedUsers, setClickedUsers] = useState(false);
  const [clickedClinicas, setClickedClinicas] = useState(false);
  const [clickedPacientes, setClickedPacientes] = useState(false);
  const [clickedTurnos, setClickedTurnos] = useState(false);
  const [clickedCampos, setClickedCampos] = useState(false);
  const [clickedTipos, setClickedTipos] = useState(false);
  const tipo = obtenerDato('tipo');
  const navigate = useNavigate();
  const [formUsers, setFormUsers] = useState({
    USERNAME:'',
    TIPO:'',
    TELEFONO:null,
    PASSWORD:'',
    NOMBRE:'',
    FK_CLINICAS:null,
    EMAIL:null,
    DNI:null,
    CAMPO:null,
    FK_PACIENTE:null
  });

  const [formClinicas, setFormClinicas] = useState({
    NOMBRE:'', 
    DIRECCION:'', 
    EMAIL:'', 
    TELEFONO:'', 
    CAMPOS:''
  });

  const [formPacientes, setFormPacientes] = useState({
    DNI: '',
    NOMBRE: '',
    APELLIDO: '',
    PASSWORD: '',
    TELEFONO: '',
    EMAIL: ''
  });

  const [formTurnos, setFormTurnos] = useState({
    FECHA:'', 
    HORA:'', 
    CAMPO:'', 
    FK_CLINICAS: null, 
    FK_PROFESIONAL: null, 
    FK_PACIENTES:''
  });

  const [formCampos, setFormCampos] = useState({
    NOMBRE: ''
  });

  const [formTipos, setFormTipos] = useState({
    ID: '',
    DESCRIPCION:''
  });

  // aca determina la solapa que esta clickeada
  const [solapa, setSolapa] = useState(1);
  const cambiarSolapa = (value) =>{
    setSolapa(value);
  }

//////FUNCIONES DE MANEJO DE USUARIOS///////////
  const handleClickUsers = () => {
    setClickedUsers(!clickedUsers);
    setFormUsers({
      USERNAME:'',
      TIPO:'',
      TELEFONO: null,
      PASSWORD:'',
      NOMBRE:'',
      FK_CLINICAS:null,
      EMAIL:null,
      DNI:null,
      CAMPO:null,
      FK_PACIENTE:null
    })
  }

  const fetchDataUsersAndUpdate = () => {
    fetchData('usuarios')
      .then(data => setUsers(data))
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    fetchDataUsersAndUpdate();
  }, []);
  
  const handleChangeUsers = (e) =>{
    const {name, value} = e.target;
    setFormUsers({...formUsers, [name]: value});
  }

  
  const handleSubmitUsers = async (e)=>{
    e.preventDefault();
    try{
        await fetchData('USUARIOS', 'POST', formUsers);
        fetchDataUsersAndUpdate();
        handleClickUsers();
    }
    catch (error){
        console.error('Error', error);
    }
  };

  function UsersList({ data, reloadData  }) {
    const handleDeleteUsers = async (id) => {
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
        <li key={item.USERNAME}>
        USERNAME: {item.USERNAME}<br/>
        NOMBRE: {item.NOMBRE}<br/>
        TELEFONO: {item.TELEFONO}<br/>
        CAMPO: {item.N_CAMPO}<br/>
        TIPO: {item.TIPO}<br/>
        CLINICA: {item.FK_CLINICAS}<br/>
        EMAIL: {item.EMAIL}<br/>
        DNI: {item.DNI}
          {/* Botón para eliminar */}
          <div className='deletUserButton' onClick={() => handleDeleteUsers(item.USERNAME)}><IconX/></div>
        </li>
      ))}
    </ul>
  );
}



  //////FUNCIONES DE MANEJO DE CLINICAS///////////
  const handleClickClinicas = () => {
    setClickedClinicas(!clickedClinicas);
    setFormClinicas({
      NOMBRE:'', 
      DIRECCION:'', 
      EMAIL:'', 
      TELEFONO:'', 
      CAMPOS:''
    })
  }

  const fetchDataClinicasAndUpdate = () => {
    fetchData('clinicas')
      .then(data => setClinicas(data))
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    fetchDataClinicasAndUpdate();
  }, []);
  
  const handleChangeClinicas = (e) =>{
    const {name, value} = e.target;
    setFormClinicas({...formClinicas, [name]: value});
  }

  
  const handleSubmitClinicas = async (e)=>{
    e.preventDefault();
    try{
        await fetchData('CLINICAS', 'POST', formClinicas);
        fetchDataClinicasAndUpdate();
        handleClickClinicas();
    }
    catch (error){
        console.error('Error', error);
    }
  };



  function ClinicasList({ data, reloadData  }) {
    const handleDeleteClinicas = async (id) => {
        try {
          await fetchData(`clinicas/${id}`, 'DELETE');
          // Después de eliminar, recargar los datos
          reloadData();
        } catch (error) {
          console.error('Error al eliminar la clinica:', error);
        }
      };

  return (
    <ul>
      {data.map(item => (
        <li key={item.ID}>
        ID: {item.ID}<br/>NOMBRE: {item.NOMBRE}<br/>DIRECCION: {item.DIRECCION}<br/>TELEFONO: {item.TELEFONO}<br/>CAMPO: {item.CAMPOS}
        <div className='deletUserButton' onClick={() => handleDeleteClinicas(item.ID)}><IconX/></div>
          {/* Botón para eliminar */}
        </li>
      ))}
    </ul>
  );
}




//////FUNCIONES DE MANEJO DE PACIENTES///////////
const handleClickPacientes = () => {
  setClickedPacientes(!clickedPacientes);
  setFormPacientes({
    DNI: '', 
    NOMBRE: '', 
    APELLIDO: '', 
    PASSWORD: '', 
    TELEFONO:'', 
    EMAIL:''
  })
}

const fetchDataPacientesAndUpdate = () => {
  fetchData('pacientes')
    .then(data => setPacientes(data))
    .catch(error => console.error('Error:', error));
};

useEffect(() => {
  fetchDataPacientesAndUpdate();
}, []);

const handleChangePacientes = (e) =>{
  const {name, value} = e.target;
  setFormPacientes({...formPacientes, [name]: value});
}


const handleSubmitPacientes = async (e)=>{
  e.preventDefault();
  try{
      await fetchData('PACIENTES', 'POST', formPacientes);

      const nuevoUsuario = {
        USERNAME: formPacientes.DNI,
        NOMBRE: formPacientes.NOMBRE,
        TIPO: 'PA',
        PASSWORD: formPacientes.PASSWORD,
        TELEFONO: formPacientes.TELEFONO,
        FK_CLINICAS: null,
        EMAIL: formPacientes.EMAIL,
        DNI: formPacientes.DNI,
        CAMPO: null,
        FK_PACIENTE: formPacientes.DNI
      };
  
      // Agregar el usuario
      await fetchData('USUARIOS', 'POST', nuevoUsuario);



      fetchDataPacientesAndUpdate();
      fetchDataUsersAndUpdate();
      handleClickPacientes();
  }
  catch (error){
      console.error('Error', error);
  }
};



function PacientesList({ data, reloadData  }) {
  const handleDeletePacientes = async (id) => {
      try {
        await fetchData(`pacientes/${id}`, 'DELETE');
        // Después de eliminar, recargar los datos
        reloadData();
        fetchDataUsersAndUpdate();
      } catch (error) {
        console.error('Error al eliminar el paciente:', error);
      }
    };

return (
  <ul>
    {data.map(item => (
      <li key={item.DNI}>
      NOMBRE: {item.NOMBRE}<br/>APELLIDO: {item.APELLIDO}<br/>DNI: {item.DNI}<br/>TELEFONO: {item.TELEFONO}<br/>EMAIL: {item.EMAIL}
      <div className='deletUserButton' onClick={() => handleDeletePacientes(item.DNI)}><IconX/></div>
        {/* Botón para eliminar */}
      </li>
    ))}
  </ul>
);
}



//////FUNCIONES DE MANEJO DE TURNOS///////////
const handleClickTurnos = () => {
  setClickedTurnos(!clickedTurnos);
  setFormTurnos({
    FECHA:'', 
    HORA:'', 
    CAMPO:'', 
    FK_CLINICAS: null, 
    FK_PROFESIONAL: null, 
    FK_PACIENTES:''
  })
}

const fetchDataTurnosAndUpdate = () => {
  fetchData('turnos')
    .then(data => setTurnos(data))
    .catch(error => console.error('Error:', error));
};

useEffect(() => {
  fetchDataTurnosAndUpdate();
}, []);

const handleChangeTurnos = (e) =>{
  const {name, value} = e.target;
  setFormTurnos({...formTurnos, [name]: value});
}


const handleSubmitTurnos = async (e)=>{
  e.preventDefault();
  try{
      await fetchData('TURNOS', 'POST', formTurnos);
      fetchDataTurnosAndUpdate();
      handleClickTurnos();
  }
  catch (error){
      console.error('Error', error);
  }
};



function TurnosList({ data, reloadData  }) {
  const handleDeleteTurnos = async (id) => {
      try {
        await fetchData(`turnos/${id}`, 'DELETE');
        // Después de eliminar, recargar los datos
        reloadData();
      } catch (error) {
        console.error('Error al eliminar el turno:', error);
      }
    };

return (
  <ul>
    {data.map(item => (
      <li key={item.ID}>
        FECHA: {formatDate(item.FECHA)}<br/>
        HORA: {formatTime(item.HORA)}<br/>
        CAMPO: {item.CAMPO_DESC}<br/>
        CLINICA: {item.CLINICA}<br/>
        PACIENTE: {item.N_PACIENTE} {item.AP_PACIENTE}<br/>
        PROFESIONAL: {item.PROFESIONAL}
        <div className='deletUserButton' onClick={() => handleDeleteTurnos(item.ID)}><IconX/></div>
        {/* Botón para eliminar */}
      </li>
    ))}
  </ul>
);
}



//////FUNCIONES DE MANEJO DE TIPOS///////////
const handleClickTipos = () => {
  setClickedTipos(!clickedTipos);
  setFormTipos({
    ID:'',
    DESCRIPCION:''
  })
}

const fetchDataTiposAndUpdate = () => {
  fetchData('tipos')
    .then(data => setTipos(data))
    .catch(error => console.error('Error:', error));
};

useEffect(() => {
  fetchDataTiposAndUpdate();
}, []);

const handleChangeTipos = (e) =>{
  const {name, value} = e.target;
  setFormTipos({...formTipos, [name]: value});
}


const handleSubmitTipos = async (e)=>{
  e.preventDefault();
  try{
      await fetchData('TIPOS', 'POST', formTipos);
      fetchDataTiposAndUpdate();
      handleClickTipos();
  }
  catch (error){
      console.error('Error', error);
  }
};



function TiposList({ data, reloadData  }) {
  const handleDeleteTipos = async (id) => {
      try {
        await fetchData(`tipos/${id}`, 'DELETE');
        // Después de eliminar, recargar los datos
        reloadData();
      } catch (error) {
        console.error('Error al eliminar el turno:', error);
      }
    };

return (
  <ul>
    {data.map(item => (
      <li key={item.ID}>
        ID: {item.ID}<br/>{item.DESCRIPCION}
        <div className='deletUserButton' onClick={() => handleDeleteTipos(item.ID)}><IconX/></div>
        {/* Botón para eliminar */}
      </li>
    ))}
  </ul>
);
}


//////FUNCIONES DE MANEJO DE CAMPOS///////////
const handleClickCampos = () => {
  setClickedCampos(!clickedCampos);
  setFormCampos({
    NOMBRE:''
  })
}

const fetchDataCamposAndUpdate = () => {
  fetchData('campos')
    .then(data => setCampos(data))
    .catch(error => console.error('Error:', error));
};

useEffect(() => {
  fetchDataCamposAndUpdate();
}, []);

const handleChangeCampos = (e) =>{
  const {name, value} = e.target;
  setFormCampos({...formCampos, [name]: value});
}


const handleSubmitCampos = async (e)=>{
  e.preventDefault();
  try{
      await fetchData('CAMPOS', 'POST', formCampos);
      fetchDataCamposAndUpdate();
      handleClickCampos();
  }
  catch (error){
      console.error('Error', error);
  }
};



function CamposList({ data, reloadData  }) {
  const handleDeleteCampos = async (id) => {
      try {
        await fetchData(`campos/${id}`, 'DELETE');
        // Después de eliminar, recargar los datos
        reloadData();
      } catch (error) {
        console.error('Error al eliminar el turno:', error);
      }
    };

return (
  <ul>
    {data.map(item => (
      <li key={item.ID}>
        ID: {item.ID}<br/>NOMBRE: {item.NOMBRE}
        <div className='deletUserButton' onClick={() => handleDeleteCampos(item.ID)}><IconX/></div>
        {/* Botón para eliminar */}
      </li>
    ))}
  </ul>
);
}





  return (
    <div className='adminContainerAll'>






  {/* CUANDO DAMOS CLICK EN REGISTRAR NUEVO USUARIO ABRE ESTO */}
  <div className={clickedUsers ? 'regVisible' : 'disable'}>
    <div className='registerContainer'>
        <IconX className='xRegister' onClick={handleClickUsers}/>
        <img className='avatarReg avatarReg1' src={avatar} alt='avatar'/>
      <form onSubmit={handleSubmitUsers} className='formRegContainer formRegContainer1'>
      <label className='labelReg labelRegRight'>
        Nombre de usuario:
        <input type="text" name="USERNAME" value={formUsers.USERNAME} onChange={handleChangeUsers} />
      </label>
      <label className='labelReg labelRegRight'>
        Nombre:
        <input type="text" name="NOMBRE" value={formUsers.NOMBRE} onChange={handleChangeUsers} />
      </label>
      <label className='labelReg labelRegRight'>
        DNI:
        <input type="number" name="DNI" value={formUsers.DNI} onChange={handleChangeUsers} />
      </label>
      <label className='labelReg labelRegRight'>
        Email:
        <input type="email" name="EMAIL" value={formUsers.EMAIL} onChange={handleChangeUsers} />
      </label>
      <label className='labelReg labelRegRight'>
        Contraseña:
        <input type="password" name="PASSWORD" value={formUsers.PASSWORD} onChange={handleChangeUsers} />
      </label>
      <label className='labelReg labelRegLeft'>
        Telefono:
        <input type="number" name="TELEFONO" value={formUsers.TELEFONO} onChange={handleChangeUsers} />
      </label>
      <label className='labelReg regCampo'>CAMPO:
      <select name="CAMPO" value={formUsers.CAMPO} onChange={handleChangeUsers} className='selectTipoUser regCampo'>
        <option value="" selected>Seleccionar:</option>
        {/* Mapear las clinicas para generar opciones */}
        {campos.map((campo) => (
          <option key={campo.ID} value={campo.ID}>
            {campo.NOMBRE}
          </option>
        ))} 
      </select>
      </label>
      <label className='labelReg regClinica'>CLINICA:
      <select name="FK_CLINICAS" value={formUsers.FK_CLINICAS} onChange={handleChangeUsers} className='selectTipoUser regClinica'>
        <option value="" selected>Seleccionar:</option>
        {/* Mapear las clinicas para generar opciones */}
        {clinicas.map((clinica) => (
          <option key={clinica.ID} value={clinica.ID}>
            {clinica.NOMBRE}
          </option>
        ))} 
      </select>
      </label>
      <label className='labelReg regTipo'>TIPO DE USUARIO:
      <select name="TIPO" value={formUsers.TIPO} onChange={handleChangeUsers} required className='selectTipoUser regTipo'>
        <option value="" selected>Seleccionar:</option>
        {/* Mapear las clinicas para generar opciones */}
        {tipos.map((tipo) => (
          <option key={tipo.ID} value={tipo.ID}>
            {tipo.DESCRIPCION}
          </option>
        ))} 
      </select>
      </label>
      <button type="submit" className='botReg botRegEnviar'>Enviar</button>
    </form>
    </div>
    </div>


    {/* CUANDO DAMOS CLICK EN REGISTRAR NUEVA CLINICA ABRE ESTO */}
  <div className={clickedClinicas ? 'regVisible' : 'disable'}>
    <div className='registerContainer'>
        <IconX className='xRegister' onClick={handleClickClinicas}/>
        <img className='avatarReg' src={avatar2} alt='avatar'/>
      <form onSubmit={handleSubmitClinicas} className='formRegContainer'>
      <label className='labelReg'>
        Nombre de la clinica:
        <input type="text" name="NOMBRE" value={formClinicas.NOMBRE} onChange={handleChangeClinicas} />
      </label>
      <label className='labelReg'>
        DIRECCION:
        <input type="text" name="DIRECCION" value={formClinicas.DIRECCION} onChange={handleChangeClinicas} />
      </label>
      <label className='labelReg'>
        EMAIL:
        <input type="email" name="EMAIL" value={formClinicas.EMAIL} onChange={handleChangeClinicas} />
      </label>
      <label className='labelReg'>
        TELEFONO:
        <input type="number" name="TELEFONO" value={formClinicas.TELEFONO} onChange={handleChangeClinicas} />
      </label>
      <label className='labelReg'>CAMPO:
      <select name="CAMPOS" value={formClinicas.CAMPOS} onChange={handleChangeClinicas} required className='selectTipoUser itemCampo'>
        <option value="" disabled selected>Seleccionar:</option>
        {/* Mapear las clinicas para generar opciones */}
        {campos.map((campo) => (
          <option key={campo.ID} value={campo.ID}>
            {campo.NOMBRE}
          </option>
        ))} 
      </select>
      </label>
      <button type="submit" className='botReg'>Enviar</button>
    </form>
    </div>
    </div>



    
  {/* CUANDO DAMOS CLICK EN REGISTRAR NUEVO PACIENTE ABRE ESTO */}
  <div className={clickedPacientes ? 'regVisible' : 'disable'}>
    <div className='registerContainer'>
        <IconX className='xRegister' onClick={handleClickPacientes}/>
        <img className='avatarReg' src={avatar} alt='avatar'/>
      <form onSubmit={handleSubmitPacientes} className='formRegContainer'>
      <label className='labelReg'>
        DNI:
        <input type="number" name="DNI" value={formPacientes.DNI} required onChange={handleChangePacientes} />
      </label>
      <label className='labelReg'>
        Nombre:
        <input type="text" name="NOMBRE" value={formPacientes.NOMBRE} required onChange={handleChangePacientes} />
      </label>
      <label className='labelReg'>
        Apellido:
        <input type="text" name="APELLIDO" value={formPacientes.APELLIDO} required onChange={handleChangePacientes} />
      </label>
      <label className='labelReg'>
        Contraseña:
        <input type="password" name="PASSWORD" value={formPacientes.PASSWORD} required onChange={handleChangePacientes} />
      </label>
      <label className='labelReg'>
        Telefono:
        <input type="number" name="TELEFONO" value={formPacientes.TELEFONO} required onChange={handleChangePacientes} />
      </label>
      <label className='labelReg'>
        Email:
        <input type="email" name="EMAIL" value={formPacientes.EMAIL} required onChange={handleChangePacientes} />
      </label>
      <button type="submit" className='botReg'>Enviar</button>
    </form>
    </div>
    </div>



      {/* CUANDO DAMOS CLICK EN REGISTRAR NUEVO TURNO ABRE ESTO */}
  <div className={clickedTurnos ? 'regVisible' : 'disable'}>
    <div className='registerContainer'>
        <IconX className='xRegister' onClick={handleClickTurnos}/>
        <img className='avatarReg' src={avatar3} alt='avatar'/>
      <form onSubmit={handleSubmitTurnos} className='formRegContainer'>
      <label className='labelReg'>
        FECHA:
        <input type="date" name="FECHA" value={formTurnos.FECHA} onChange={handleChangeTurnos} />
      </label>
      <label className='labelReg'>
        HORA:
        <input type="time" name="HORA" value={formTurnos.HORA} onChange={handleChangeTurnos} />
      </label>
      <label className='labelReg'>CAMPO:
      <select name="CAMPO" value={formTurnos.CAMPO} onChange={handleChangeTurnos} required className='selectTipoUser itemCampo'>
        <option value=""  selected>Seleccionar:</option>
        {/* Mapear las clinicas para generar opciones */}
        {campos.map((campo) => (
          <option key={campo.ID} value={campo.ID}>
            {campo.NOMBRE}
          </option>
        ))} 
      </select>
      </label>
      <label className='labelReg'>CLINICA:
      <select name="FK_CLINICAS" value={formTurnos.FK_CLINICAS} onChange={handleChangeTurnos} className='selectTipoUser itemCampo'>
        <option value=""  selected>Seleccionar:</option>
        {/* Mapear las clinicas para generar opciones */}
        {clinicas.map((clinica) => (
          <option key={clinica.ID} value={clinica.ID}>
            {clinica.NOMBRE}
          </option>
        ))} 
      </select>
      </label>
      <label className='labelReg'>PROFESIONAL:
      <select name="FK_PROFESIONAL" value={formTurnos.FK_PROFESIONAL} onChange={handleChangeTurnos} className='selectTipoUser itemCampo'>
        <option value=""  selected>Seleccionar:</option>
        {/* Mapear las clinicas para generar opciones */}
        {users.filter(user => user.TIPO === 'PR').map((user) => (
          <option key={user.USERNAME} value={user.USERNAME}>
            {user.NOMBRE}
          </option>
        ))} 
      </select>
      </label>
      <label className='labelReg'>PACIENTE:
      <select name="FK_PACIENTES" value={formTurnos.FK_PACIENTES} onChange={handleChangeTurnos} required className='selectTipoUser itemCampo'>
        <option value=""  selected>Seleccionar:</option>
        {/* Mapear las clinicas para generar opciones */}
        {pacientes.map((paciente) => (
          <option key={paciente.DNI} value={paciente.DNI}>
            {paciente.NOMBRE} {paciente.APELLIDO}
          </option>
        ))} 
      </select>
      </label>
      <button type="submit" className='botReg'>Enviar</button>
    </form>
    </div>
    </div>



          {/* CUANDO DAMOS CLICK EN REGISTRAR NUEVO CAMPO ABRE ESTO */}
  <div className={clickedCampos ? 'regVisible' : 'disable'}>
    <div className='registerContainer'>
        <IconX className='xRegister' onClick={handleClickCampos}/>
        <img className='avatarReg' src={avatar4} alt='avatar'/>
      <form onSubmit={handleSubmitCampos} className='formRegContainer'>
      <label className='labelReg'>
        PROFESION:
        <input type="text" name="NOMBRE" value={formCampos.NOMBRE} onChange={handleChangeCampos} />
      </label>
      <button type="submit" className='botReg'>Enviar</button>
    </form>
    </div>
    </div>

              {/* CUANDO DAMOS CLICK EN REGISTRAR NUEVO TIPO ABRE ESTO */}
  <div className={clickedTipos ? 'regVisible' : 'disable'}>
    <div className='registerContainer'>
        <IconX className='xRegister' onClick={handleClickTipos}/>
        <img className='avatarReg' src={avatar} alt='avatar'/>
      <form onSubmit={handleSubmitTipos} className='formRegContainer'>
      <label className='labelReg'>
        ID:
        <input type="text" maxLength="2" name="ID" value={formTipos.ID} onChange={handleChangeTipos} />
      </label>
      <label className='labelReg'>
        DESCRIPCION:
        <input type="text" name="DESCRIPCION" value={formTipos.DESCRIPCION} onChange={handleChangeTipos} />
      </label>
      <button type="submit" className='botReg'>Enviar</button>
    </form>
    </div>
    </div>

        <NavBar/>


 {/* CONTENEDOR DE LAS SOLAPAS ADMINISTRADOR */}
  <div className={tipo === 'AD' ? 'list-group solapasContainer' : 'disable'}>
  <button type="button" onClick={()=> cambiarSolapa(1)} className={solapa===1 ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} aria-current="true">USUARIOS</button>
  <button type="button" onClick={()=> cambiarSolapa(2)} className={solapa===2 ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} >CLINICAS</button>
  <button type="button" onClick={()=> cambiarSolapa(3)} className={solapa===3 ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>PACIENTES</button>
  <button type="button" onClick={()=> cambiarSolapa(4)} className={solapa===4 ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>TURNOS</button>
  <button type="button" onClick={()=> cambiarSolapa(5)} className={solapa===5 ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>CAMPOS</button>
  <button type="button" onClick={()=> cambiarSolapa(6)} className={solapa===6 ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>TIPOS</button>
</div>


 {/* CONTENEDOR DE LAS SOLAPAS COORDINADOR */}
 <div className={tipo === 'CO' ? 'list-group solapasContainer' : 'disable'}>
  <button type="button" onClick={()=> cambiarSolapa(2)} className={solapa===2 ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'} aria-current="true">CLINICAS</button>
  <button type="button" onClick={()=> cambiarSolapa(3)} className={solapa===3 ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>PACIENTES</button>
  <button type="button" onClick={()=> cambiarSolapa(4)} className={solapa===4 ? 'list-group-item list-group-item-action active' : 'list-group-item list-group-item-action'}>TURNOS</button>
</div>



    {/* MODULO USUARIOS/REGISTRAR NUEVO USUARIO */}
    <div className={solapa === 1 ? 'moduloRegData activeModule' : 'disable'}>
    <h3>USUARIOS</h3>
    <UsersList data={users} reloadData={fetchDataUsersAndUpdate}/>
    <div onClick={handleClickUsers} className='regButtonNew'><IconPlus/></div>
    </div>


     {/* MODULO ADMINISTRACION DE CLINICAS */}
     <div className={solapa === 2 ? 'moduloRegData activeModule' : 'disable'}>
    <h3>CLINICAS</h3>
    <ClinicasList data={clinicas} reloadData={fetchDataClinicasAndUpdate}/>
    <div onClick={handleClickClinicas} className='regButtonNew'><IconPlus/></div>
    </div>

         {/* MODULO ADMINISTRACION DE PACIENTES */}
         <div className={solapa === 3 ? 'moduloRegData activeModule' : 'disable'}>
    <h3>PACIENTES</h3>
    <PacientesList data={pacientes} reloadData={fetchDataPacientesAndUpdate}/>
    <div onClick={handleClickPacientes} className='regButtonNew'><IconPlus/></div>
    </div>

         {/* MODULO ADMINISTRACION DE TURNOS */}
         <div className={solapa === 4 ? 'moduloRegData activeModule' : 'disable'}>
    <h3>TURNOS</h3>
    <TurnosList data={turnos} reloadData={fetchDataTurnosAndUpdate}/>
    <div onClick={handleClickTurnos} className='regButtonNew'><IconPlus/></div>
    </div>


{/* MODULO ADMINISTRACION DE CAMPOS */}
<div className={solapa === 5 ? 'moduloRegData activeModule' : 'disable'}>
    <h3>CAMPOS</h3>
    <CamposList data={campos} reloadData={fetchDataCamposAndUpdate}/>
    <div onClick={handleClickCampos} className='regButtonNew'><IconPlus/></div>
    </div>

    {/* MODULO ADMINISTRACION DE TIPOS */}
<div className={solapa === 6 ? 'moduloRegData activeModule' : 'disable'}>
    <h3>TIPOS</h3>
    <TiposList data={tipos} reloadData={fetchDataTiposAndUpdate}/>
    <div onClick={handleClickTipos} className='regButtonNew'><IconPlus/></div>
    </div>

    </div>
  );
}

export default Admin;
