import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = Array.from({ length: nrows }, () =>
       Array.from({ length: ncols }, () => Math.random() > chanceLightStartsOn)
    );
    return initialBoard;
   }

   function hasWon() {
    return board.every(row => row.every(cell => cell === false));
   }

   function flipCellsAround(coord) {
    setBoard(oldBoard => {
       const [y, x] = coord.split("-").map(Number);
   
       const flipCell = (y, x, boardCopy) => {
         // if this coord is actually on board, flip it
         if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
           boardCopy[y][x] = !boardCopy[y][x];
         }
       };
   
       // Make a deep copy of the oldBoard
       const boardCopy = JSON.parse(JSON.stringify(oldBoard));
   
       // Flip this cell and the cells around it
       flipCell(y, x, boardCopy);
       flipCell(y - 1, x, boardCopy); // Top
       flipCell(y + 1, x, boardCopy); // Bottom
       flipCell(y, x - 1, boardCopy); // Left
       flipCell(y, x + 1, boardCopy); // Right
   
       // Return the copy
       return boardCopy;
    });
   }
   

  // if the game is won, just show a winning msg & render nothing else
  if(hasWon()){
    return (
      <h1>You have won!</h1>
    )
  }else{
  // make table board
    return (
      <table className="board">
        <tbody>
          {board.map((row, y) => (
            <tr key={y}>
              {row.map((cell, x) => (
                <Cell
                key={x}
                isLit={cell}
                flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
               />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Board;
