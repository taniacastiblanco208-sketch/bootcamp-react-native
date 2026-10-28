// Punto de entrada de la app.
// registerRootComponent le dice a React Native cuál es el componente raíz.
// Sin esta línea la app queda en blanco.
import { registerRootComponent } from 'expo';

import App from './App';

registerRootComponent(App);
