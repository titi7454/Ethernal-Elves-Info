import React from "react";
import ElfCard from "./ElfCard";
import OrcCard from "./OrcCard";
import MapCard from "./MapCard";

const NftCards = ({
  ownerData,
  isUsingFilter,
  filterData,
  elder,
  sentinel,
  orc,
  minLevel,
  maxLevel,
  map,
}) => {
  const collectionElders = "0xfb2b13c622d1590f9199f75d975574e8240b2618";
  const colNameElders = "elders";
  const collectionSentinels = "0xa351b769a01b445c04aa1b8e6275e03ec05c1e75";
  const colNameSentinels = "sentinels";
  const collectionOrcs = "0x3abedba3052845ce3f57818032bfa747cded3fca";
  const collectionAllies = "0x62674b8ace7d939bb07bea6d32c55b74650e0eaa";
  const colNameOrcs = "orcs";
  return (
    <>
      <div>
        {`Sentinels: ${ownerData.sentinels.length} Elders: ${ownerData.elders.length} Orcs: ${ownerData.orcs.length}`}
      </div>
      <div className="elves">
        {isUsingFilter
          ? filterData.elders.map((elders, key) => {
              return (
                <ElfCard
                  typeOfElf={elder}
                  elfId={elders}
                  collectionId={collectionElders}
                  collectionName={colNameElders}
                  minLevel={minLevel}
                  maxLevel={maxLevel}
                  key={key}
                  selectClass=""
                />
              );
            })
          : ownerData.elders.map((elders, key) => {
              return (
                <ElfCard
                  typeOfElf={elder}
                  elfId={elders}
                  collectionId={collectionElders}
                  collectionName={colNameElders}
                  minLevel={minLevel}
                  maxLevel={maxLevel}
                  key={key}
                  selectClass=""
                />
              );
            })}
        {isUsingFilter
          ? filterData.sentinels.map((sentinels, key) => {
              return (
                <ElfCard
                  typeOfElf={sentinel}
                  elfId={sentinels}
                  collectionId={collectionSentinels}
                  collectionName={colNameSentinels}
                  minLevel={minLevel}
                  maxLevel={maxLevel}
                  key={key}
                  selectClass=""
                />
              );
            })
          : ownerData.sentinels.map((sentinels, key) => {
              return (
                <ElfCard
                  typeOfElf={sentinel}
                  elfId={sentinels}
                  collectionId={collectionSentinels}
                  collectionName={colNameSentinels}
                  minLevel={minLevel}
                  maxLevel={maxLevel}
                  key={key}
                  selectClass=""
                />
              );
            })}
        {isUsingFilter
          ? filterData.orcs.map((orcs, key) => {
              return (
                <OrcCard
                  typeOfElf={orc}
                  orcId={orcs}
                  collectionId={orcs > 5050 ? collectionAllies : collectionOrcs}
                  collectionName={colNameOrcs}
                  minLevel={minLevel}
                  maxLevel={maxLevel}
                  key={key}
                  selectClass=""
                />
              );
            })
          : ownerData.orcs.map((orcs, key) => {
              return (
                <OrcCard
                  typeOfElf={orc}
                  orcId={orcs}
                  collectionId={orcs > 5050 ? collectionAllies : collectionOrcs}
                  collectionName={colNameOrcs}
                  minLevel={minLevel}
                  maxLevel={maxLevel}
                  key={key}
                  selectClass=""
                />
              );
            })}
        {isUsingFilter
          ? filterData.settlements.map((settlements, key) => {
              return <MapCard mapId={settlements} typeOfElf={map} key={key} />;
            })
          : ownerData.settlements.map((settlements, key) => {
              return <MapCard mapId={settlements} typeOfElf={map} key={key} />;
            })}
      </div>
    </>
  );
};

export default NftCards;
