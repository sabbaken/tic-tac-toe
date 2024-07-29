import React from 'react';
import Card from "./card.tsx";
import {BOARD_SIZE} from "../constants/game.ts";
import {Button} from "./button.tsx";
import {Board, CellValue, setCell} from "../store/slices/game.ts";
import {useDispatch} from "react-redux";

type TProps = {
  board: Board
}

const GameBoard: React.FC<TProps> = ({board}) => {
  const dispatch = useDispatch();

  const handleClickCell = (rowIndex: number, colIndex: number) => {
    dispatch(setCell({rowIndex, colIndex}))
  }

  return (
    <Card className={"grid w-fit gap-1"} style={{gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,}}>
      {board.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          return (
            <Button onClick={() => handleClickCell(rowIndex, colIndex)}
                    className="w-12 h-12"
                    variant="secondary"
                    disabled={cell !== CellValue.Empty}>
              {cell !== CellValue.Empty ? cell : null}
            </Button>
          )
        })
      })}
    </Card>
  );
};

export default GameBoard;