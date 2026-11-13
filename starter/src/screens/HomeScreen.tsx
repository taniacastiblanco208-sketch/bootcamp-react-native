// Pantalla principal: encabezado, buscador y lista de muebles que vienen de la API.
import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ItemCard } from '../components/ItemCard';
import { useMuebles } from '../hooks/useMuebles';
import { HomeListProps } from '../navigation/types';
import { mensajeDeError } from '../services/api';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { Mueble } from '../types';

// Quita tildes y pasa a minúsculas: "Sofá" y "sofa" se consideran iguales
const normalizar = (texto: string): string =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

// Cómo se identifica cada item de la lista (siempre por id)
const obtenerClave = (item: Mueble): string => item.id;

// Espacio entre tarjetas
function Separador(): React.JSX.Element {
  return <View style={styles.separador} />;
}

export function HomeScreen({ navigation }: HomeListProps): React.JSX.Element {
  // Pedimos los muebles a la API. TanStack Query nos da el estado de la petición:
  //   isLoading: cargando por primera vez | isError: falló | data: los muebles
  const { data, isLoading, isError, error, refetch, isRefetching } = useMuebles();
  const muebles = useMemo<Mueble[]>(() => data ?? [], [data]);

  // Cuántos muebles hay guardados (para el encabezado)
  const cantidadGuardados = useSavedStore((state) => state.items.length);

  // Texto que la persona escribe en el buscador
  const [busqueda, setBusqueda] = useState<string>('');

  // Lista filtrada. useMemo evita recalcular si nada cambió.
  const mueblesFiltrados = useMemo<Mueble[]>(() => {
    const texto = normalizar(busqueda.trim());
    if (texto === '') return muebles;
    return muebles.filter(
      (m) =>
        normalizar(m.nombre).includes(texto) ||
        normalizar(m.categoria).includes(texto) ||
        normalizar(m.marca ?? m.material ?? '').includes(texto)
    );
  }, [muebles, busqueda]);

  // Cómo se dibuja cada fila. Al tocar una tarjeta vamos al detalle.
  const renderItem = useCallback<ListRenderItem<Mueble>>(
    ({ item }) => (
      <ItemCard
        mueble={item}
        onPress={() =>
          navigation.navigate('HomeDetail', {
            id: item.id,
            name: item.nombre,
            categoria: item.categoria,
            precio: item.precio,
          })
        }
      />
    ),
    [navigation]
  );

  // Lo que se muestra debajo del encabezado según el estado de la petición
  const renderContenido = (): React.JSX.Element => {
    // 1) Cargando
    if (isLoading) {
      return (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color={COLORS.accent} />
          <Text style={styles.centroTexto}>Cargando muebles...</Text>
        </View>
      );
    }

    // 2) Error (con botón para reintentar)
    if (isError) {
      return (
        <View style={styles.centro}>
          <Text style={styles.centroTitulo}>No pudimos cargar el catálogo</Text>
          <Text style={styles.centroTexto}>{mensajeDeError(error)}</Text>
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

    // 3) Lista (si no hay resultados muestra el estado vacío)
    return (
      <FlatList
        data={mueblesFiltrados}
        keyExtractor={obtenerClave}
        renderItem={renderItem}
        ItemSeparatorComponent={Separador}
        contentContainerStyle={styles.lista}
        keyboardShouldPersistTaps="handled"
        // Arrastrar hacia abajo para actualizar (pull-to-refresh)
        refreshing={isRefetching}
        onRefresh={() => {
          void refetch();
        }}
        ListEmptyComponent={
          <View style={styles.centro}>
            <Text style={styles.centroTitulo}>No encontramos muebles</Text>
            <Text style={styles.centroTexto}>
              {busqueda.trim() === ''
                ? 'Por ahora el catálogo está vacío.'
                : 'Prueba con otra palabra, por ejemplo "sofá" o "cama".'}
            </Text>
          </View>
        }
      />
    );
  };

  return (
    // KeyboardAvoidingView: sube el contenido para que el teclado no lo tape
    <KeyboardAvoidingView
      style={styles.contenedor}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />

      {/* Encabezado con el nombre de la tienda */}
      <View style={styles.header}>
        <View style={styles.headerFila}>
          <View style={styles.headerTextos}>
            <Text style={styles.titulo}>Tienda de Muebles</Text>
            <Text style={styles.subtitulo}>
              Catálogo · {mueblesFiltrados.length} de {muebles.length} muebles ·{' '}
              {cantidadGuardados} guardados
            </Text>
          </View>

          {/* Botón para ir al formulario de crear mueble */}
          <Pressable
            onPress={() => navigation.navigate('HomeCreate')}
            style={({ pressed }) => [styles.nuevo, pressed && styles.botonPresionado]}
          >
            <Text style={styles.nuevoTexto}>+ Nuevo</Text>
          </Pressable>
        </View>

        {/* Buscador */}
        <TextInput
          style={styles.buscador}
          value={busqueda}
          onChangeText={setBusqueda}
          placeholder="Buscar por nombre, categoría o marca"
          placeholderTextColor={COLORS.textSecondary}
          autoCorrect={false}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
      </View>

      {renderContenido()}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1, // ocupa toda la pantalla
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.header,
    paddingTop: 56, // espacio para la barra de estado
    paddingBottom: SPACING.base,
    paddingHorizontal: SPACING.lg,
  },
  headerFila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextos: {
    flex: 1, // ocupa el espacio que deja el botón
    marginRight: SPACING.md,
  },
  titulo: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.heavy,
    color: COLORS.textLight,
  },
  subtitulo: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textOnHeader,
    marginTop: 2,
  },
  nuevo: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
  },
  nuevoTexto: {
    color: COLORS.textLight,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  buscador: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    marginTop: SPACING.md,
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textPrimary,
  },
  lista: {
    padding: SPACING.base,
    flexGrow: 1, // permite centrar el mensaje de lista vacía
  },
  separador: {
    height: SPACING.base,
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  centroTitulo: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  centroTexto: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  boton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.sm,
    marginTop: SPACING.lg,
  },
  botonPresionado: {
    opacity: 0.8,
  },
  botonTexto: {
    color: COLORS.textLight,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
});
