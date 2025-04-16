import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import axios from "axios";
import "./Comic.css";

const Comic = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  const fetchData = async () => {
    const response = await axios.get(
      "https://site--marvel-backend--96jcjn4jx467.code.run/comic/" + params.id
    );

    setData(response.data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <section>
      <div className="first-div container">
        <div className="comic-main">
          <div className="comic-pic">
            <img
              src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
              alt="comic cover"
            />
          </div>
          <div className="comic-details">
            <p>{data.title}</p>
            {data.description && (
              <div className="comic-description">
                <p>{data.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comic;
