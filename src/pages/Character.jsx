import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Character = () => {
  const [data, setData] = useState(null);
  const [dataComics, setDataComics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/character/" + params.id
      );
      const response2 = await axios.get(
        "http://localhost:3000/comics/" + params.id
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
        <p>{data.name}</p>
        <div>
          <img
            src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
            alt=""
          />
        </div>
        <p>{data.description}</p>

        <div>
          {dataComics.map((comic, index) => {
            return (
              <div key={comic._id}>
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt=""
                />
                <p>{comic.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Character;
