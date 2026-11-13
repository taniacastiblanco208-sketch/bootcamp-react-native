// Hook para eliminar un mueble (DELETE) con TanStack Query.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import { Mueble } from '../types';
import { MUEBLES_QUERY_KEY } from './useMuebles';

export function useDeleteMueble() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    // Qué se hace al "mutar": pedir a la API que borre el mueble por su id
    mutationFn: async (id) => {
      await apiClient.delete(`/products/${id}`);
    },
    // Si salió bien:
    onSuccess: (_datos, id) => {
      // 1. Quitamos el mueble de la lista que ya tenemos en caché,
      //    así desaparece de la pantalla al instante.
      queryClient.setQueryData<Mueble[]>(MUEBLES_QUERY_KEY, (lista) =>
        lista ? lista.filter((m) => m.id !== id) : lista
      );
      // 2. Marcamos la lista como vieja (invalidación). Usamos
      //    refetchType 'none' porque DummyJSON solo simula el borrado:
      //    si pidiéramos la lista de nuevo, el mueble reaparecería.
      queryClient.invalidateQueries({
        queryKey: MUEBLES_QUERY_KEY,
        refetchType: 'none',
      });
    },
  });
}
