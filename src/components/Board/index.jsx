import React, { useState, useEffect } from "react";
import Row from "../Row";

function Board(props) {
   // const [rows, setRows] = useState(props.rows);
   // const [columns, setColumns] = useState(props.columns);
   const [board, setBoard] = useState([]);
   const [, setOpenCells] = useState(props.openCells);
   // const [mines, setMines] = useState(props.mines);
   // const [flags, setFlags] = useState(props.flags);

   const createBoard = () => {
      let newBoard = [];

      for (let i = 0; i < props.rows; i++) { 
         newBoard.push([]);
         for (let j = 0; j < props.columns; j++) { 
            newBoard[i].push({
               x: j,
               y: i,
               count: 0,
               isOpen: false,
               hasMine: false,
               hasFlag: false,
            });
         }
      }

      for (let i = 0; i < props.mines; i++) { 
         let randomRow = Math.floor(Math.random() * props.rows);
         let randomCol = Math.floor(Math.random() * props.columns);
         let cell = newBoard[randomRow][randomCol];

         if (cell.hasMine) {
            i--; // If the cell already has a mine, decrement i and try again
         } else {
            cell.hasMine = true;
         }
      }

      console.log(newBoard);
      return newBoard; // Return the populated board array
   };


   // Utilize o useEffect para observar mudanças nas props
   useEffect(() => {
      const newBoard = createBoard();
      setBoard(newBoard);
   }, [props.mines]);

   //clique na cell:

   const open = (cell) => {

      let asyncCountMines = new Promise((resolve) => {
         let mines = findMines(cell, board); // Pass board as argument
         resolve(mines);
      });

      asyncCountMines.then((numberOfMines) => {
         
         let currentBoard = [...board];
         let currentCell = currentBoard[cell.y][cell.x];

         if (currentCell.hasMine && props.openCells === 0) {
            props.endGame();
         } 
         else {
            
            if (!cell.hasFlag && !currentCell.isOpen) {
               props.openCellClick();

               currentCell.isOpen = true;
               currentCell.count = numberOfMines;

               setBoard(currentBoard);

               if (!currentCell.hasMine && numberOfMines === 0) {
                  openAroundCell(cell, board, open); 
               }

               if (currentCell.hasMine && props.openCells !== 0) {
                  alert("Game Over!");
                  props.endGame();
                  openAllBoard();
               }
            }
         }
      });
   };

   const openAllBoard = (cell) => {
         for (let i = 0; i<props.rows; i++){
            for (let j = 0; j<props.columns; j++){
               cell = board[i][j];
               if(!cell.hasFlag){
                  cell.isOpen = true;
               }
               if(cell.hasMine && cell.hasFlag){
                  cell.mineFound = true;
                  cell.hasFlag = false;
                  cell.isOpen = true;
               }
               if(!cell.hasMine && cell.hasFlag){
                  cell.hasFlag = false;
                  cell.wrongFlag = true;
                  cell.isOpen = true;
               }
            }
         }  
      
   }

   const findMines = (cell, board) => {
      let minesInProximity = 0;
      const numRows = board.length;
      const numColumns = board[0].length;

      for (let row = -1; row <= 1; row++) {
         for (let col = -1; col <= 1; col++) {
            const newRow = cell.y + row;
            const newCol = cell.x + col;

            if (
               newRow >= 0 &&
               newRow < numRows &&
               newCol >= 0 &&
               newCol < numColumns
            ) {
               if (board[newRow][newCol].hasMine && !(row === 0 && col === 0)) {
                  minesInProximity++;
               }
            }
         }
      }

      return minesInProximity;
   };

   const flag = (cell) => {
      if (props.status === "ended") {
         return;
      }
      if (!cell.isOpen) {
         props.openCellClick();
         let updatedRows = [...board.map((row) => [...row])]; //copia das rows

         cell.hasFlag = !cell.hasFlag; //mudar para a propriedade oposta ate ao momento
         updatedRows[cell.y][cell.x].hasFlag = cell.hasFlag;

         setBoard(updatedRows); //atualiza o estado do board 

         props.changeFlagAmount(cell.hasFlag ? -1 : 1); //atualiza o numero de flags em app.js
      }
   };

   const openAroundCell = (cell, rows) => {
      const numRows = rows.length;
      const numColumns = rows[0].length;

      // Iterate over the adjacent cells and open them if they meet the criteria
      for (let row = -1; row <= 1; row++) {
         for (let col = -1; col <= 1; col++) {
            // Calculate the indices of the adjacent cell
            const newRow = cell.y + row;
            const newCol = cell.x + col;

            // Check if the indices are within the bounds of the board
            if(newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numColumns) {
               const currentCell = rows[newRow][newCol];
               if (!currentCell.hasMine && !currentCell.isOpen) {
                  // Open the cell recursively if it meets the criteria
                  open(currentCell);
                  // props.openCellClick();
               }
            }
         }
      }
   };

   useEffect(() => {
      if (props.openCells === 0) { //Quando clicamos em reset, mudamos a prop das openCells para 0. Por isso, se openCells for =0, podemos criar um novo Board para resetar o anterior
          setOpenCells(props.openCells);
          const newBoard = createBoard();
          setBoard(newBoard);
      }
  }, [props.openCells]); 

//   useEffect(() => {
//    if (props.rows && props.columns && props.mines) {
//       const newBoard = createBoard();
//       setBoard(newBoard);
//    }  
// }, [props.rows, props.columns, props.mines]);
  
   return (
      <div className="board">
         
         {board.map((row, rowIndex) => (
            <Row key={rowIndex} cells={row} open={open} flag={flag} flags={props.flags}  />
         ))}
         
      </div>
   );
}

export default Board;
