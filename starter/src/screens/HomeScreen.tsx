// Pantalla principal: encabezado, buscador y lista de muebles.
import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ItemCard } from '../components/ItemCard';
import { MUEBLES } from '../data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { HomeListProps } from '../navigation/types';
import { Mueble } from '../types';

// Quita tildes y pasa a minúsculas: "Sofá" y "sofa" se consideran iguales
const normalizar = (texto: string): string =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

// Cómo se identifica cada item de la lista (siempre por id, nunca por posición)
const obtenerClave = (item: Mueble): string => item.id;

// Espacio entre tarjetas
function Separador(): React.JSX.Element {
  return <View style={styles.separador} />;
}

// navigation viene del stack y sirve para ir al detalle
export function HomeScreen({ navigation }: HomeListProps): React.JSX.Element {
  // Texto que la persona escribe en el buscador
  const [busqueda, setBusqueda] = useState<string>('');

  // Lista filtrada. useMemo evita recalcular si la búsqueda no cambió.
  const mueblesFiltrados = useMemo<Mueble[]>(() => {
    const texto = normalizar(busqueda.trim());
    if (texto === '') return MUEBLES; // sin texto: muestra todo

    return MUEBLES.filter(
      (m) =>
        normalizar(m.nombre).includes(texto) ||
        normalizar(m.categoria).includes(texto) ||
        normalizar(m.material).includes(texto)
    );
  }, [busqueda]);

  // Cómo se dibuja cada fila. useCallback evita crearla de nuevo en cada render.
  // Al tocar una tarjeta, vamos al detalle y le enviamos los datos del mueble.
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

  return (
    // KeyboardAvoidingView: sube el contenido para que el teclado no lo tape
    <KeyboardAvoidingView
      style={styles.contenedor}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />

      {/* Encabezado con el nombre de la tienda */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Tienda de Muebles</Text>
        <Text style={styles.subtitulo}>
          Catálogo · {mueblesFiltrados.length} de {MUEBLES.length} muebles
        </Text>

        {/* Buscador */}
        <TextInput
          style={styles.buscador}
          value={busqueda}
          onChangeText={setBusqueda}
          placeholder="Buscar por nombre, categoría o material"
          placeholderTextColor={COLORS.textSecondary}
          autoCorrect={false}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
      </View>

      {/* Lista: solo dibuja lo que se ve en pantalla */}
      <FlatList
        data={mueblesFiltrados}
        keyExtractor={obtenerClave}
        renderItem={renderItem}
        ItemSeparatorComponent={Separador}
        contentContainerStyle={styles.lista}
        keyboardShouldPersistTaps="handled" // permite tocar botones con el teclado abierto
        // Estado vacío: se muestra cuando la búsqueda no encuentra nada
        ListEmptyComponent={
          <View style={styles.vacio}>
            <Text style={styles.vacioTitulo}>No encontramos muebles</Text>
            <Text style={styles.vacioTexto}>
              Prueba con otra palabra, por ejemplo "sofá" o "madera".
            </Text>
          </View>
        }
      />
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
  vacio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xl * 2,
  },
  vacioTitulo: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
  },
  vacioTexto: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
});
