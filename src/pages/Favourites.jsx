import axios from "axios";
import "./Favourites.css";
import { useState, useEffect } from "react";

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
    <p>Chargement</p>
  ) : (
    <section>
      <div className="faves-main container">
        <div className="all-faves">
          <h3>Favourite Characters</h3>
          <div className="all-characters-faves">
            {data &&
              data.map((character, index) => {
                return (
                  <div key={character._id}>
                    <div className="character-pic">
                      <img
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt=""
                      />
                      <div className="name-tag">
                        <p>{character.name}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div>
            <h3>Favourite Comics</h3>
            <div className="all-characters-faves">
              {dataComics &&
                dataComics.map((comic, index) => {
                  return (
                    <div key={comic._id}>
                      <div className="character-pic">
                        <img
                          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                          alt=""
                        />
                        <div className="name-tag">
                          <p>{comic.title}</p>
                        </div>
                      </div>
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
