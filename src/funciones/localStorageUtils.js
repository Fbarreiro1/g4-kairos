// localStorageUtils.js

export function guardarDato(key, valor) {
    localStorage.setItem(key, JSON.stringify(valor));
  }
  
  export function obtenerDato(key) {
    const valor = localStorage.getItem(key);
    return valor ? JSON.parse(valor) : null;
  }
  
  export function eliminarDato(key) {
    localStorage.removeItem(key);
  }
  