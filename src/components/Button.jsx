const Button = (props) => {
  return (
    <button className={`css-button-retro--red ${props.className}`}>
      {props.text}
    </button>
  );
};

export default Button;
