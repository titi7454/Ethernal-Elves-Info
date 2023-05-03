import React from "react";
import Checkbox from "./Checkbox";

const WalletSettings = ({
  restart,
  minLevel,
  maxLevel,
  handleMinLevel,
  handleMaxLevel,
  handleSearchById,
  elfById,
  elder,
  onElderChange,
  sentinel,
  onSentinelChange,
  orc,
  onOrcChange,
  map,
  onMapChange,
}) => {
  return (
    <>
      <button className="search" id="back" onClick={restart}>
        Back
      </button>
      <div className="checkbox">
        <div className="checkbox" id="chmb">
          <div className="up">
            <div>Search by Id</div>
            <input
              className="level"
              value={elfById}
              onChange={(e) => handleSearchById(e.target.value)}
            />
          </div>
          <div className="lb1">
            <div>Elders</div>
            <Checkbox id="elder" checked={elder} onChange={onElderChange} />
          </div>
          <div className="lb2">
            <div>Sentinels</div>
            <Checkbox
              id="sentinel"
              checked={sentinel}
              onChange={onSentinelChange}
            />
          </div>
          <div className="lb2">
            <div>Orcs</div>
            <Checkbox id="orc" checked={orc} onChange={onOrcChange} />
          </div>
          <div className="lb2">
            <div>Settlements</div>
            <Checkbox id="map" checked={map} onChange={onMapChange} />
          </div>
        </div>
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
      </div>
    </>
  );
};

export default WalletSettings;
