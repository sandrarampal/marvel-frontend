import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Characters.css";
import Cookies from "js-cookie";
import { Pagination } from "@mui/material";

const Characters = ({ token }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [added, setAdded] = useState("");

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
        "https://site--marvel-backend--96jcjn4jx467.code.run/characters" +
          filters
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

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleFaves = async (event) => {
    try {
      const response = await axios.post(
        "https://site--marvel-backend--96jcjn4jx467.code.run/user/favourites",
        {
          token: token,
          favouriteId: character._id,
        }
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  return isLoading ? (
    <p>Chargement</p>
  ) : (
    <section className="container">
      <div className="character-input">
        <label htmlFor="search">Recherchez</label>
        <input
          id="search"
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
              <Link to={`/character/${character._id}`} className="links">
                <p>{character.name}</p>
                <div className="character-image">
                  <img src={imagePath} alt="" />
                </div>
                <p>{character.description}</p>
              </Link>

              {token && (
                <button
                  onClick={async () => {
                    try {
                      const response = await axios.post(
                        "https://site--marvel-backend--96jcjn4jx467.code.run/user/favourites/characters",

                        {
                          token: token,
                          favouriteId: character._id,
                        }
                      );
                      setAdded(character._id);
                    } catch (error) {
                      console.log(error.response);
                    }
                  }}
                >
                  Like
                </button>
              )}
              {added === character._id && <span>Added to your favourites</span>}
            </div>
          );
        })}
      </div>
      <Pagination
        count={Math.ceil(data.count / 100)}
        page={page}
        onChange={handleChange}
      />
    </section>
  );
};

export default Characters;
