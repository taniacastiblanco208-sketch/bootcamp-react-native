// Formulario para crear un mueble nuevo (envía un POST con useMutation).
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useCreateMueble } from '../hooks/useCreateMueble';
import { HomeCreateProps } from '../navigation/types';
import { mensajeDeError } from '../services/api';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { CATEGORIAS, CategoriaMueble } from '../types';

export function CreateScreen({ navigation }: HomeCreateProps): React.JSX.Element {
  // Lo que la persona escribe (todo como texto; el precio se convierte al enviar)
  const [nombre, setNombre] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [precio, setPrecio] = useState<string>('');
  const [categoria, setCategoria] = useState<CategoriaMueble>('Sala');

  // Mensaje de error del formulario (si algo falta)
  const [errorForm, setErrorForm] = useState<string>('');

  // isPending es true mientras se envía el POST
  const { mutate, isPending } = useCreateMueble();

  const enviar = (): void => {
    const precioNumero = Number(precio.replace(/[^0-9]/g, '')); // solo dígitos

    // Validaciones simples
    if (nombre.trim() === '') {
      setErrorForm('Escribe el nombre del mueble.');
      return;
    }
    if (precioNumero <= 0) {
      setErrorForm('Escribe un precio mayor que 0.');
      return;
    }
    setErrorForm('');

    mutate(
      {
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        categoria,
        precio: precioNumero,
      },
      {
        // Salió bien: avisamos y volvemos a la lista
        onSuccess: () => {
          Alert.alert(
            'Mueble creado',
            'La API de práctica confirmó el envío, pero no guarda los datos, por eso no aparecerá en la lista.'
          );
          navigation.goBack();
        },
        // Falló: mostramos el motivo
        onError: (error) => {
          Alert.alert('No se pudo crear', mensajeDeError(error));
        },
      }
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.contenedor}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
        <Text style={styles.etiqueta}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Ej: Sofá cama 2 puestos"
          placeholderTextColor={COLORS.textMuted}
        />

        <Text style={styles.etiqueta}>Precio (COP)</Text>
        <TextInput
          style={styles.input}
          value={precio}
          onChangeText={setPrecio}
          placeholder="Ej: 950000"
          placeholderTextColor={COLORS.textMuted}
          keyboardType="numeric"
        />

        <Text style={styles.etiqueta}>Categoría</Text>
        <View style={styles.categorias}>
          {CATEGORIAS.map((c) => (
            <Pressable
              key={c}
              onPress={() => setCategoria(c)}
              style={[styles.chip, categoria === c && styles.chipActivo]}
            >
              <Text style={[styles.chipTexto, categoria === c && styles.chipTextoActivo]}>
                {c}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.etiqueta}>Descripción</Text>
        <TextInput
          style={[styles.input, styles.inputGrande]}
          value={descripcion}
          onChangeText={setDescripcion}
          placeholder="Material, medidas, detalles..."
          placeholderTextColor={COLORS.textMuted}
          multiline
        />

        {errorForm !== '' && <Text style={styles.error}>{errorForm}</Text>}

        <Pressable
          onPress={enviar}
          disabled={isPending}
          style={({ pressed }) => [
            styles.boton,
            pressed && styles.botonPresionado,
            isPending && styles.botonDeshabilitado,
          ]}
        >
          <Text style={styles.botonTexto}>{isPending ? 'Enviando...' : 'Crear mueble'}</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contenido: {
    padding: SPACING.lg,
  },
  etiqueta: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    marginTop: SPACING.base,
    marginBottom: SPACING.xs,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textPrimary,
  },
  inputGrande: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap', // si no caben en una fila, pasan a la siguiente
    gap: SPACING.sm,
  },
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  chipActivo: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  chipTexto: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textPrimary,
  },
  chipTextoActivo: {
    color: COLORS.textLight,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
  error: {
    color: COLORS.error,
    fontSize: TYPOGRAPHY.size.sm,
    marginTop: SPACING.base,
  },
  boton: {
    backgroundColor: COLORS.accent,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  botonPresionado: {
    opacity: 0.8,
  },
  botonDeshabilitado: {
    backgroundColor: COLORS.disabled,
  },
  botonTexto: {
    color: COLORS.textLight,
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
});
