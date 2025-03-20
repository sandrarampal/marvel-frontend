import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Favourites = ({ favourite, setFavourite }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const cookies = Cookies.get("favourite");

  if (cookies) {
    const tabData = JSON.parse(cookies);
    console.log(tabData);
    const fetchData = async () => {
      for (let i = 0; i < tabData.length; i++) {
        try {
          const response = await axios.get(
            "http://localhost:3000/character/" + tabData[i]
          );
          tabData.push(response.data);

          setData(tabData);
          setIsLoading(false);
        } catch (error) {
          console.log(error.response);
        }
      }
    };
    useEffect(() => {
      fetchData();
    }, []);
  }

  console.log(data);

  return isLoading ? (
    <p>Chargement</p>
  ) : (
    <section>
      {/* <div>
        {data &&
          data.map((character, index) => {
            return (
              <div key={character._id}>
                <p>{character.name}</p>
              </div>
            );
          })}
      </div> */}
    </section>
  );
};

export default Favourites;
