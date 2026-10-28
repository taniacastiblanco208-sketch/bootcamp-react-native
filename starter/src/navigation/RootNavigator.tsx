// Navegación principal: pestañas abajo (Catálogo y Favoritos)
// y, dentro de Catálogo, un stack para ir de la lista al detalle.
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { DetailScreen } from '../screens/DetailScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { COLORS, TYPOGRAPHY } from '../theme';
import { HomeStackParamList, RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<HomeStackParamList>();

// Ícono de cada pestaña
const ICONOS: Record<keyof RootTabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'home-outline',
  Favorites: 'heart-outline',
};

// Stack de la pestaña Catálogo: lista -> detalle
function HomeStack(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.header },
        headerTintColor: COLORS.textLight, // color de la flecha y el título
      }}
    >
      {/* La lista trae su propio encabezado con buscador, así que ocultamos el del stack */}
      <Stack.Screen
        name="HomeList"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/* El título del detalle es el nombre del mueble que llegó por params */}
      <Stack.Screen
        name="HomeDetail"
        component={DetailScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
}

export function RootNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={ICONOS[route.name]} size={size} color={color} />
        ),
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarLabelStyle: { fontWeight: TYPOGRAPHY.weight.semibold },
        headerStyle: { backgroundColor: COLORS.header },
        headerTintColor: COLORS.textLight,
      })}
    >
      {/* El stack ya muestra su propio encabezado, por eso se oculta el de la pestaña */}
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ title: 'Catálogo', headerShown: false }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: 'Favoritos' }}
      />
    </Tab.Navigator>
  );
}
