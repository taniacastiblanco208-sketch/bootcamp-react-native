// Datos de ejemplo para el catálogo (sin backend todavía).
import { Mueble } from '../types';

export const MUEBLES: Mueble[] = [
  {
    id: '1',
    nombre: 'Sofá Nórdico 3 puestos',
    categoria: 'Sala',
    material: 'Tela y madera de pino',
    precio: 1890000,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7B-e3flc8mj4igUkZSDq4ltRkPn5vU8aA1KZdnuqUa1ioWqA1PpNvvW4K&s=10',
    enStock: true,
  },
  {
    id: '2',
    nombre: 'Mesa de Comedor',
    categoria: 'Comedor',
    material: 'Madera',
    precio: 2450000,
    imagen: 'https://roble.store/cdn/shop/files/mesa_de_comedor_roble_mauritz.jpg?v=1781173950&width=300',
    enStock: true,
  },
  {
    id: '3',
    nombre: 'Cama Queen Moderna',
    categoria: 'Dormitorio',
    material: 'MDF y cabecero tapizado',
    precio: 1320000,
    imagen: 'https://colchonesmagicclass.com/8302-large_default/combo-de-lujo-queen.jpg',
    enStock: false,
  },
  {
    id: '4',
    nombre: 'Escritorio Ejecutivo',
    categoria: 'Oficina',
    material: 'Madera con 3 cajones',
    precio: 780000,
    imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdgMch3qmQ0yK-FLzSySvI838kFsu6LUfTb_k82bjiKTFis_bM_cAyJAU&s=10',
    enStock: true,
  },
];
