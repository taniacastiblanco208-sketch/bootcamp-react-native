// Tipos del dominio: tienda de muebles.

// Categorías posibles de un mueble
export type CategoriaMueble = 'Sala' | 'Comedor' | 'Dormitorio' | 'Oficina';

// Un mueble del catálogo
export interface Mueble {
  id: string;
  nombre: string;
  categoria: CategoriaMueble;
  material: string;
  precio: number; // en pesos colombianos (COP)
  imagen: string; // URL de la foto
  enStock: boolean;
}
