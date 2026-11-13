// Tipos del dominio: tienda de muebles.

// Categorías posibles de un mueble
export type CategoriaMueble = 'Sala' | 'Comedor' | 'Dormitorio' | 'Oficina';

// Lista de categorías (sirve para mostrar opciones en el formulario)
export const CATEGORIAS: CategoriaMueble[] = [
  'Sala',
  'Comedor',
  'Dormitorio',
  'Oficina',
];

// Un mueble del catálogo (el formato que usa toda la app)
export interface Mueble {
  id: string;
  nombre: string;
  categoria: CategoriaMueble;
  material?: string; // no todas las fuentes de datos lo traen
  marca?: string;
  descripcion?: string;
  precio: number; // en pesos colombianos (COP)
  imagen: string; // URL de la foto
  enStock: boolean;
}

// Lo que se envía para crear un mueble nuevo (sin id: lo asigna el servidor)
export interface CrearMueblePayload {
  nombre: string;
  categoria: CategoriaMueble;
  descripcion: string;
  precio: number; // en pesos colombianos (COP)
}

// Así responde la API (DummyJSON) para cada producto.
// Solo declaramos los campos que usamos.
export interface ProductoApi {
  id: number;
  title: string;
  description?: string;
  price: number; // en dólares
  stock?: number;
  brand?: string;
  tags?: string[];
  thumbnail?: string;
}
