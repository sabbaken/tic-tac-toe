import {selectCurrentBoard} from "../store/slices/game.ts";
import {useSelector} from "react-redux";
import GameBoard from "../components/gameBoard.tsx";
import React from "react";
import Toolbar from "../components/toolbar.tsx";
import BoardSizeControls from "../components/boardSizeControls.tsx";
import GameStatus from "../components/gameStatus.tsx";

const Game: React.FC = () => {
  const currentBoard = useSelector(selectCurrentBoard)

  return (
    <>
      <Toolbar/>
      <BoardSizeControls/>
      <div className='w-full h-screen flex flex-col items-center justify-center'>
        <GameStatus/>
        <GameBoard board={currentBoard}></GameBoard>
      </div>
    </>
  );
};

export default Game;