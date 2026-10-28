// Segunda pestaña: muebles favoritos (fijos por ahora).
import React, { useCallback } from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { ItemCard } from '../components/ItemCard';
import { FAVORITOS_IDS, MUEBLES } from '../data/mockData';
import { RootTabParamList } from '../navigation/types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';
import { Mueble } from '../types';

// Solo los muebles cuyo id está en la lista de favoritos
const FAVORITOS: Mueble[] = MUEBLES.filter((m) => FAVORITOS_IDS.includes(m.id));

export function FavoritesScreen(): React.JSX.Element {
  const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();

  // Al tocar un favorito, vamos a la pestaña Catálogo y abrimos su detalle
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
      data={FAVORITOS}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ItemSeparatorComponent={Separador}
      contentContainerStyle={styles.lista}
      ListEmptyComponent={
        <View style={styles.vacio}>
          <Text style={styles.vacioTexto}>Aún no tienes favoritos</Text>
        </View>
      }
    />
  );
}

// Espacio entre tarjetas
function Separador(): React.JSX.Element {
  return <View style={styles.separador} />;
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  lista: {
    padding: SPACING.base,
  },
  separador: {
    height: SPACING.base,
  },
  vacio: {
    alignItems: 'center',
    paddingVertical: SPACING.xl * 2,
  },
  vacioTexto: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textSecondary,
  },
});
