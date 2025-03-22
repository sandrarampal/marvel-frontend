import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Character.css";
import { Link } from "react-router-dom";

const Character = () => {
  const [data, setData] = useState(null);
  const [dataComics, setDataComics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://site--marvel-backend--96jcjn4jx467.code.run/character/" +
          params.id
      );
      const response2 = await axios.get(
        "https://site--marvel-backend--96jcjn4jx467.code.run/comics/" +
          params.id
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
      <div className="chara-main container">
        <div>
          <div className="chara-image">
            <img
              src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
              alt=""
            />
          </div>
          <div className="name-circle">
            <h2>{data.name}</h2>
          </div>
        </div>

        <div className="comic-carrousel container">
          {dataComics.map((comic) => {
            return (
              <div className="one-comic-list" key={comic._id}>
                <Link to={`/comic/${comic._id}`}>
                  <img
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt="couverture du comic"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Character;
