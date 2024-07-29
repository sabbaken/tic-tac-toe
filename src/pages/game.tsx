import {selectCurrentBoard} from "../store/slices/game.ts";
import {useSelector} from "react-redux";
import GameBoard from "../components/gameBoard.tsx";
import React from "react";
import Toolbar from "../components/toolbar.tsx";

const Game: React.FC = () => {
  const currentBoard = useSelector(selectCurrentBoard)

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Toolbar/>
      <GameBoard board={currentBoard}></GameBoard>
    </div>
  );
};

export default Game;