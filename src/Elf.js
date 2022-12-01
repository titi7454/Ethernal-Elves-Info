import { React, useEffect, useState } from "react";
import Countdown from "react-countdown";

const Elf = ({ elfId, collection }) => {
  const api = `https://api.ethernalelves.com/api/${collection}/${elfId}`;
  const [elfData, setElfData] = useState("");
  const [loading, setLoading] = useState(true);

  const a = (n) => {
    return (
      <div>
        {elfData.attributes[n].trait_type}:{elfData.attributes[n].value}
      </div>
    );
  };

  const getCurrUnix = () => {
    return Math.floor(Date.now() / 1000 + 3600);
  };

  const isElder = () => {
    if (elfData.attributes[8].trait_type === "Agility") {
      const isZero =
        elfData.attributes[14].value < getCurrUnix()
          ? "Ready"
          : getCD(elfData.attributes[14].value);
      return isZero;
    } else {
      const isZero =
        elfData.attributes[8].value < getCurrUnix()
          ? "Ready"
          : getCD(elfData.attributes[8].value);
      return isZero;
    }
  };

  const getCD = (unix) => {
    let timestamp = new Date(unix * 1000);
    // var date = new Date(timestamp * 1000);
    // // Hours part from the timestamp
    // var h = date.getHours();
    // var hours = h < 10 ? "0" + date.getHours() : date.getHours();
    // // Minutes part from the timestamp
    // var m = date.getMinutes();
    // var minutes = m < 10 ? "0" + date.getMinutes() : date.getMinutes();
    // // Seconds part from the timestamp
    // var s = date.getSeconds();
    // var seconds = s < 10 ? "0" + date.getSeconds() : date.getSeconds();

    // // Will display time in 10:30:23 format
    // var formattedTime =
    //   hours + ":" + minutes + ":" + seconds;
    return <Countdown date={timestamp} />;
  };
  useEffect(() => {
    //Get data from the api
    const fetchData = async () => {
      const response = await fetch(api);
      const result = await response.json();
      setElfData(result);
      setLoading(false);
    };
    fetchData();
  }, [api, elfId]);
  if (loading === true) {
    return <p>loading...</p>;
  } else
    return (
      //Create a table with every nft of the owner
      <div className="box-inner">
        <div>{elfData.name}</div>
        <div>
          <img className="responsive" src={elfData.image} alt="elf"></img>
        </div>
        <div>{a(0)}</div>
        <div>{a(2)}</div>
        <div>{a(elfData.attributes.length - 1)}</div>
        {isElder()}
      </div>
    );
};

export default Elf;
