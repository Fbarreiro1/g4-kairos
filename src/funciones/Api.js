const BASE_URL = 'http://localhost:3000'; // La URL de tu servidor Node.js

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
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
