import { React, useCallback, useEffect, useState } from "react";
import OrcCard from "./OrcCard";

const Orcs = () => {
  const [loadedOrcs, setLoadedOrcs] = useState(25);
  const [orcsArr, setOrcsArr] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ]);
  const [orcsArrCopy, setOrcsArrCopy] = useState(orcsArr);
  const [orcById, setOrcById] = useState([]);
  const [minLevel, setMinLevel] = useState("0");
  const [maxLevel, setMaxLevel] = useState("10000");
  const collectionOrcs = "0x3abedba3052845ce3f57818032bfa747cded3fca";
  const colNameOrcs = "orcs";

  const copyArray = () => {
    setOrcsArr((orcsArr) => orcsArrCopy);
  };

  const orcData = () => {
    for (let i = orcsArr[orcsArr.length-1]+1; i <= loadedOrcs; i++) {
      setOrcsArr((o) => [...o, i]);
    }
  };

  const handleMinLevel = (e) => {
    setMinLevel(e);
  };

  const handleMaxLevel = (e) => {
    setMaxLevel(e);
  };

  const handleSearchById = (e) => {
    setOrcById(e);
    if (e.length === 0) {
      copyArray();
      return;
    }
    if (orcsArr.filter((orc) => orc === Number(e)) && !orcsArr) {
      const filteredArr = orcsArr.filter((orc) => orc === Number(e));
      setOrcsArr([filteredArr]);
    } else {
      const newSearch = Number(e);
      setOrcsArr([newSearch]);
    }
  };

  useEffect(() => {
    orcData();
  }, [loadedOrcs]);
  return (
    <div className="maindiv">
      <div className="levels-input">
        <div className="up">
          <div>Search by Id</div>
          <input
            className="level"
            value={orcById}
            onChange={(e) => handleSearchById(e.target.value)}
          />
        </div>
        <div className="up">
          <div>Min. Level</div>
          <input
            className="level"
            value={minLevel}
            onChange={(e) => handleMinLevel(e.target.value)}
          />
        </div>
        <div className="up">
          <div>Max. Level</div>
          <input
            className="level"
            value={maxLevel}
            onChange={(e) => handleMaxLevel(e.target.value)}
          />
        </div>
      </div>
      <div className="elves">
        {orcsArr.map((orcs, key) => {
          return (
            <OrcCard
              key={key}
              typeOfElf={true}
              data={orcsArr}
              orcId={orcs}
              collectionId={collectionOrcs}
              collectionName={colNameOrcs}
              minLevel={minLevel}
              maxLevel={maxLevel}
            />
          );
        })}
      </div>
      <button
        className="search"
        id="loadmore"
        onClick={() => setLoadedOrcs(loadedOrcs + 25)}
      >
        Load more
      </button>
    </div>
  );
};
export default Orcs;
