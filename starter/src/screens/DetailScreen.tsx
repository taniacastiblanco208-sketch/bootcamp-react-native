// Detalle de un mueble. Pide los datos frescos a la API con useMueble.
import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useMueble } from '../hooks/useMuebles';
import { HomeStackParamList } from '../navigation/types';
import { mensajeDeError } from '../services/api';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';

// Convierte 1890000 en "$ 1.890.000"
const formatearPrecio = (valor: number): string =>
  `$ ${valor.toLocaleString('es-CO')}`;

export function DetailScreen(): React.JSX.Element {
  // useRoute entrega los params que se enviaron al navegar
  const { params } = useRoute<RouteProp<HomeStackParamList, 'HomeDetail'>>();

  // Pedimos el mueble completo a la API usando su id
  const { data: mueble, isLoading, isError, error, refetch } = useMueble(params.id);

  // Estado del store: ¿está guardado? y acciones para guardar o quitar
  const guardado = useSavedStore((state) =>
    state.items.some((m) => m.id === params.id)
  );
  const addItem = useSavedStore((state) => state.addItem);
  const removeItem = useSavedStore((state) => state.removeItem);

  // Cargando
  if (isLoading) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  // Error o mueble no encontrado: mostramos los datos básicos y un botón para reintentar
  if (isError || !mueble) {
    return (
      <View style={styles.centro}>
        <Text style={styles.nombre}>{params.name}</Text>
        <Text style={styles.precio}>{formatearPrecio(params.precio)}</Text>
        <Text style={styles.mensaje}>
          No pudimos cargar el detalle. {isError ? mensajeDeError(error) : ''}
        </Text>
        <Pressable
          onPress={() => {
            void refetch();
          }}
          style={({ pressed }) => [styles.boton, pressed && styles.botonPresionado]}
        >
          <Text style={styles.botonTexto}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.contenedor} contentContainerStyle={styles.contenido}>
      <Image source={{ uri: mueble.imagen }} style={styles.imagen} />

      <View style={styles.info}>
        <View style={styles.badge}>
          <Text style={styles.badgeTexto}>{mueble.categoria.toUpperCase()}</Text>
        </View>

        <Text style={styles.nombre}>{mueble.nombre}</Text>
        <Text style={styles.precio}>{formatearPrecio(mueble.precio)}</Text>

        {/* Solo mostramos los campos que la API sí trae */}
        {mueble.material && (
          <>
            <Text style={styles.etiqueta}>Material</Text>
            <Text style={styles.valor}>{mueble.material}</Text>
          </>
        )}
        {mueble.marca && (
          <>
            <Text style={styles.etiqueta}>Marca</Text>
            <Text style={styles.valor}>{mueble.marca}</Text>
          </>
        )}
        {mueble.descripcion && (
          <>
            <Text style={styles.etiqueta}>Descripción</Text>
            <Text style={styles.valor}>{mueble.descripcion}</Text>
          </>
        )}

        <Text style={styles.etiqueta}>Disponibilidad</Text>
        <Text style={[styles.valor, mueble.enStock ? styles.enStock : styles.agotado]}>
          {mueble.enStock ? 'En stock' : 'Agotado'}
        </Text>

        {/* Guarda o quita el mueble del store */}
        <Pressable
          onPress={() => (guardado ? removeItem(mueble.id) : addItem(mueble))}
          style={({ pressed }) => [
            styles.boton,
            guardado && styles.botonGuardado,
            pressed && styles.botonPresionado,
          ]}
        >
          <Text style={[styles.botonTexto, guardado && styles.botonTextoGuardado]}>
            {guardado ? 'Quitar de guardados' : 'Guardar'}
          </Text>
        </Pressable>
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
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.background,
  },
  mensaje: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    textAlign: 'center',
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
    textAlign: 'left',
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
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  botonGuardado: {
    backgroundColor: COLORS.accentSoft, // ya guardado: se ve suave
  },
  botonPresionado: {
    opacity: 0.8, // baja un poco al presionar
  },
  botonTexto: {
    color: COLORS.textLight,
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  botonTextoGuardado: {
    color: COLORS.accent,
  },
});
