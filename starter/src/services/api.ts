// Cliente Axios: un solo lugar para configurar cómo hablamos con la API.
import axios from 'axios';

// Dirección de la API. Se puede cambiar con la variable EXPO_PUBLIC_API_URL
// (por ejemplo, en un archivo .env.local) sin tocar el código.
// Por defecto usamos DummyJSON, una API de práctica con productos reales.
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://dummyjson.com';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000, // si tarda más de 10 segundos, falla
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor: se ejecuta con cada respuesta.
// Si falla, deja un aviso en la consola (solo en desarrollo) y sigue el error.
apiClient.interceptors.response.use(
  (respuesta) => respuesta,
  (error: unknown) => {
    if (__DEV__ && axios.isAxiosError(error)) {
      console.warn('[API]', error.response?.status ?? 'sin respuesta', error.config?.url);
    }
    return Promise.reject(error);
  }
);

// Convierte cualquier error en un mensaje corto y entendible para la persona
export function mensajeDeError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) return 'No hay conexión con el servidor. Revisa tu internet.';
    return `El servidor respondió con un error (${error.response.status}).`;
  }
  return 'Ocurrió un error inesperado.';
}
