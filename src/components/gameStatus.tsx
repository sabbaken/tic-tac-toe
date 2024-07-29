import React from 'react';
import {useSelector} from "react-redux";
import {GameStatusEnum, selectGameStatus} from "../store/slices/game.ts";
import cn from "classnames";

const GameStatus: React.FC= () => {
  const gameStatus = useSelector(selectGameStatus)

  const className = cn("px-4 py-2 text-lg h-12", {
    "invisible": [GameStatusEnum.NotStarted, GameStatusEnum.InProgress].includes(gameStatus)
  })

  return (
    <div className={className}>
      {gameStatus === GameStatusEnum.WinO && "O won"}
      {gameStatus === GameStatusEnum.WinX && "X won"}
      {gameStatus === GameStatusEnum.Draw && "Draw"}
    </div>
  );
};

export default GameStatus;