import React from 'react';

const Cell = props => { //A nossa celula vai fazer varas coisas. 
   //criar funcao para definir as condicoes/estados das celulas
   let renderCell = () => {
      if (props.data.isOpen){
         if (props.data.hasMine){
            return (
               <div className = "cell open" onClick={ () => props.open(props.data) }> 
                 m 
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
               <div className = "cell open" onClick={ () => props.open(props.data) }> 
                  {props.data.count}
               </div>
            ) 
         }
      }


      else{
         return (
            <div className = "cell" onClick={ () => props.open(props.data) }>
               
            </div>
         )
      }

   }
   return renderCell();
};

export default Cell;