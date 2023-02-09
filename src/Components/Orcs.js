import { React, useCallback, useEffect, useState } from "react";
import OrcCard from "./OrcCard";

const Elves = () => {
  const [loadedElves, setLoadedElves] = useState(25);
  const [orcsArr, setElvesArr] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ]);
  const [minLevel, setMinLevel] = useState("0");
  const [maxLevel, setMaxLevel] = useState("10000");
  const collectionOrcs = "0x3abedba3052845ce3f57818032bfa747cded3fca";
  const colNameOrcs = "orcs";

  const elfData = useCallback(() => {
    for (let i = orcsArr[orcsArr.length - 1] + 1; i <= loadedElves; i++) {
      setElvesArr((o) => [...o, i]);
    }
  }, [orcsArr, loadedElves]);

  const handleMinLevel = (e) => {
    setMinLevel(e);
  };

  const handleMaxLevel = (e) => {
    setMaxLevel(e);
  };

  useEffect(() => {
    elfData();
  }, [loadedElves, elfData]);
  return (
    <div className="maindiv">
      <div className="levels-input">
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
        onClick={() => setLoadedElves(loadedElves + 25)}
      >
        Load more
      </button>
    </div>
  );
};
export default Elves;
