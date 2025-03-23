import background from "../assets/img/background.jpeg";
import deadpool from "../assets/img/deadpool.png";
import Bubble from "../components/Bubble";

const Home = () => {
  return (
    <section className="home-section">
      <div className="background container">
        <img src={background} alt="" />
        <div className="deadpool">
          <img src={deadpool} alt="" />
          <Bubble
            className="speech-bubble l bubble1"
            text=" OH HELLO! WELCOME TO THE MARVEL DATABASE!"
          />
          <Bubble
            className="speech-bubble d"
            text=" OH HELLO! WELCOME TO THE MARVEL DATABASE!"
          />
          <Bubble
            className="speech-bubble l bubble2"
            text="You can sign up* and choose your favourite hero (me) and comics (mine)"
          />
          <div className="asterisk">
            <span>* No cookies were harmed in the making of this website</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
