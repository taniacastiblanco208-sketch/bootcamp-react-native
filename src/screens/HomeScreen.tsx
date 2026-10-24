// Pantalla principal: header + lista de tarjetas.
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ItemCard } from '../components/ItemCard';
import { MUEBLES } from '../data/mockData';

export function HomeScreen(): React.JSX.Element {
  return (
    <View style={styles.contenedor}>
      <StatusBar style="light" />

      {/* Header con el nombre de la tienda */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Tienda de Muebles</Text>
        <Text style={styles.subtitulo}>Catálogo</Text>
      </View>

      {/* ScrollView: permite desplazar las tarjetas hacia abajo */}
      <ScrollView contentContainerStyle={styles.lista}>
        {MUEBLES.map((mueble) => (
          <ItemCard key={mueble.id} mueble={mueble} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1, // ocupa toda la pantalla
    backgroundColor: '#F5F0EB',
  },
  header: {
    backgroundColor: '#3E2723',
    paddingTop: 56, // espacio para la barra de estado
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subtitulo: {
    fontSize: 14,
    color: '#D7CCC8',
    marginTop: 2,
  },
  lista: {
    padding: 16,
  },
});
