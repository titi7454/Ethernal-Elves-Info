import { React, useEffect, useState } from "react";
import Countdown from "react-countdown";

const ElfCard = ({
  typeOfElf,
  collectionId,
  collectionName,
  minLevel,
  maxLevel,
  elfId,
  myKey,
  selectClass,
}) => {
  const api = `https://api.ethernalelves.com/api/${collectionName}/${elfId}`;
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
    for (let i = 0; i < elfData.attributes.length; i++) {
      if (elfData.attributes[i].trait_type === "Cooldown") {
        const isZero =
          elfData.attributes[i].value < getCurrUnix()
            ? "Ready"
            : getCD(elfData.attributes[i].value);
        return isZero;
      }
    }
  };

  const getCD = (unix) => {
    let timestamp = new Date(unix * 1000);
    return <Countdown date={timestamp} />;
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(api);
      const result = await response.json();
      setElfData(result);
      setLoading(false);
      console.log(result);
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
    minLevel <= elfData.attributes[elfData.attributes.length - 1].value &&
    maxLevel >= elfData.attributes[elfData.attributes.length - 1].value &&
    // if elder or sentinel option is available
    typeOfElf &&
    // show all elves if no class is selected or show all elves of the selected class
    selectClass === ""
      ? true
      : selectClass === elfData.attributes[0].value
      ? true
      : false
  ) {
    return (
      <div key={myKey} className="child box">
        <button className="btn--stats">i</button>
        <a
          target={"_blank"}
          rel={"noopener noreferrer"}
          href={`https://opensea.io/assets/ethereum/${collectionId}/${elfId}`}
        >
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
        </a>
      </div>
    );
  }
};

export default ElfCard;
