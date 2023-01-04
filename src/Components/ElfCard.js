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
  const [flip, setFlip] = useState(false);

  const a = (n) => {
    return (
      <div className="statsspace">
        {elfData.attributes[n].trait_type}: {elfData.attributes[n].value}
      </div>
    );
  };

  const getCurrUnix = () => {
    return Math.floor(Date.now() / 1000 + 3600);
  };

  const isReady = () => {
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

  const selectedClass = () => {
    if (selectClass === "") {
      return true;
    } else {
      if (selectClass === elfData.attributes[0].value) {
        return true;
      } else {
        return false;
      }
    }
  };

  const isElder = () => {
    if (elfData.attributes.length > 13) {
      return true;
    } else {
      return false;
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
    selectedClass()
    // show all elves if no class is selected or show all elves of the selected class
  ) {
    return (
      <div key={myKey} className={`child box card ${flip ? "flip" : ""}`}>
        <button
          className={`btn--stats ${flip ? "hidden" : ""}`}
          onClick={() => setFlip(!flip)}
        >
          i
        </button>
        <div className="front">
          <a
            target={"_blank"}
            rel={"noopener noreferrer"}
            href={`https://opensea.io/assets/ethereum/${collectionId}/${elfId}`}
            className={flip ? "hidden" : ""}
          >
            <div className="box-inner">
              <div>{elfData.name}</div>
              <div>
                <img className="responsive" src={elfData.image} alt="elf"></img>
              </div>
              <div>{a(0)}</div>
              <div>{a(2)}</div>
              <div>{a(elfData.attributes.length - 1)}</div>
              {isReady()}
            </div>
          </a>
        </div>
        <div className={`back box-inner ${flip ? "" : "hidden"}`}>
          <button
            className="btn--stats"
            id="btn--stats--back"
            onClick={() => setFlip(!flip)}
          >
            i
          </button>
          <div className="backstats">
            <div className="morestats">More stats</div>
            {a(0)}
            {a(2)}
            {isElder() ? a(7) : a(6)}
            {isElder() ? a(9) : a(7)}
            {isElder() ? a(8) : a(9)}
            {isElder() ? a(10) : ""}
            {isElder() ? a(11) : ""}
            {isElder() ? a(12) : ""}
            {isElder() ? a(13) : ""}
            {isElder() ? a(15) : a(11)}
            {isReady()}
          </div>
        </div>
      </div>
    );
  }
};

export default ElfCard;
