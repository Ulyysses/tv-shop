import { ReactNode, useCallback, useEffect, useState } from "react";

import NavigationBoardContext from "../../context/navigation-context/NavigationBoardContext";

interface INavigationBoard {
  children: ReactNode;
}

const NavigationBoard = ({ children }: INavigationBoard) => {
  const initialBoard = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["c", "c", "0"],
    ["b", "b", "b"],
    ["s", "s", "s"],
    ["e", "e", "e"],
  ];

  const board = initialBoard;
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const move = useCallback(
    (dir: string) => {
      let { x, y } = position;

      switch (dir) {
        case "up":
          if (y > 0) y -= 1;
          break;
        case "down":
          if (y < board.length - 1) y += 1;
          break;
        case "left":
          if (x > 0) x -= 1;
          break;
        case "right":
          if (x < board[y].length - 1) x += 1;
          break;
        default:
          break;
      }
      setPosition({ x, y });
    },
    [board, position],
  );

  useEffect(() => {
    const keydownHandler = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        move("up");
      } else if (event.key === "ArrowDown") {
        move("down");
      } else if (event.key === "ArrowLeft") {
        move("left");
      } else if (event.key === "ArrowRight") {
        move("right");
      }
    };

    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [move]);

  return (
    <NavigationBoardContext.Provider value={position}>
      {children}
    </NavigationBoardContext.Provider>
  );
};

export default NavigationBoard;
