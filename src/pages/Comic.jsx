import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Comic = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://site--marvel-backend--96jcjn4jx467.code.run/comic/" + params.id
      );

      setData(response.data);
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
      </div>
    </section>
  );
};

export default Comic;
