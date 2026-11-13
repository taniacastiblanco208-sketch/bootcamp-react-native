// Hooks que piden los muebles a la API con TanStack Query.
// Las pantallas usan estos hooks y no llaman a Axios directamente.
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import { aMueble } from '../services/mappers';
import { Mueble, ProductoApi } from '../types';

// Nombre del "cajón" del caché donde se guarda la lista.
// Lo usamos en un solo lugar para no equivocarnos al invalidarla.
export const MUEBLES_QUERY_KEY = ['muebles'] as const;

// La API devuelve la lista dentro de "products"
interface RespuestaLista {
  products: ProductoApi[];
}

// Lista de muebles
export function useMuebles() {
  return useQuery<Mueble[]>({
    queryKey: MUEBLES_QUERY_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<RespuestaLista>(
        '/products/category/furniture'
      );
      return data.products.map(aMueble);
    },
  });
}

// Un solo mueble por id (se usa en el detalle, con datos frescos del servidor)
export function useMueble(id: string) {
  return useQuery<Mueble>({
    queryKey: [...MUEBLES_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await apiClient.get<ProductoApi>(`/products/${id}`);
      return aMueble(data);
    },
    enabled: id !== '', // solo corre si hay un id
  });
}
