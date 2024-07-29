import {Board, CellValue, GameStatusEnum} from "../store/slices/game.ts";

export const checkWinner = (board: Board): GameStatusEnum => {
  const size = board.length;
  const winConditions = [CellValue.X, CellValue.O];

  const allEqual = (arr: CellValue[], player: CellValue): boolean => arr.every(cell => cell === player);

  for (const player of winConditions) {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] !== player) continue;

        // Check row
        if (col <= size - 3 && allEqual(board[row].slice(col, col + 3), player)) {
          return player === CellValue.X ? GameStatusEnum.WinX : GameStatusEnum.WinO;
        }

        // Check column
        if (row <= size - 3 && allEqual(board.slice(row, row + 3).map(r => r[col]), player)) {
          return player === CellValue.X ? GameStatusEnum.WinX : GameStatusEnum.WinO;
        }

        // Check main diagonal
        if (row <= size - 3 && col <= size - 3) {
          const mainDiagonal = [0, 1, 2].map(i => board[row + i][col + i]);
          if (allEqual(mainDiagonal, player)) {
            return player === CellValue.X ? GameStatusEnum.WinX : GameStatusEnum.WinO;
          }
        }

        // Check anti-diagonal
        if (row <= size - 3 && col >= 2) {
          const antiDiagonal = [0, 1, 2].map(i => board[row + i][col - i]);
          if (allEqual(antiDiagonal, player)) {
            return player === CellValue.X ? GameStatusEnum.WinX : GameStatusEnum.WinO;
          }
        }
      }
    }
  }

  if (board.every(row => row.every(cell => cell !== CellValue.Empty))) {
    return GameStatusEnum.Draw;
  }

  return GameStatusEnum.InProgress;
};
