import { React, useCallback, useEffect, useState } from "react";
import ElfCard from "./ElfCard";

const Elves = () => {
  const [loadedElves, setLoadedElves] = useState(25);
  const [elvesArr, setElvesArr] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25,
  ]);
  const [minLevel, setMinLevel] = useState("0");
  const [maxLevel, setMaxLevel] = useState("100");
  const collectionSentinels = "0xa351b769a01b445c04aa1b8e6275e03ec05c1e75";
  const colNameSentinels = "sentinels";

  const elfData = useCallback(() => {
    for (let i = elvesArr[elvesArr.length - 1] + 1; i <= loadedElves; i++) {
      setElvesArr((o) => [...o, i]);
      console.log(elvesArr.length);
    }
  }, [elvesArr, loadedElves]);

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
    <div>
      <h1 className="RED">In construction</h1>
      <div className="levels-input">
        <div>
          <div>Min. Level</div>
          <input
            className="level"
            value={minLevel}
            onChange={(e) => handleMinLevel(e.target.value)}
          />
        </div>
        <div>
          <div>Max. Level</div>
          <input
            className="level"
            value={maxLevel}
            onChange={(e) => handleMaxLevel(e.target.value)}
          />
        </div>
      </div>
      <div className="elves">
        {elvesArr.map((sentinels, key) => {
          return (
            <ElfCard
              key={key}
              typeOfElf={true}
              data={elvesArr}
              elfId={sentinels}
              collectionId={collectionSentinels}
              collectionName={colNameSentinels}
              minLevel={minLevel}
              maxLevel={maxLevel}
            />
          );
        })}
        <button
          className="search"
          id="back"
          onClick={() => setLoadedElves(loadedElves + 25)}
        >
          Load more
        </button>
      </div>
    </div>
  );
};
export default Elves;
