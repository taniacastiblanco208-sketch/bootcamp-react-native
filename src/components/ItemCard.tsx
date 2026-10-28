// Tarjeta que muestra un mueble del catálogo.
import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { Mueble } from '../types';

// Props: el mueble que se va a mostrar
interface ItemCardProps {
  mueble: Mueble;
}

// Convierte 1890000 en "$ 1.890.000"
const formatearPrecio = (valor: number): string =>
  `$ ${valor.toLocaleString('es-CO')}`;

export function ItemCard({ mueble }: ItemCardProps): React.JSX.Element {
  // Acción del botón: por ahora solo muestra un aviso
  const agregar = (): void => {
    Alert.alert('Carrito', `Agregaste: ${mueble.nombre}`);
  };

  return (
    <View style={styles.card}>
      {/* Foto del mueble */}
      <Image source={{ uri: mueble.imagen }} style={styles.imagen} />

      <View style={styles.contenido}>
        {/* Etiqueta (badge) con la categoría */}
        <View style={styles.badge}>
          <Text style={styles.badgeTexto}>{mueble.categoria.toUpperCase()}</Text>
        </View>

        <Text style={styles.nombre}>{mueble.nombre}</Text>
        <Text style={styles.material}>{mueble.material}</Text>

        {/* Precio a la izquierda, botón a la derecha */}
        <View style={styles.fila}>
          <Text style={styles.precio}>{formatearPrecio(mueble.precio)}</Text>

          {/* Pressable: cambia de color mientras se presiona */}
          <Pressable
            onPress={agregar}
            disabled={!mueble.enStock}
            style={({ pressed }) => [
              styles.boton,
              pressed && styles.botonPresionado,
              !mueble.enStock && styles.botonAgotado,
            ]}
          >
            <Text style={styles.botonTexto}>
              {mueble.enStock ? 'Agregar' : 'Agotado'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    overflow: 'hidden', // recorta la imagen con las esquinas redondeadas
    elevation: 3, // sombra en Android
    shadowColor: '#000', // sombra en iOS
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  imagen: {
    width: '100%',
    height: 180,
  },
  contenido: {
    padding: SPACING.base,
  },
  badge: {
    alignSelf: 'flex-start', // la etiqueta solo ocupa lo que necesita
    backgroundColor: COLORS.accentSoft,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  badgeTexto: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.category,
    letterSpacing: 1,
  },
  nombre: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
    marginTop: SPACING.sm,
  },
  material: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  fila: {
    flexDirection: 'row', // elementos en horizontal
    justifyContent: 'space-between', // uno a cada lado
    alignItems: 'center', // centrados verticalmente
    marginTop: SPACING.md,
  },
  precio: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
  },
  boton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.sm,
  },
  botonPresionado: {
    backgroundColor: COLORS.accentPressed, // más oscuro al presionar
  },
  botonAgotado: {
    backgroundColor: COLORS.disabled,
  },
  botonTexto: {
    color: COLORS.textLight,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
});
