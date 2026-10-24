// Datos de ejemplo para el catálogo (sin backend todavía).
import { Mueble } from '../types';

export const MUEBLES: Mueble[] = [
  {
    id: '1',
    nombre: 'Sofá Nórdico 3 puestos',
    categoria: 'Sala',
    material: 'Tela y madera de pino',
    precio: 1890000,
    imagen: 'https://picsum.photos/seed/sofa/600/400',
    enStock: true,
  },
  {
    id: '2',
    nombre: 'Mesa de Comedor Roble',
    categoria: 'Comedor',
    material: 'Roble macizo',
    precio: 2450000,
    imagen: 'https://picsum.photos/seed/mesa/600/400',
    enStock: true,
  },
  {
    id: '3',
    nombre: 'Cama Queen Moderna',
    categoria: 'Dormitorio',
    material: 'MDF y cabecero tapizado',
    precio: 1320000,
    imagen: 'https://picsum.photos/seed/cama/600/400',
    enStock: false,
  },
  {
    id: '4',
    nombre: 'Escritorio Ejecutivo',
    categoria: 'Oficina',
    material: 'Madera y acero',
    precio: 780000,
    imagen: 'https://picsum.photos/seed/escritorio/600/400',
    enStock: true,
  },
];
