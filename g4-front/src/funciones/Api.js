const BASE_URL = REACT_APP_BACKEND_URL;

export const fetchData = async (endpoint, method = 'GET', body = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Error al realizar la solicitud: ${response.status}`);
    }
    const data = await response.json();
    console.log('Datos recibidos:', data); // Agregar esto para ver los datos
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
