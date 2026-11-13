// Hook para crear un mueble nuevo (POST) con TanStack Query.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import { aMueble, COP_POR_USD } from '../services/mappers';
import { CrearMueblePayload, Mueble, ProductoApi } from '../types';
import { MUEBLES_QUERY_KEY } from './useMuebles';

export function useCreateMueble() {
  const queryClient = useQueryClient();

  return useMutation<Mueble, Error, CrearMueblePayload>({
    // Qué se hace al "mutar": enviar el mueble nuevo a la API
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<ProductoApi>('/products/add', {
        title: payload.nombre,
        description: payload.descripcion,
        price: payload.precio / COP_POR_USD, // la API trabaja en dólares
        category: 'furniture',
        tags: [payload.categoria.toLowerCase()],
      });
      return aMueble(data);
    },
    // Si salió bien: marcamos la lista como vieja para que se vuelva a pedir
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MUEBLES_QUERY_KEY });
    },
  });
}
