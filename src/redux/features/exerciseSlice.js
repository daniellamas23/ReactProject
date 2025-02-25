// src/features/exerciseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessions: [],
  totalTime: 0,
};

const exerciseSlice = createSlice({
  name: 'exercise',
  initialState,
  reducers: {
    addSession: (state, action) => {
      // Estandarizamos la sesión: usamos "id" (tomando idRegistro si existe) y "time" a partir de "tiempo"
      const newSession = {
        ...action.payload,
        id: action.payload.idRegistro || action.payload.id,
        time: action.payload.tiempo || action.payload.time,
      };
      state.sessions.push(newSession);
      state.totalTime += newSession.time;
    },
    removeSession: (state, action) => {
      // Se elimina la sesión usando el "id" estandarizado
      const sessionToRemove = state.sessions.find(
        (session) => session.id === action.payload
      );
      state.sessions = state.sessions.filter(
        (session) => session.id !== action.payload
      );
      if (sessionToRemove) {
        state.totalTime -= sessionToRemove.time;
      }
    },
    setSessions: (state, action) => {
      // Convertimos cada sesión recibida para estandarizar las propiedades
      const sessionsConverted = action.payload.map(session => ({
        ...session,
        id: session.id,         // El GET devuelve "id"
        time: session.tiempo,     // Convertimos "tiempo" a "time"
      }));
      state.sessions = sessionsConverted;
      state.totalTime = sessionsConverted.reduce((sum, session) => sum + session.time, 0);
    },
  },
});

export const { addSession, removeSession, setSessions } = exerciseSlice.actions;
export default exerciseSlice.reducer;
