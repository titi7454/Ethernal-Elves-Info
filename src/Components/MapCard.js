import { React, useEffect, useState } from "react";

const MapCard = ({ typeOfElf, mapId }) => {
  const api = `https://api.ethernalelves.com/api/map/${mapId}`;
  const [mapData, setMapData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(api);
      const result = await response.json();
      setMapData(result);
      setLoading(false);
      console.log(mapData);
    };
    fetchData();
  }, [api]);

  if (loading === true) {
    return (
      <div className="middle-n">
        <div className="ring">
          Loading
          <span className="circle"></span>
        </div>
      </div>
    );
  } else if (
    // check min and max levels
    // if elder or sentinel option is available
    typeOfElf &&
    mapData.image
    // show all elves if no class is selected or show all elves of the selected class
  ) {
    return (
      <div className={`child box card`}>
        <a
          target={"_blank"}
          rel={"noopener noreferrer"}
          href={`https://opensea.io/assets/ethereum/0xe77c955452cbbe0ffbd23e0f99e88d58ff6b1f14/${mapId}`}
        >
          <div className="box-inner">
            <div>
              <div>Id{mapId}</div>
              <div>
                <img className="responsive" src={mapData.image} alt="map"></img>
              </div>
            </div>
          </div>
        </a>
      </div>
    );
  }
};

export default MapCard;
