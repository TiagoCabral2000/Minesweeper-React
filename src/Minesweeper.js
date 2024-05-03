import React, { Component } from "react";
import Board from "./components/Board";
import Row from "./components/Row";
import BoardHead from "./components/BoardHead";

class Minesweeper extends Component {
   constructor(){
      super();
      this.intervals = [];
   }
   state = {
      status: "waiting", //waiting, running, ended
      rows: 10,
      columns: 10,
      flags: 10,
      mines: 10,
      time: 0,
      openCells: 0
   };

   tick = () => { //contagem do tempo segundo a segundo
      if (this.state.openCells > 0 && this.state.status === "running"){
         let time = this.state.time +1;
         this.setState({time})
      }
   }

   setInterval = (fn, t) => {
      this.intervals.push (setInterval(fn,t));
   }

   //funcao para rodar as cells num clique
   turnCell = () => {
      if (this.state.openCells === 0 && this.state.status !== "running"){
         this.setState({
            status: "running"
         }, () => {
            this.setInterval(this.tick, 1000) //clicamos numa cell, a cada 1000 ms acresecntamos 1  ao tempo
         })
      }

      this.setState(prevState => {
         return {openCells: prevState.openCells +1 };
      })
      
   }

   render() {
      return <div className="minesweeper">
         <h1>Minesweeper :)</h1>
         <BoardHead time={this.state.time} flagCount={this.state.flags} />
         <Board 
            rows={this.state.rows} 
            columns={this.state.columns} 
            mines = {this.state.mines} 
            openCells = {this.state.openCells}
            openCellClick = {this.turnCell}
            />
      </div>;
   }
}

export default Minesweeper;
