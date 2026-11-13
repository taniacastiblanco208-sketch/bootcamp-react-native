// Convierte lo que responde la API al formato de nuestra app (Mueble).
import { CategoriaMueble, Mueble, ProductoApi } from '../types';

// La API cobra en dólares; para practicar lo pasamos a pesos con un valor fijo.
// (Es aproximado: no es una tasa de cambio real.)
export const COP_POR_USD = 4000;

// La API no trae nuestras categorías, así que las deducimos de palabras clave.
// Se revisa en orden: la primera que coincida gana.
const REGLAS: Array<[string, CategoriaMueble]> = [
  ['dormitorio', 'Dormitorio'],
  ['bed', 'Dormitorio'],
  ['oficina', 'Oficina'],
  ['chair', 'Oficina'],
  ['desk', 'Oficina'],
  ['comedor', 'Comedor'],
  ['table', 'Comedor'],
];

function deducirCategoria(producto: ProductoApi): CategoriaMueble {
  const texto = `${producto.title} ${(producto.tags ?? []).join(' ')}`.toLowerCase();
  const regla = REGLAS.find(([palabra]) => texto.includes(palabra));
  return regla ? regla[1] : 'Sala'; // si nada coincide, lo dejamos en Sala
}

export function aMueble(producto: ProductoApi): Mueble {
  return {
    id: String(producto.id),
    nombre: producto.title,
    categoria: deducirCategoria(producto),
    marca: producto.brand,
    descripcion: producto.description,
    precio: Math.round(producto.price * COP_POR_USD),
    imagen: producto.thumbnail ?? '',
    enStock: (producto.stock ?? 0) > 0,
  };
}
