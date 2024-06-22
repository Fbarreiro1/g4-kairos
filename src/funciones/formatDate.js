export function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  }



export function formatTime(timeString) {
  const [hour, minute] = timeString.split(':');

  if (!hour || !minute || hour.length !== 2 || minute.length !== 2) {
    throw new Error('Hora no válida. Debe estar en el formato HH:MM');
  }

  // Formato de 24 horas
  const formattedTime = `${hour}:${minute}`;
  return formattedTime;
}