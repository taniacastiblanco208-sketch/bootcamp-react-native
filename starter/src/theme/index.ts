// Tema de la app: colores, tamaños y espacios en un solo lugar.
// Así, si cambiamos un color aquí, cambia en toda la app.

export const COLORS = {
  // Fondos
  background: '#F5F0EB', // fondo general (crema)
  surface: '#FFFFFF', // fondo de tarjetas
  surfaceAlt: '#F1EAE4', // fondo secundario (zonas suaves)
  header: '#3E2723', // café oscuro del encabezado

  // Bordes
  border: '#E0D6CF',
  borderLight: '#EDE5DF',

  // Texto
  textPrimary: '#3E2723',
  textSecondary: '#6D6D6D',
  textLight: '#FFFFFF',
  textMuted: '#9E9089', // texto muy suave
  textOnHeader: '#D7CCC8',

  // Color principal de la tienda (botones, acentos)
  accent: '#6D4C41',
  accentPressed: '#4E342E',
  accentSoft: '#EFE5DF',
  accentDim: '#6D4C4133', // acento semitransparente
  category: '#8D6E63',

  // Estados
  disabled: '#BDBDBD',
  success: '#2E7D32',
  warning: '#EF6C00',
  error: '#C62828',
  info: '#1565C0',
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
    xxl: 30,
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
  xxl: 32,
} as const;

// Esquinas redondeadas
export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 9999,
} as const;
