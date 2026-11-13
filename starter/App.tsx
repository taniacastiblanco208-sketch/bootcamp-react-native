// Componente raíz de la app.
// - QueryClientProvider: da acceso al caché de TanStack Query a toda la app.
// - SafeAreaProvider: calcula las zonas seguras (notch, barra de estado).
// - NavigationContainer: guarda el estado de la navegación.
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';

// Se crea una sola vez, fuera del componente, para no perder el caché al redibujar
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // si falla, reintenta una vez
      staleTime: 60_000, // durante 1 minuto los datos se consideran frescos
    },
  },
});

export default function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <StatusBar style="light" />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
