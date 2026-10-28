// Datos de ejemplo para el catálogo (sin backend todavía).
import { CategoriaMueble, Mueble } from '../types';

// Una foto representativa por categoría.
// Los muebles de la misma categoría comparten foto por ahora;
// se pueden reemplazar por fotos propias de cada mueble.
const IMAGEN: Record<CategoriaMueble, string> = {
  Sala: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7B-e3flc8mj4igUkZSDq4ltRkPn5vU8aA1KZdnuqUa1ioWqA1PpNvvW4K&s=10',
  Comedor:
    'https://roble.store/cdn/shop/files/mesa_de_comedor_roble_mauritz.jpg?v=1781173950&width=300',
  Dormitorio:
    'https://colchonesmagicclass.com/8302-large_default/combo-de-lujo-queen.jpg',
  Oficina:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdgMch3qmQ0yK-FLzSySvI838kFsu6LUfTb_k82bjiKTFis_bM_cAyJAU&s=10',
};

export const MUEBLES: Mueble[] = [
  // ---- Sala ----
  {
    id: '1',
    nombre: 'Sofá Nórdico 3 puestos',
    categoria: 'Sala',
    material: 'Tela y madera de pino',
    precio: 1890000,
    imagen: IMAGEN.Sala,
    enStock: true,
  },
  {
    id: '2',
    nombre: 'Sillón Reclinable',
    categoria: 'Sala',
    material: 'Cuero sintético',
    precio: 1250000,
    imagen: IMAGEN.Sala,
    enStock: true,
  },
  {
    id: '3',
    nombre: 'Mesa de Centro',
    categoria: 'Sala',
    material: 'Vidrio y metal',
    precio: 560000,
    imagen: IMAGEN.Sala,
    enStock: true,
  },
  // ---- Comedor ----
  {
    id: '4',
    nombre: 'Mesa de Comedor',
    categoria: 'Comedor',
    material: 'Madera',
    precio: 2450000,
    imagen: IMAGEN.Comedor,
    enStock: true,
  },
  {
    id: '5',
    nombre: 'Juego de Comedor 6 puestos',
    categoria: 'Comedor',
    material: 'Madera y tela',
    precio: 3200000,
    imagen: IMAGEN.Comedor,
    enStock: true,
  },
  {
    id: '6',
    nombre: 'Silla de Comedor Tapizada',
    categoria: 'Comedor',
    material: 'Madera y tela',
    precio: 320000,
    imagen: IMAGEN.Comedor,
    enStock: false,
  },
  // ---- Dormitorio ----
  {
    id: '7',
    nombre: 'Cama Queen Moderna',
    categoria: 'Dormitorio',
    material: 'MDF y cabecero tapizado',
    precio: 1320000,
    imagen: IMAGEN.Dormitorio,
    enStock: false,
  },
  {
    id: '8',
    nombre: 'Cama King Clásica',
    categoria: 'Dormitorio',
    material: 'Madera maciza',
    precio: 2100000,
    imagen: IMAGEN.Dormitorio,
    enStock: true,
  },
  {
    id: '9',
    nombre: 'Closet 3 puertas',
    categoria: 'Dormitorio',
    material: 'MDF',
    precio: 1450000,
    imagen: IMAGEN.Dormitorio,
    enStock: true,
  },
  {
    id: '10',
    nombre: 'Mesa de Noche',
    categoria: 'Dormitorio',
    material: 'Madera con 2 cajones',
    precio: 280000,
    imagen: IMAGEN.Dormitorio,
    enStock: true,
  },
  // ---- Oficina ----
  {
    id: '11',
    nombre: 'Escritorio Ejecutivo',
    categoria: 'Oficina',
    material: 'Madera con 3 cajones',
    precio: 780000,
    imagen: IMAGEN.Oficina,
    enStock: true,
  },
  {
    id: '12',
    nombre: 'Silla Ergonómica',
    categoria: 'Oficina',
    material: 'Malla y acero',
    precio: 690000,
    imagen: IMAGEN.Oficina,
    enStock: true,
  },
  {
    id: '13',
    nombre: 'Biblioteca 5 repisas',
    categoria: 'Oficina',
    material: 'Madera',
    precio: 540000,
    imagen: IMAGEN.Oficina,
    enStock: true,
  },
];

// Busca un mueble por su id (devuelve undefined si no existe)
export const buscarMueble = (id: string): Mueble | undefined =>
  MUEBLES.find((m) => m.id === id);

// ids de los muebles favoritos (fijos por ahora; en la semana 4 serán dinámicos)
export const FAVORITOS_IDS: string[] = ['1', '4', '11'];
