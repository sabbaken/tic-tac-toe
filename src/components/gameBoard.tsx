import React from 'react';
import Card from "./card.tsx";
import {Button} from "./button.tsx";
import {Board, CellValue, GameStatusEnum, selectBoardSize, selectGameStatus, setCell} from "../store/slices/game.ts";
import {useDispatch, useSelector} from "react-redux";

type TProps = {
  board: Board
}

const GameBoard: React.FC<TProps> = ({board}) => {
  const dispatch = useDispatch();
  const boardSize = useSelector(selectBoardSize)
  const gameStatus = useSelector(selectGameStatus)

  const handleClickCell = (rowIndex: number, colIndex: number) => {
    dispatch(setCell({rowIndex, colIndex}))
  }

  return (
    <Card className="grid w-fit gap-1" style={{gridTemplateColumns: `repeat(${boardSize}, 1fr)`,}}>
      {board.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          return (
            <Button onClick={() => handleClickCell(rowIndex, colIndex)}
                    size="squareXl"
                    variant="secondary"
                    disabled={
                      cell !== CellValue.Empty ||
                      ![GameStatusEnum.InProgress, GameStatusEnum.NotStarted].includes(gameStatus)
                    }>
              {cell !== CellValue.Empty ? cell : null}
            </Button>
          )
        })
      })}
    </Card>
  );
};

export default GameBoard;