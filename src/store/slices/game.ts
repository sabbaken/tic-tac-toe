import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define the enum for cell values
export enum CellValue {
  X = 'X',
  O = 'O',
  Empty = null
}

// Define the enum for game states
export enum GameStateEnum {
  NotStarted = 'Not Started',
  InProgress = 'In Progress',
  Draw = 'Draw',
  WinX = 'Win for X',
  WinO = 'Win for O'
}

export type Board = CellValue[][];

interface GameState {
  history: Board[];
  currentMoveIndex: number;
  gameStatus: GameStateEnum;
}

// Define the board size
const BOARD_SIZE = 3;

// Function to create an initial empty board based on BOARD_SIZE
const createInitialBoard = (): Board => {
  return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(CellValue.Empty));
}

const initialState: GameState = {
  history: [createInitialBoard()],
  currentMoveIndex: 0,
  gameStatus: GameStateEnum.NotStarted,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCell: (state, action: PayloadAction<{ row: number; col: number }>) => {
      if (state.gameStatus === GameStateEnum.NotStarted || state.gameStatus === GameStateEnum.InProgress) {
        const { row, col } = action.payload;
        const currentBoard = state.history[state.currentMoveIndex].map(row => [...row]);
        const isXTurn = (state.currentMoveIndex % 2) === 0;
        if (currentBoard[row][col] === CellValue.Empty) {
          currentBoard[row][col] = isXTurn ? CellValue.X : CellValue.O;
          // Update the game state to In Progress
          state.gameStatus = GameStateEnum.InProgress;
          // Cut the history if we are in the middle and make a new move
          const newHistory = state.history.slice(0, state.currentMoveIndex + 1);
          newHistory.push(currentBoard);
          state.history = newHistory;
          state.currentMoveIndex++;
        }
      }
    },
    undo: (state) => {
      if (state.currentMoveIndex > 0) {
        state.currentMoveIndex--;
        state.gameStatus = GameStateEnum.InProgress;
      }
    },
    redo: (state) => {
      if (state.currentMoveIndex < state.history.length - 1) {
        state.currentMoveIndex++;
        state.gameStatus = GameStateEnum.InProgress;
      }
    },
    resetGame: (state) => {
      state.history = [createInitialBoard()];
      state.currentMoveIndex = 0;
      state.gameStatus = GameStateEnum.NotStarted;
    },
    startGame: (state) => {
      state.gameStatus = GameStateEnum.InProgress;
    }
  },
});

export const { setCell, undo, redo, resetGame, startGame } = gameSlice.actions;

export const selectCurrentBoard = (state: RootState) =>
  state.game.history[state.game.currentMoveIndex];

export const selectGameStatus = (state: RootState) =>
  state.game.gameStatus;

export const gameReducer = gameSlice.reducer;
