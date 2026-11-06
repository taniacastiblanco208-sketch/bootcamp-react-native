// Store de Zustand: guarda los muebles que la persona marca como "Guardados".
// Un store es un lugar central donde vive el estado, y cualquier pantalla
// puede leerlo o cambiarlo sin pasar props de una a otra.
import { create } from 'zustand';
import { Mueble } from '../types';

// Qué datos y qué acciones tiene el store
interface SavedStore {
  items: Mueble[]; // muebles guardados
  addItem: (mueble: Mueble) => void; // guarda un mueble (sin repetirlo)
  removeItem: (id: string) => void; // quita un mueble por su id
  clearAll: () => void; // quita todos
  isItemSaved: (id: string) => boolean; // ¿este mueble ya está guardado?
}

// useSavedStore es el "hook" que usan las pantallas para leer el store
export const useSavedStore = create<SavedStore>((set, get) => ({
  items: [],

  addItem: (mueble) => {
    // Si ya está guardado, no hacemos nada (evita duplicados)
    if (get().items.some((m) => m.id === mueble.id)) return;
    set((state) => ({ items: [...state.items, mueble] }));
  },

  removeItem: (id) => {
    // Nos quedamos con todos los muebles menos el que tiene ese id
    set((state) => ({ items: state.items.filter((m) => m.id !== id) }));
  },

  clearAll: () => {
    set({ items: [] });
  },

  isItemSaved: (id) => get().items.some((m) => m.id === id),
}));
