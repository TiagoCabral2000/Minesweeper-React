import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import BoardHead from "./components/BoardHead";

function Minesweeper() {
  const [status, setStatus] = useState("waiting");
  const [rows, setRows] =  useState (9);
  const [columns, setColumns] = useState (9);
  const [mines, setMines] = useState(10);
  const [openCells, setOpenCells] = useState(0);
  const [flags, setFlags] = useState(10);
  const [time, setTime] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState("1");

  useEffect(() => {
    if (status === "running") {
      const interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status]);

  const turnCell = (cell) => {
    if (openCells === 0 && status !== "running") {
      setStatus("running");
    }
    if(cell.isOpen){
      setOpenCells(openCells => openCells + 1);
    }
  };

  const endGame = () => {
    setStatus("ended");
  };

  const onLevelChange = (event) => {
    const selectedLevel = event.target.value;
  
    if (selectedLevel === "1") {
      setSelectedLevel("1");
    } else if (selectedLevel === "2") {
      setSelectedLevel("2");
    } else {
      setSelectedLevel("3");
    }
  }
  
  useEffect(() => {
    if (selectedLevel === "1") {
      setRows(9);
      setColumns(9);
      setMines(10);
      setFlags(10);
    }

    if (selectedLevel === "2") {
      setRows(16);
      setColumns(16);
      setMines(40);
      setFlags(40);
    }

    if (selectedLevel === "3") {
      setRows(16);
      setColumns(30);
      setMines(99);
      setFlags(99);
    }

    reset();
  }, [selectedLevel]);

  const reset = () => {
    setStatus("waiting");
    setOpenCells(0);
    setTime(0);
    if (selectedLevel === "1") {
      setFlags(10);
    } else if (selectedLevel === "2") {
      setFlags(40);
    } else {
      setFlags(99);
    }
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
            onLevelChange = {onLevelChange}   
          />
          <Board
            status = {status}
            rows={rows}
            columns={columns}
            mines={mines}
            openCells = {openCells}
            turnCell = {turnCell}
            endGame = {endGame}
            changeFlagAmount = {changeFlagAmount}
            flags = {flags} 
          />
      </div>
  );
}

export default Minesweeper;
