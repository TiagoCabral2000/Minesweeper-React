import React from 'react';

const Cell = (props) => {
  const renderCell = () => {
    const { data, open, flag, flags } = props;

    if (data.isOpen) {

      if(data.mineFound){
        return (
          < div  className="cell open"  onClick={() => open(data)}  onContextMenu={ (e) => {e.preventDefault();} } >
            <img className="mine" src="img/mineFound.png" />
          </div>
        )
      }

      else if(data.wrongFlag){
        return (
          < div  className="cell open"  onClick={() => open(data)}  onContextMenu={ (e) => {e.preventDefault();} } >
            <img className="flag" src="img/wrongFlag.png" />
          </div>
        )
      }



      else if (data.hasMine) {
        return (
          < div  className="cell open"  onClick={() => open(data)}  onContextMenu={ (e) => {e.preventDefault();} } >
            <img className="mine" src="img/mine.png" />
          </div>
        );
      }
      else if (data.count === 0) {
        return (
          <div className="cell open" onClick={() => open(data)}></div>
        );
      } else {
        return (
          <div
            className="cell open"
            onClick={() => open(data)}
            onContextMenu={(e) => {
              e.preventDefault();
              if (flags > 0) {
                flag(data);
              }
            }}
          >
            {props.data.count}
          </div>
        );
      }
    } else if (data.hasFlag) {
      return (
        <div
          className="cell open"
          onClick={() => open(data)}
          onContextMenu={(e) => {
            e.preventDefault();
            flag(data);
          }}
        >
          <img className="flag" src="img/flag.png" />
        </div>
      );
    } else if (data.hasAuxiliar){
      return (
        <div
          className="cell"
          onClick={() => open(data)}
          onContextMenu={(e) => {
            e.preventDefault();
            flag(data);
          }}
        >
          <img className="auxiliar" src="img/auxiliar.png" />
        </div>
      );
    } else {
      return (
        <div
          className="cell"
          onClick={() => open(data)}
          onContextMenu={(e) => {
            e.preventDefault();
            if (flags > 0) {
              flag(data);
            }
          }}
        ></div>
      );
    }
  };

  return renderCell();
};

export default Cell;

