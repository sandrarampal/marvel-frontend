import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Characters.css";
import Cookies from "js-cookie";

const Characters = ({ favourite, setFavourite }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    try {
      let filters = "";
      if (page) {
        filters += "?page=" + page;
      }

      if (search) {
        if (filters) {
          filters += "&name=" + search;
        } else {
          filters += "?name=" + search;
        }
      }
      const response = await axios.get(
        "http://localhost:3000/characters" + filters
      );
      // setPage(pageOn.slice(6));

      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchData();
  }, [page, search]);

  return isLoading ? (
    <p>Chargement</p>
  ) : (
    <section>
      <div>
        <input
          type="text"
          onChange={() => {
            const value = event.target.value;
            setSearch(value);
          }}
          value={search}
        />
      </div>
      <div className="all-characters container">
        {data.results.map((character, index) => {
          const imagePath = `${character.thumbnail.path}.${character.thumbnail.extension}`;

          return (
            <div className="one-character" key={character._id}>
              <Link to={`/character/${character._id}`}>
                <p>{character.name}</p>
                <div className="character-image">
                  <img src={imagePath} alt="" />
                </div>
                <p>{character.description}</p>
              </Link>
              <button
                onClick={() => {
                  //copier le tab favourite dans lequel on push les favoris
                  const copyFav = [...favourite];
                  copyFav.push(character._id);
                  setFavourite(copyFav);
                  console.log(favourite);

                  // //stringify le tableau
                  let favStr = JSON.stringify(favourite);
                  Cookies.set("favourite", favStr);

                  //envoyer la string formée dans un cookie favourite
                }}
              >
                Like
              </button>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          setPage(page - 1);
        }}
      >
        Prev page
      </button>
      <button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next page
      </button>
    </section>
  );
};

export default Characters;
