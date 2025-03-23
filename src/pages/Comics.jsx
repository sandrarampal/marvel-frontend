import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Comics.css";
import { Pagination } from "@mui/material";
import { FcLike } from "react-icons/fc";
import Deadpool from "../components/Deadpool";
import Loading from "../components/Loading";

// Default values shown

const Comics = ({ token }) => {
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
        filters += "&title=" + search;
      } else {
        filters += "?title=" + search;
      }
    }
    const response = await axios.get(
      "https://site--marvel-backend--96jcjn4jx467.code.run/comics" + filters
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
    <Loading />
  ) : (
    <section>
      <div className="container comics-main">
        <div className="comic-input">
          <div>
            <label htmlFor="">Search</label>
            <input
              type="text"
              placeholder="Type Comic title here"
              onChange={() => {
                const value = event.target.value;
                setSearch(value);
              }}
              value={search}
            />
          </div>
          <Deadpool text="You know who has the best comics, come on, it starts with a D" />
        </div>
        <div className="all-comics">
          {data.results.map((comic, index) => {
            const imagePath = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
            return (
              <div className="one-comic" key={comic._id}>
                <Link className="links" to={`/comic/${comic._id}`}>
                  <div className="comic-title">
                    <span>{comic.title}</span>
                  </div>
                  <div className="card">
                    <div className="card-inner">
                      <div className="comic-image">
                        <img src={imagePath} alt="" />
                      </div>
                      <div className="description-comic">
                        <p>{comic.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>

                <FcLike
                  className="like-icon"
                  onClick={async () => {
                    const response = await axios.post(
                      "https://site--marvel-backend--96jcjn4jx467.code.run/user/favourites/comics",

                      {
                        token: token,
                        favouriteId: comic._id,
                      }
                    );
                    setAdded(comic._id);
                  }}
                />

                {added === comic._id && (
                  <span className="faves">Added to your favourites</span>
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

export default Comics;
