import axios from "axios";
import { useState, useEffect } from "react";

const Favourites = ({ token }) => {
  const [data, setData] = useState(null);
  const [dataComics, setDataComics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/user/favourites/characters",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const response2 = await axios.get(
        "http://localhost:3000/user/favourites/comics",
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
      <div>
        <h3>Favourite Characters</h3>
        {data &&
          data.map((character, index) => {
            return (
              <div key={character._id}>
                <p>{character.name}</p>
                <div>
                  <img
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt=""
                  />
                </div>
                <p>{character.description}</p>
              </div>
            );
          })}
      </div>
      <div>
        <h3>Favourite Comics</h3>
        {dataComics &&
          dataComics.map((comic, index) => {
            return (
              <div key={comic._id}>
                <p>{comic.title}</p>
                <div>
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt=""
                  />
                </div>
                <p>{comic.description}</p>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Favourites;
