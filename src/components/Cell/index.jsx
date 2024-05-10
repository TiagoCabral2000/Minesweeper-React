import React from 'react';

const Cell = props => { //A nossa celula vai fazer varas coisas. 
   //criar funcao para definir as condicoes/estados das celulas
   let renderCell = () => {
      if (props.data.isOpen){
         if (props.data.hasMine){ //Nao queremos mostrar flag numa mine
            return (
               <div className = "cell open" onClick={ () => props.open(props.data) } onContextMenu={e => {
                  e.preventDefault();}}>  
                 <img className="mine" src="img/mine.png"/>
               </div>
            ) 
         }
         else if (props.data.count === 0){//Se for 0 no minesweeper n mostra nada, e uma empty div  
            return (
               <div className = "cell open" onClick={ () => props.open(props.data) }> 
                  
               </div>
            )  
         }

        
         
         else{
            return (
               <div className = "cell open" onClick={ () => props.open(props.data) } onContextMenu={e => {
                  e.preventDefault();
                  props.flag(props.data)}}> 
                 {props.data.count}
               </div>
            ) 
         }
      }

      else if(props.data.hasFlag){
         return (
            <div className="cell open" 
                  onClick = { () => props.open (props.data) }
                  onContextMenu={e => {
                     e.preventDefault();
                     props.flag(props.data)}}>
               <img className="flag" src="img/flag.png"/>
            </div>
         )
      }

      else{
         return (
            <div className = "cell" onClick={ () => props.open(props.data) } onContextMenu={e => {
               e.preventDefault();
               props.flag(props.data)}}>
               
            </div>
         )
      }

   }
   return renderCell();
};

export default Cell;

