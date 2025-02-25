import { configureStore } from '@reduxjs/toolkit';
import exerciseReducer from './features/exerciseSlice'; // Asegúrate de que el nombre de la carpeta es correcto

const store = configureStore({
  reducer: {
    exercise: exerciseReducer, // Importa el reducer correcto
  },
});

export default store;
