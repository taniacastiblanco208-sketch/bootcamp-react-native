// Segunda pestaña: muebles guardados. Los datos vienen del store de Zustand.
import React, { useCallback } from 'react';
import {
  Alert,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ItemCard } from '../components/ItemCard';
import { RootTabParamList } from '../navigation/types';
import { useSavedStore } from '../stores/savedStore';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { Mueble } from '../types';

// Espacio entre tarjetas
function Separador(): React.JSX.Element {
  return <View style={styles.separador} />;
}

export function SavedScreen(): React.JSX.Element {
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();

  // Lee los guardados del store: si cambian, esta pantalla se actualiza sola
  const items = useSavedStore((state) => state.items);
  const clearAll = useSavedStore((state) => state.clearAll);

  // Pide confirmación antes de borrar todo
  const confirmarLimpiar = (): void => {
    Alert.alert('Limpiar guardados', '¿Quitar todos los muebles guardados?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Limpiar', style: 'destructive', onPress: clearAll },
    ]);
  };

  // Al tocar una tarjeta, abre su detalle en la pestaña Catálogo
  const renderItem = useCallback<ListRenderItem<Mueble>>(
    ({ item }) => (
      <ItemCard
        mueble={item}
        onPress={() =>
          navigation.navigate('Home', {
            screen: 'HomeDetail',
            params: {
              id: item.id,
              name: item.nombre,
              categoria: item.categoria,
              precio: item.precio,
            },
          })
        }
      />
    ),
    [navigation]
  );

  return (
    <FlatList
      style={styles.contenedor}
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ItemSeparatorComponent={Separador}
      contentContainerStyle={styles.lista}
      // Arriba: cuántos hay y el botón "Limpiar todo" (solo si hay guardados)
      ListHeaderComponent={
        items.length > 0 ? (
          <View style={styles.encabezado}>
            <Text style={styles.contador}>
              {items.length} {items.length === 1 ? 'mueble guardado' : 'muebles guardados'}
            </Text>
            <Pressable
              onPress={confirmarLimpiar}
              style={({ pressed }) => [styles.limpiar, pressed && styles.limpiarPresionado]}
            >
              <Text style={styles.limpiarTexto}>Limpiar todo</Text>
            </Pressable>
          </View>
        ) : null
      }
      ListEmptyComponent={
        <View style={styles.vacio}>
          <Text style={styles.vacioTitulo}>Aún no tienes muebles guardados</Text>
          <Text style={styles.vacioTexto}>
            Toca "Guardar" en el catálogo para verlos aquí.
          </Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  lista: {
    padding: SPACING.base,
    flexGrow: 1,
  },
  separador: {
    height: SPACING.base,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.base,
  },
  contador: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textSecondary,
  },
  limpiar: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  limpiarPresionado: {
    opacity: 0.7,
  },
  limpiarTexto: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.error,
  },
  vacio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl,
  },
  vacioTitulo: {
    fontSize: TYPOGRAPHY.size.md,
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
