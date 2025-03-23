import Bubble from "./Bubble";
import chibipool from "../assets/img/chibi-deadpool.png";
import "../pages/Comics.css";

const Deadpool = (props) => {
  return (
    <div className="popup">
      <img
        className={`chibipool ${props.className}`}
        src={chibipool}
        alt="un petit deadpool tout mignon"
      />
      <div className="deadpool-message">
        <span>{props.text}</span>
      </div>
    </div>
  );
};

export default Deadpool;
