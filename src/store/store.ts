import {configureStore} from "@reduxjs/toolkit";
import {gameReducer} from "./slices/game.ts";

export const store: any = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;