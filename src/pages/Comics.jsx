import { useEffect, useState } from "react";
import axios from "axios";
import "./Characters.css";

const Comics = () => {
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
          filters += "&title=" + search;
        } else {
          filters += "?title=" + search;
        }
      }
      const response = await axios.get(
        "http://localhost:3000/comics" + filters
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
              <p>{comic.title}</p>
              <div className="character-image">
                <img src={imagePath} alt="" />
              </div>
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

export default Comics;
