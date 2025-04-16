import { Link } from "react-router-dom";

const FavouriteCard = ({ character }) => {
  return (
    <div key={character._id}>
      <Link to={`/character/${character._id}`} className="link">
        <div className="character-pic">
          <img
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt="picture of the character"
          />
          <div className="name-tag">
            <p>{character.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default FavouriteCard;
