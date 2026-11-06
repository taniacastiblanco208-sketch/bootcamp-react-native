// Tarjeta que muestra un mueble del catálogo.
// Tiene un botón "Guardar" / "Quitar" conectado al store.
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { Mueble } from '../types';

// Props: el mueble y, opcionalmente, qué hacer al tocar la tarjeta
interface ItemCardProps {
  mueble: Mueble;
  onPress?: () => void;
}

// Convierte 1890000 en "$ 1.890.000"
const formatearPrecio = (valor: number): string =>
  `$ ${valor.toLocaleString('es-CO')}`;

export function ItemCard({ mueble, onPress }: ItemCardProps): React.JSX.Element {
  // Selectores: cada uno lee SOLO lo que necesita del store.
  // Así la tarjeta se redibuja únicamente cuando cambia su propio estado.
  const guardado = useSavedStore((state) =>
    state.items.some((m) => m.id === mueble.id)
  );
  const addItem = useSavedStore((state) => state.addItem);
  const removeItem = useSavedStore((state) => state.removeItem);

  // Si ya está guardado lo quita; si no, lo guarda
  const alternarGuardado = (): void => {
    if (guardado) {
      removeItem(mueble.id);
    } else {
      addItem(mueble);
    }
  };

  return (
    // Toda la tarjeta es tocable (lleva al detalle)
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && onPress && styles.cardPresionada]}
    >
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
          <View>
            <Text style={styles.precio}>{formatearPrecio(mueble.precio)}</Text>
            {!mueble.enStock && <Text style={styles.agotado}>Agotado</Text>}
          </View>

          {/* Pressable: cambia de color mientras se presiona */}
          <Pressable
            onPress={alternarGuardado}
            style={({ pressed }) => [
              styles.boton,
              guardado && styles.botonGuardado,
              pressed && styles.botonPresionado,
            ]}
          >
            <Text style={[styles.botonTexto, guardado && styles.botonTextoGuardado]}>
              {guardado ? 'Quitar' : 'Guardar'}
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
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
  cardPresionada: {
    opacity: 0.9,
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
  agotado: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.error,
  },
  boton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.sm,
  },
  botonGuardado: {
    backgroundColor: COLORS.accentSoft, // cuando ya está guardado, se ve suave
  },
  botonPresionado: {
    opacity: 0.8, // baja un poco al presionar
  },
  botonTexto: {
    color: COLORS.textLight,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  botonTextoGuardado: {
    color: COLORS.accent,
  },
});
