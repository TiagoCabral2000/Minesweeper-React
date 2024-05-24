import React, { useState, useEffect } from "react";
import Row from "../Row/Row";

function Board(props) {
   const [board, setBoard] = useState([]);
   const [openCells, setOpenCells] = useState(props.openCells);

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
            i--; 
         } 
         else {
            cell.hasMine = true;
         }
      }

      console.log(newBoard);
      return newBoard; 
   };

   useEffect(() => {
      const newBoard = createBoard();
      setBoard(newBoard);
   }, [props.mines]);

   const open = (cell) => {
      let numberOfMines = findMines(cell, board);
     
      let currentBoard = [...board];
      let currentCell = currentBoard[cell.y][cell.x];

      if (currentCell.hasMine && props.openCells === 0){
         const newBoard = createBoard();
         setBoard(newBoard);
      } 
      else {
         if (!cell.hasFlag && !currentCell.isOpen) {
            currentCell.isOpen = true;
            props.turnCell(cell);
            currentCell.count = numberOfMines;

            setBoard(currentBoard);

            if (!currentCell.hasMine && numberOfMines === 0) {
               openAroundCell(cell, currentBoard);
            }

            if (currentCell.hasMine && props.openCells !== 0) {
               alert("You lost!");
               props.endGame();
               openAllBoard();
            }
         }
      }
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

            if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numColumns) {
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
         props.turnCell(cell);
         let updatedRows = [...board.map((row) => [...row])]; //copia das rows

         if(!cell.hasFlag && !cell.hasAuxiliar){
            cell.hasFlag = true;
         }
         else if(cell.hasFlag){
            cell.hasFlag = false;
            cell.hasAuxiliar = true;
         }
         else{
            cell.hasAuxiliar = false;
         }

         updatedRows[cell.y][cell.x].hasFlag = cell.hasFlag;
         updatedRows[cell.y][cell.x].hasAuxiliar = cell.hasAuxiliar;

         setBoard(updatedRows); 

         if(cell.hasFlag){
            props.changeFlagAmount(-1);
         }
         else if(cell.hasAuxiliar){
            props.changeFlagAmount(+1);
         }
      }
   };

   const openAroundCell = (cell, rows) => {
      const numRows = rows.length;
      const numColumns = rows[0].length;

      for (let row = -1; row <= 1; row++) {
         for (let col = -1; col <= 1; col++) {
            const newRow = cell.y + row;
            const newCol = cell.x + col;

            if(newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numColumns) {
               const currentCell = rows[newRow][newCol];
               if (!currentCell.hasMine && !currentCell.isOpen) {
                  open(currentCell);
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

  useEffect(() => {
      if (props.openCells + props.mines-props.flags === props.rows*props.columns) {
         alert("Ganhou!!!");
         props.endGame();
         openAllBoard();
      }
   }, [props.openCells, props.flags]);
  
   return (
      <div className="board">
         
         {board.map((row, rowIndex) => (
            <Row key={rowIndex} cells={row} open={open} flag={flag} flags={props.flags}  />
         ))}
         
      </div>
   );
}

export default Board;
