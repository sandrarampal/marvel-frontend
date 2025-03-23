import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Characters.css";
import { Pagination } from "@mui/material";
import { FcLike } from "react-icons/fc";
import Deadpool from "../components/Deadpool";

const Characters = ({ token }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [added, setAdded] = useState("");

  const fetchData = async () => {
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
      "https://site--marvel-backend--96jcjn4jx467.code.run/characters" + filters
    );

    setData(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return isLoading ? (
    <p>Chargement</p>
  ) : (
    <section>
      <div className="container">
        <div className="character-input">
          <div>
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              placeholder="Type Character name here"
              onChange={() => {
                const value = event.target.value;
                setSearch(value);
              }}
              value={search}
            />
          </div>
          <Deadpool text="None of those losers are any fun, but I am! You know my name !" />
        </div>
        <div className="all-characters container">
          {data.results.map((character, index) => {
            const imagePath = `${character.thumbnail.path}.${character.thumbnail.extension}`;

            return (
              <div className="one-character" key={character._id}>
                <Link to={`/character/${character._id}`} className="links">
                  <div className="character-name">
                    <span>{character.name}</span>
                  </div>
                  <div className="card">
                    {" "}
                    <div className="card-inner">
                      <div className="character-image">
                        <img
                          src={imagePath}
                          alt="picture of the character"
                          className={
                            imagePath ===
                            "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                              ? "no-image"
                              : ""
                          }
                        />
                      </div>

                      <div className="description-div">
                        <div>
                          <p>{character.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {token && (
                  <FcLike
                    className="like-icon"
                    onClick={async () => {
                      const response = await axios.post(
                        "https://site--marvel-backend--96jcjn4jx467.code.run/user/favourites/characters",

                        {
                          token: token,
                          favouriteId: character._id,
                        }
                      );
                      setAdded(character._id);
                    }}
                  />
                )}
                {added === character._id && (
                  <span className="added">Added to your favourites</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="pages">
          <Pagination
            count={Math.ceil(data.count / 100)}
            page={page}
            onChange={handleChange}
          />
        </div>
      </div>
    </section>
  );
};

export default Characters;
