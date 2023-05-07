import React from "react";

import REN from "../../Assets/REN.png";
import MOON from "../../Assets/MOON.png";
import Aether from "../Assets/Aether.png";
import Artifacts from "../Assets/Artifacts.png";
import Scrolls from "../Assets/Scrolls.png";
import Magma from "../Assets/Magma.png";
import Frost from "../Assets/Frost.png";
import Iron from "../Assets/Iron.png";
import Terra from "../Assets/Terra.png";
import ZUG from "../Assets/ZUG.png";

const Loot = ({ lootData }) => {
  const lootItems = (n, img) => {
    return (
      <div className="flexloot">
        <img
          src={img}
          width={img === ZUG ? 50 : 40}
          height={40}
          alt={lootData[n].name}
          className="lootborder"
        />
        <div className="grid">
          <div>{lootData[n].value}</div>
          <div>{lootData[n].name}</div>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className="loot">
        <div>
          {lootData[0].name}
          <div className="lootItems">
            {lootItems(1, REN)}
            {lootItems(2, MOON)}
            {lootItems(3, ZUG)}
            {lootItems(4, MOON)}
          </div>
        </div>
        <div>
          {lootData[5].name}
          <div className="lootItems">
            {lootItems(6, Artifacts)}
            {lootItems(7, Scrolls)}
            {lootItems(8, Aether)}
            {lootItems(9, Iron)}
            {lootItems(10, Terra)}
            {lootItems(11, Frost)}
            {lootItems(12, Magma)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Loot;
