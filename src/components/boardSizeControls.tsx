import React from "react";
import Card from "./card.tsx";
import {Button} from "./button.tsx";
import {MinusIcon, PlusIcon} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {GameStatusEnum, selectBoardSize, selectGameStatus, setBoardSize} from "../store/slices/game.ts";
import cn from "classnames";

const BoardSizeControls: React.FC = () => {
  const gameStatus = useSelector(selectGameStatus);
  const boardSize = useSelector(selectBoardSize);
  const dispatch = useDispatch();

  const handleIncreaseBoardSize = () => {
    dispatch(setBoardSize(boardSize + 1));
  };

  const handleDecreaseBoardSize = () => {
    dispatch(setBoardSize(boardSize - 1));
  };

  const className = cn("absolute bottom-2 left-1/2 transform -translate-x-1/2", {
    "hidden": gameStatus !== GameStatusEnum.NotStarted,
  });

  return (
    <div className={className}>
      <Card className="flex gap-1">
        <Button variant="ghost"
                size="squareMd"
                onClick={handleIncreaseBoardSize}
                children={<PlusIcon />}
        />
        <Button variant="ghost"
                size="squareMd"
                onClick={handleDecreaseBoardSize}
                children={<MinusIcon />} />
      </Card>
    </div>
  );
};

export default BoardSizeControls;