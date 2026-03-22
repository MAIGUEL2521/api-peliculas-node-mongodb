import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:4000',
  timeout: 7000,
});

const endpoints = ['/api/medias', '/media', '/medias'];


export const getMedia = async () => {
  for (const path of endpoints) {
    try {
      const response = await apiClient.get(path);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        continue;
      }
      if (error.code === 'ECONNREFUSED') {
        throw new Error('No se pudo conectar a backend en 127.0.0.1:4000. ¿Servidor levantado?');
      }
      if (error.response) {
        throw new Error(`${path} falló con ${error.response.status}`);
      }
      throw error;
    }
  }
  throw new Error('No disponible ningún endpoint de media');
};
