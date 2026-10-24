// Tarjeta que muestra un mueble del catálogo.
import React from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Mueble } from '../types';

// Props: el mueble que se va a mostrar
interface ItemCardProps {
  mueble: Mueble;
}

// Convierte 1890000 en "$ 1.890.000"
const formatearPrecio = (valor: number): string =>
  `$ ${valor.toLocaleString('es-CO')}`;

export function ItemCard({ mueble }: ItemCardProps): React.JSX.Element {
  // Acción del botón: por ahora solo muestra un aviso
  const agregar = (): void => {
    Alert.alert('Carrito', `Agregaste: ${mueble.nombre}`);
  };

  return (
    <View style={styles.card}>
      {/* Foto del mueble */}
      <Image source={{ uri: mueble.imagen }} style={styles.imagen} />

      <View style={styles.contenido}>
        {/* Categoría (texto pequeño) y nombre (texto grande) */}
        <Text style={styles.categoria}>{mueble.categoria.toUpperCase()}</Text>
        <Text style={styles.nombre}>{mueble.nombre}</Text>
        <Text style={styles.material}>{mueble.material}</Text>

        {/* Precio a la izquierda, botón a la derecha */}
        <View style={styles.fila}>
          <Text style={styles.precio}>{formatearPrecio(mueble.precio)}</Text>

          {/* Pressable: cambia de color mientras se presiona (feedback) */}
          <Pressable
            onPress={agregar}
            disabled={!mueble.enStock}
            style={({ pressed }) => [
              styles.boton,
              pressed && styles.botonPresionado,
              !mueble.enStock && styles.botonAgotado,
            ]}
          >
            <Text style={styles.botonTexto}>
              {mueble.enStock ? 'Agregar' : 'Agotado'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden', // recorta la imagen con las esquinas redondeadas
    elevation: 3, // sombra en Android
    shadowColor: '#000', // sombra en iOS
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  imagen: {
    width: '100%',
    height: 180,
  },
  contenido: {
    padding: 16,
  },
  categoria: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8D6E63',
    letterSpacing: 1,
  },
  nombre: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3E2723',
    marginTop: 4,
  },
  material: {
    fontSize: 14,
    color: '#6D6D6D',
    marginTop: 2,
  },
  fila: {
    flexDirection: 'row', // elementos en horizontal
    justifyContent: 'space-between', // uno a cada lado
    alignItems: 'center', // centrados verticalmente
    marginTop: 12,
  },
  precio: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3E2723',
  },
  boton: {
    backgroundColor: '#6D4C41',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  botonPresionado: {
    backgroundColor: '#4E342E', // más oscuro al presionar
  },
  botonAgotado: {
    backgroundColor: '#BDBDBD',
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
