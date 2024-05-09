import "./styles.css";

const BoardHead = (props) => {
  let minutes = Math.floor(props.time / 60);
  let seconds = props.time - minutes * 60 || 0;
  let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  let time = `${minutes}:${formattedSeconds}`;

  return (
    <div className="board-head">

      <select className="level">
        <option selected value="1">Fácil</option>
        <option value="2">Intermédio</option>
        <option value="3">Avançado</option>
      </select>

      <div className="center">
        <span className="flags"><img src="/img/flag.png"/>{props.flagCount}</span>
        <span className="timer"><img src="/img/clock.png"/>{time}</span>
      </div>

      <button className="reset" onClick= {props.reset}>Recomeçar</button>

    </div>
  );
};

export default BoardHead;
 