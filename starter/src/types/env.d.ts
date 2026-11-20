// Le avisa a TypeScript que existe "process.env" y qué variable usamos.
// Expo reemplaza EXPO_PUBLIC_API_URL por su valor al compilar la app.
declare const process: {
  env: {
    EXPO_PUBLIC_API_URL?: string;
  };
};
