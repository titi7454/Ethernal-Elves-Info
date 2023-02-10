import { React, useEffect, useState } from "react";

const MapCard = ({ typeOfElf, mapId }) => {
  const api = `https://api.ethernalelves.com/api/map/${mapId}`;
  const [mapData, setMapData] = useState("");
  const [loading, setLoading] = useState(true);
  const [biome, setBiome] = useState("");
  const [resource, setResource] = useState("");
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(api);
      const result = await response.json();
      const resources = await result.resourceMakeup;
      const biome = await result.biomeMakeup;
      setBiome(biome);
      setResource(resources);
      setMapData(result);
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
    // if elder or sentinel option is available
    typeOfElf &&
    mapData.image
    // show all elves if no class is selected or show all elves of the selected class
  ) {
    const coasts = Math.floor(biome.coasts * 100) / 100;
    const desert = Math.floor(biome.desert * 100) / 100;
    const dirt = Math.floor(biome.dirt * 100) / 100;
    const grass = Math.floor(biome.grass * 100) / 100;
    const mountains = Math.floor(biome.mountains * 100) / 100;
    const rivers = Math.floor(biome.rivers * 100) / 100;
    const roads = Math.floor(biome.roads * 100) / 100;
    const snow = Math.floor(biome.snow * 100) / 100;
    const swampland = Math.floor(biome.swampland * 100) / 100;
    const water = Math.floor(biome.water * 100) / 100;

    return (
      <div className={`child box card ${flip ? "flip" : ""}`}>
        <button
          className={`map--back ${flip ? "hidden" : ""}`}
          onClick={() => setFlip(!flip)}
        >
          i
        </button>
        <div className="front">
          <a
            target={"_blank"}
            rel={"noopener noreferrer"}
            href={`https://opensea.io/assets/ethereum/0xe77c955452cbbe0ffbd23e0f99e88d58ff6b1f14/${mapId}`}
            className={flip ? "hidden" : ""}
          >
            <div className="box-inner map">
              <div>
                <div>Settlement: {mapId}</div>
                <div>
                  <img
                    className="responsive"
                    src={mapData.image}
                    alt="map"
                  ></img>
                  <div>
                    Biomes:
                    <div className="map--grid">
                      <div>
                        <div>Coasts: {coasts}</div>
                        <div>Desert: {desert}</div>
                        <div>Dirt: {dirt}</div>
                        <div>Grass: {grass}</div>
                        <div>Mountains: {mountains}</div>
                      </div>
                      <div>
                        <div>Rivers: {rivers}</div>
                        <div>Roads: {roads}</div>
                        <div>Snow: {snow}</div>
                        <div>Swampland: {swampland}</div>
                        <div>Water: {water}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className={`back box-inner ${flip ? "" : "hidden"}`}>
          <button
            className="map--back"
            id="btn--stats--back"
            onClick={() => setFlip(!flip)}
          >
            i
          </button>
          <div className="backstats">
            <div className="morestats">Resources used</div>
            <div className="flex">
              <div>Aether:{resource.aether}</div>
              <div>Frost:{resource.frost}</div>
              <div>Iron:{resource.iron}</div>
              <div>Magma:{resource.magma}</div>
              <div>Terra:{resource.terra}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MapCard;
