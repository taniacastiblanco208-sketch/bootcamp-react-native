// Tipos de la navegación: dicen qué pantallas existen y qué datos recibe cada una.
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CategoriaMueble } from '../types';

// Pantallas del stack que vive dentro de la pestaña "Home"
export type HomeStackParamList = {
  HomeList: undefined; // la lista no recibe datos
  HomeDetail: {
    // datos que se envían al detalle
    id: string;
    name: string;
    categoria: CategoriaMueble;
    precio: number;
  };
};

// Pestañas de abajo
export type RootTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>; // dentro va el stack
  Favorites: undefined;
};

// Tipos listos para usar en cada pantalla (props de navigation y route)
export type HomeListProps = NativeStackScreenProps<HomeStackParamList, 'HomeList'>;
export type HomeDetailProps = NativeStackScreenProps<HomeStackParamList, 'HomeDetail'>;
export type FavoritesProps = BottomTabScreenProps<RootTabParamList, 'Favorites'>;
