import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import BoardHead from "./components/BoardHead";

function Minesweeper() {
  const [status, setStatus] = useState("waiting");
  const [rows, setRows] =  useState (10);
  const [columns, setColumns] = useState (10);
  const [mines, setMines] = useState(10);
  const [openCells, setOpenCells] = useState(0);
  const [flags, setFlags] = useState(10);
  const [time, setTime] = useState(0);

  
  useEffect(() => {
    // Start the timer when the game starts running
    if (openCells > 0 && status === "running") {
      const interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);

      // Cleanup function to clear interval when the component unmounts or game ends
      return () => clearInterval(interval);
    }
  }, [openCells, status]);

  const turnCell = () => {
    if (openCells === 0 && status !== "running") {
      setStatus("running");
    }
    setOpenCells(openCells => openCells + 1);
  };

  const endGame = () => {
    setStatus("ended");
  };

  const reset = () => {
    // Reset the intervals and state
    setStatus("waiting");
    setRows(10);
    setColumns(10);
    setMines(10);
    setOpenCells(0);
    setFlags(10);
    setTime(0);
  };

  const changeFlagAmount = (amount) => {
    setFlags(prevFlags => prevFlags + amount);
  };

  return (
      <div className="minesweeper">
          <h1>Minesweeper :)</h1>
          <BoardHead
            time={time}
            reset={reset}
            flagCount={flags}   
          />
          
          <Board
            status = {status}
            rows={rows}
            columns={columns}
            mines={mines}
            openCells = {openCells}
            openCellClick = {turnCell}
            endGame = {endGame}
            changeFlagAmount = {changeFlagAmount}
          />
      </div>
  );
}

export default Minesweeper;
