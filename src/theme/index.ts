// Tema de la app: colores, tamaños y espacios en un solo lugar.
// Así, si cambiamos un color aquí, cambia en toda la app.

export const COLORS = {
  // Fondos
  background: '#F5F0EB', // fondo general (crema)
  surface: '#FFFFFF', // fondo de tarjetas
  header: '#3E2723', // café oscuro del encabezado

  // Bordes
  border: '#E0D6CF',

  // Texto
  textPrimary: '#3E2723',
  textSecondary: '#6D6D6D',
  textLight: '#FFFFFF',
  textOnHeader: '#D7CCC8',

  // Color principal de la tienda (botones, acentos)
  accent: '#6D4C41',
  accentPressed: '#4E342E',
  accentSoft: '#EFE5DF',
  category: '#8D6E63',

  // Estados
  disabled: '#BDBDBD',
  success: '#2E7D32',
  error: '#C62828',
} as const;

export const TYPOGRAPHY = {
  // Tamaños de letra
  size: {
    xs: 12,
    sm: 14,
    base: 16,
    md: 18,
    lg: 20,
    xl: 26,
  },
  // Grosor de letra
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
  },
} as const;

// Espacios entre elementos
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
} as const;

// Esquinas redondeadas
export const RADIUS = {
  sm: 8,
  md: 12,
  full: 9999,
} as const;
