import React from 'react';

//O topo do board vai ter info como tempo, numero de minas, botrao de reset, etc.

const BoardHead = props => { //A nossa celula vai fazer varas coisas. 
   let minutes = Math.floor(props.time / 60); //vamos contar o tempo em segundo. Para dar display aos minutos dividir por 60 e arredondar
   let seconds = props.time - (minutes * 60) || 0;

   let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds; //Se for menos de 10 segundos display 0 antes se não são os 2 digitos dos segundos
   let time = `${minutes}:${formattedSeconds}`;


   return(
      <div className='board-head'>
         <div className='flag-count'>{props.flagCount}</div>
         <button className='reset'>Reset</button>
         <div className='timer'>{time}</div>
      </div>
   );
};

export default BoardHead;