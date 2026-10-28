// Detalle de un mueble. Los datos llegan por params desde la lista.
import React from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { buscarMueble } from '../data/mockData';
import { HomeStackParamList } from '../navigation/types';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';

// Convierte 1890000 en "$ 1.890.000"
const formatearPrecio = (valor: number): string =>
  `$ ${valor.toLocaleString('es-CO')}`;

export function DetailScreen(): React.JSX.Element {
  // useRoute entrega los params que se enviaron al navegar
  const { params } = useRoute<RouteProp<HomeStackParamList, 'HomeDetail'>>();

  // Con el id buscamos el resto de datos (foto, material, stock)
  const mueble = buscarMueble(params.id);

  return (
    <ScrollView style={styles.contenedor} contentContainerStyle={styles.contenido}>
      {mueble && <Image source={{ uri: mueble.imagen }} style={styles.imagen} />}

      <View style={styles.info}>
        <View style={styles.badge}>
          <Text style={styles.badgeTexto}>{params.categoria.toUpperCase()}</Text>
        </View>

        <Text style={styles.nombre}>{params.name}</Text>
        <Text style={styles.precio}>{formatearPrecio(params.precio)}</Text>

        {mueble && (
          <>
            <Text style={styles.etiqueta}>Material</Text>
            <Text style={styles.valor}>{mueble.material}</Text>

            <Text style={styles.etiqueta}>Disponibilidad</Text>
            <Text style={[styles.valor, mueble.enStock ? styles.enStock : styles.agotado]}>
              {mueble.enStock ? 'En stock' : 'Agotado'}
            </Text>

            <Pressable
              disabled={!mueble.enStock}
              onPress={() => Alert.alert('Carrito', `Agregaste: ${mueble.nombre}`)}
              style={({ pressed }) => [
                styles.boton,
                pressed && styles.botonPresionado,
                !mueble.enStock && styles.botonAgotado,
              ]}
            >
              <Text style={styles.botonTexto}>
                {mueble.enStock ? 'Agregar al carrito' : 'Agotado'}
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contenido: {
    paddingBottom: SPACING.xl,
  },
  imagen: {
    width: '100%',
    height: 260,
  },
  info: {
    padding: SPACING.lg,
  },
  badge: {
    alignSelf: 'flex-start',
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
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.heavy,
    color: COLORS.textPrimary,
    marginTop: SPACING.sm,
  },
  precio: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.accent,
    marginTop: SPACING.xs,
  },
  etiqueta: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textSecondary,
    marginTop: SPACING.lg,
    textTransform: 'uppercase',
  },
  valor: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  enStock: {
    color: COLORS.success,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  agotado: {
    color: COLORS.error,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  boton: {
    backgroundColor: COLORS.accent,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  botonPresionado: {
    backgroundColor: COLORS.accentPressed,
  },
  botonAgotado: {
    backgroundColor: COLORS.disabled,
  },
  botonTexto: {
    color: COLORS.textLight,
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
});
