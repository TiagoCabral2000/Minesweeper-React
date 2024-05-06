import React, { Component } from "react";
import Row from "../Row";

class Board extends Component {
   constructor(props){
      super(props);

      this.state = {
         rows: this.createBoard(props)
      }
   }

   componentWillReceiveProps(nextProps){
      if (this.props.openCells > nextProps.openCells){
         this.setState({
            rows: this.createBoard(nextProps)
         })
      }
   }
   

   //Board vai ser um grid com diferentes celulas. 2D array
   createBoard = (props) => { //Props is a special keyword in React that stands for properties and is used for passing data from one component to another. Data with props are passed in a unidirectional flow from parent to child.
      let board = []; //empty array. Criar rows e depois colunas

      for (let i = 0; i < props.rows; i++){//props.rows propriedade passada de minesweeper.js
         //Para cada linha vamos criar um array
         board.push([]); //push um empty array

         for (let j = 0; j < props.columns; j++){
            board[i].push({ //board[i] é o array board.push de cima e vamos inserir um objetivo em cada
               x: j, //Numero da coluna
               y: i, //Numero da linha
               count: 0, //Numero de mines a volta
               isOpen: false, //Começam fechadas
               hasMine: false,
               hasFlag: false
            });
         }
      }
      //Board totalmente criado. Vamos adicionar as mines
      for (let i = 0; i < props.mines; i++){
         //vamos selecionar uma random row e col para inserir uma bomba
         let randomRow = Math.floor(Math.random() * props.rows); 
         let randomCol = Math.floor(Math.random() * props.columns);
         let cell = board[randomRow][randomCol];
         
         if (cell.hasMine){
            i--;
         }
         else{
            cell.hasMine =  true;
         }
         console.log(board); //util para verificar win condition - ver onde estao mines
      }
      return board;
   };

   open = cell => { 
      
      let asyncCountMines = new Promise(resolve => {
         let mines = this.findMines(cell);
         resolve (mines);
      });
      
      asyncCountMines.then(numberOfMines => {
         //criar funcao open. Passar a info da celula com que estamos a trabalhar
         //Se clicar numa cell e tiver uma mina, perdemos
         //Se clicar numa cell e nao tiver uma mina, abre a celula. 2 coisas podem acontecer:
            // - se uma cell adjacente tiver uma mina, mostra o numero total de minas
            // - se nenhuma cell tiver uma mina adjacente, abre todas as celulas a volta e atualiza informacao
            // - se clicarmos numa mina logo a primeira tentativa, reseta o board e try again
        
         let rows = this.state.rows; 
         let current = rows[cell.y][cell.x]; //queremos a celula q clicamos. Para a descrever temos o x(coluna) e y(linha)
         
         
         //Vamos chechar se tem uma mina
         if (current.hasMine && this.props.openCells === 0){ //Se tiver uma mina e for o 1o clique
            console.log("Esta celula tem uma mina! Restart!!!");
            let newRows = this.createBoard(this.props); //criamos um board novo 

            this.setState({ //Setstate tem um segundo parametro que e uma funcao
               rows: newRows //resetamos as proprieadades de rows
               }, () => { 
                  this.open(cell); 
               })
         }
         else{ //Outras possibilidades. A cell pode estar com flag, estar ja aberta ou ter uma mine
            if (!cell.hasFlag && !current.isOpen){  //Se nao tiver flag e estiver fechada ainda temos de abrir a cell
               this.props.openCellClick();
               
               current.isOpen =  true; //Ja temos a cell aberta e o estado atualizado. falta saber quantas mines estao a volta para dar display na cell
               current.count = numberOfMines;
               
               this.setState({rows});

               if(!current.hasMine && numberOfMines === 0){
                  this.openAroundCell(cell);
               }

               if (current.hasMine && this.props.openCells !== 0){
                  this.props.endGame();
                  alert("Game Over!");
               }

            }
         }
      })
   };

   flag = cell => {
      if (this.props.status === "ended"){
         return;
      }
      if(!cell.isOpenpen){
         let rows = this.state.rows;

         cell.hasFlag = !cell.hasFlag;
         this.setState ({rows}); 
         this.props.changeFlagAmount(cell.hasFlag ? -1 : 1); //changleFlagAmount em Minesweeper retira 1 na funcao ou acrescenta
      }
   }

   findMines = cell => {
      let minesInProximity = 0; 
      //temos de percorrer as 8 cells adjacentes a cell atual
      for (let row = -1; row <= 1; row++){
         for (let col = -1; col <= 1; col++){
            if (cell.y + row >= 0 && cell.x + col >= 0){ //so devemos percorrer isto se a cell atual nao tiver nos cantos do board. Nesses casos, nao tem 8 cells a rodear
               if (cell.y + row < this.state.rows.length && cell.x + col < this.state.rows[0].length){ //0 representa a celula atual nesta logica
                  if (this.state.rows[cell.y + row][cell.x + col].hasMine && !(row === 0 && col === 0)){
                     minesInProximity++;
                  }
               }

            } 
         }
      }
      return minesInProximity;
   }

   openAroundCell = cell => { //abrir multiplas celulas quando nao ha minas a volta
      let rows = this.state.rows;

      // ir cell a cell e abrir uma a uma ate encontrar uma com mine, ai paramos
      for (let row = -1; row <= 1; row++){
         for (let col = -1; col <= 1; col++){

            if (cell.y + row >= 0 && cell.x + col >= 0){ //so devemos percorrer isto se a cell atual nao tiver nos cantos do board. Nesses casos, nao tem 8 cells a rodear
               if (cell.y + row < rows.length && cell.x + col < rows[0].length){ //0 representa a celula atual nesta logica
                  
                  if (!rows[cell.y + row][cell.x + col].hasMine && !rows[cell.y + row][cell.x + col].isOpen){
                     this.open(rows[cell.y + row][cell.x + col]);   
                  }
                  
               }
            } 
         }
      }

   }


   checkForWinner = () => { //se o numero de flags que tivermos disponiveis for igual ao numero de cells em aberto???
      if (this.state.openCells === ((this.state.columns * this.state.rows)-this.state.mines)){
         this.setState({
            status: "winner"
         }, alert("Venceu!"))
      }
   }

   componentDidUpdate(prevProps, prevState){
      if(this.state.status === "running"){
         this.checkForWinner();
      }
   }


   render() {
      let rows = this.state.rows.map((row,index) => {
         return (
            <Row
               cells = {row}
               key = {index}
               open = {this.open}
               flag = {this.flag}
            />
         )
      })
      return <div className="board">{rows}</div>;
   }
}

export default Board;
