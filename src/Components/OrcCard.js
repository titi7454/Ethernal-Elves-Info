import { React, useEffect, useState } from "react";
import Countdown from "react-countdown";

const ElfCard = ({
  typeOfElf,
  collectionId,
  collectionName,
  minLevel,
  maxLevel,
  orcId,
  myKey,
  selectClass,
}) => {
  const api = `https://api.ethernalelves.com/api/${collectionName}/${orcId}`;
  const [orcData, setOrcData] = useState("");
  const [loading, setLoading] = useState(true);
  const [flip, setFlip] = useState(false);

  const a = (n) => {
    return (
      <div className="statsspace">
        {orcData.attributes[n].trait_type}: {orcData.attributes[n].value}
      </div>
    );
  };

  const getCurrUnix = () => {
    return Math.floor(Date.now() / 1000 + 3600);
  };

  const isReady = () => {
    for (let i = 0; i < orcData.attributes.length; i++) {
      if (orcData.attributes[i].trait_type === "Cooldown") {
        const isZero =
          orcData.attributes[i].value < getCurrUnix()
            ? "Ready"
            : getCD(orcData.attributes[i].value);
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
      setOrcData(result);
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
    minLevel <= orcData.attributes[orcData.attributes.length - 2].value &&
    maxLevel >= orcData.attributes[orcData.attributes.length - 2].value &&
    // if elder or sentinel option is available
    typeOfElf
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
            href={`https://opensea.io/assets/ethereum/${collectionId}/${orcId}`}
            className={flip ? "hidden" : ""}
          >
            <div className="box-inner">
              <div>{orcData.name}</div>
              <div>
                <img className="responsive" src={orcData.image} alt="elf"></img>
              </div>
              <div>{a(0)}</div>
              <div>{a(3)}</div>
              <div>{a(orcData.attributes.length - 2)}</div>
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
            {a(3)}
            {a(1)}
            {a(4)}
            {a(6)}
            {a(7)}
            {a(8)}
            {a(9)}
            {a(10)}
            {a(11)}
            {isReady()}
          </div>
        </div>
      </div>
    );
  }
};

export default ElfCard;
