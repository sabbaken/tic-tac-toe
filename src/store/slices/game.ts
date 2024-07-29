import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { checkWinner } from "../../utils/checkWinner.ts";
import {BOARD_MAX_SIZE, BOARD_MIN_SIZE} from "../../constants/game.ts";

export enum CellValue {
  X = 'X',
  O = 'O',
  Empty = 0
}

export enum GameStatusEnum {
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
  gameStatus: GameStatusEnum;
  boardSize: number;
}

const createInitialBoard = (size: number): Board => {
  return Array.from({ length: size }, () => Array(size).fill(CellValue.Empty));
}

const initialState: GameState = {
  history: [createInitialBoard(3)],
  currentMoveIndex: 0,
  gameStatus: GameStatusEnum.NotStarted,
  boardSize: 3,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCell: (state, action: PayloadAction<{ rowIndex: number; colIndex: number }>) => {
      if (state.gameStatus === GameStatusEnum.NotStarted || state.gameStatus === GameStatusEnum.InProgress) {
        const { rowIndex, colIndex } = action.payload;
        const currentBoard = state.history[state.currentMoveIndex].map(row => [...row]);
        const isXTurn = (state.currentMoveIndex % 2) === 0;
        if (currentBoard[rowIndex][colIndex] === CellValue.Empty) {
          currentBoard[rowIndex][colIndex] = isXTurn ? CellValue.X : CellValue.O;
          // Update the game state
          state.gameStatus = checkWinner(currentBoard);
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
        state.gameStatus = checkWinner(state.history[state.currentMoveIndex]);
      }
    },
    redo: (state) => {
      if (state.currentMoveIndex < state.history.length - 1) {
        state.currentMoveIndex++;
        state.gameStatus = checkWinner(state.history[state.currentMoveIndex]);
      }
    },
    resetGame: (state) => {
      state.history = [createInitialBoard(state.boardSize)];
      state.currentMoveIndex = 0;
      state.gameStatus = GameStatusEnum.NotStarted;
    },
    startGame: (state) => {
      state.gameStatus = GameStatusEnum.InProgress;
    },
    setBoardSize: (state, action: PayloadAction<number>) => {
      if (state.gameStatus === GameStatusEnum.NotStarted) {
        const size = action.payload;
        if (size >= BOARD_MIN_SIZE && size <= BOARD_MAX_SIZE) {
          state.boardSize = size;
          state.history = [createInitialBoard(size)];
          state.currentMoveIndex = 0;
        }
      }
    },
  },
});

export const { setCell, undo, redo, resetGame, startGame, setBoardSize } = gameSlice.actions;

const selectGameState = (state: RootState) => state.game;

const selectCurrentMoveIndex = createSelector(
  [selectGameState],
  (game) => game.currentMoveIndex
);

const selectHistory = createSelector(
  [selectGameState],
  (game) => game.history
);

export const selectCurrentBoard = createSelector(
  [selectHistory, selectCurrentMoveIndex],
  (history, currentMoveIndex) => history[currentMoveIndex]
);

export const selectGameStatus = (state: RootState) =>
  state.game.gameStatus;

export const selectBoardSize = (state: RootState) =>
  state.game.boardSize;

export const gameReducer = gameSlice.reducer;
