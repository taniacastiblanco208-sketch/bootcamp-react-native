# Tienda de Muebles — React Native (Expo SDK 57)

App móvil de una tienda de muebles, construida semana a semana (bootcamp React Native).

## Requisitos
- Node >=22.13.0
- pnpm **10.28.0** (fijo; con `corepack enable` se activa solo por `packageManager`)
- Expo Go 58 en el celular

## Ejecutar
```bash
corepack enable
cd starter        # la app vive en la carpeta starter/
pnpm install
pnpm start        # escanea el QR con Expo Go
pnpm typecheck
```

## Ramas
`main` está vacío. Cada semana es una rama apilada sobre la anterior:
`week-01` → `week-02` → … → `week-18`.

| Rama | Contenido |
| --- | --- |
| week-01 | Core Components y Flexbox: catálogo de tarjetas |
| week-02 | Listas, Inputs y Estilos: FlatList, búsqueda en vivo y tema |
| week-03 | React Navigation 7: pestañas, stack anidado, detalle con params y favoritos |
| week-04 | Estado global con Zustand: guardados compartidos, badge en tiempo real |
| week-05 | Networking con Axios y TanStack Query: catálogo desde una API, detalle y crear mueble |

## API (semana 5)
El catálogo se lee de [DummyJSON](https://dummyjson.com) (`/products/category/furniture`).
Para usar otra API, crea `starter/.env.local` con `EXPO_PUBLIC_API_URL=https://tu-api.com`
(ese archivo no se sube a GitHub). Los precios de DummyJSON vienen en dólares y se
convierten a pesos con un valor fijo de práctica.
