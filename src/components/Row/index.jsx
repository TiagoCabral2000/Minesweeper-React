import React from 'react';
import Cell from '../Cell';
const Row = props => {
   let cells = props.cells.map((data,index)=> {
      return (
         <Cell key = {index} data = {data} open = {props.open}  flag = {props.flag} flags = {props.flags}  />
      )
   })
    return (
      <div className="row">
         {cells}

      </div>
   );

};

export default Row;