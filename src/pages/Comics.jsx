import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Characters.css";
import { Pagination } from "@mui/material";

const Comics = ({ token }) => {
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
      <div className="all-characters">
        {data.results.map((comic, index) => {
          const imagePath = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
          return (
            <div className="one-character" key={comic._id}>
              <Link to={`/comic/${comic._id}`}>
                <p>{comic.title}</p>
                <div className="character-image">
                  <img src={imagePath} alt="" />
                </div>
              </Link>
              <button
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
              >
                Like
              </button>
              {added === comic._id && <span>Added to your favourites</span>}
            </div>
          );
        })}
      </div>
      <Pagination
        count={Math.ceil(data.count / 100)}
        page={page}
        onChange={handleChange}
      />
      ;
      {/* <button
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
      </button> */}
    </section>
  );
};

export default Comics;
