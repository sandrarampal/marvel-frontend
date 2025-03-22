import background from "../assets/img/background.jpeg";
import deadpool from "../assets/img/deadpool.png";
import Bubble from "../components/Bubble";

const Home = () => {
  return (
    <section className="home-section">
      <div className="background container">
        <img src={background} alt="" />
      </div>
      <div className="deadpool">
        <img src={deadpool} alt="" />
        <Bubble
          className="speech-bubble l"
          text=" Oh hello! Welcome to the Marvel database!"
        />
        <Bubble
          className="speech-bubble l bubble2"
          text="Someone made a user database to avoid dealing with JSON.Stringify so
          you can just sign up if you click up there."
        />
      </div>
    </section>
  );
};

export default Home;
