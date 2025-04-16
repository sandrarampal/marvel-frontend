import axios from "axios";
import "./Favourites.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import FavouriteCard from "../../components/FavouriteCard";

const Favourites = ({ token }) => {
  const [data, setData] = useState(null);
  const [dataComics, setDataComics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://site--marvel-backend--96jcjn4jx467.code.run/user/favourites/characters",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const response2 = await axios.get(
        "https://site--marvel-backend--96jcjn4jx467.code.run/user/favourites/comics",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      setDataComics(response2.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <section>
      <div className="faves-main container">
        <div className="all-faves">
          <h3>Favourite Characters</h3>
          <div className="all-characters-faves">
            {data &&
              data.map((character, index) => {
                return <FavouriteCard character={character} />;
              })}
          </div>
          <div>
            <h3>Favourite Comics</h3>
            <div className="all-characters-faves">
              {dataComics &&
                dataComics.map((comic, index) => {
                  return (
                    <div key={comic._id}>
                      <Link to={`/comic/${comic._id}`} className="link">
                        <div className="character-pic">
                          <img
                            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                            alt="cover of the comic book"
                          />
                          <div className="name-tag">
                            <p>{comic.title}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Favourites;
