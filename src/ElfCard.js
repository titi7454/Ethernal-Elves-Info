import { React } from "react";
import Elf from "./Elf";

const ElfCard = ({typeOf, data, collectionId, collectionName, minLevel, maxLevel}) => {
  return (
      typeOf && data.map((sentinels, key) => {
        return (
          <div key={key} className="child box">
            <a
              target={"_blank"}
              rel={"noopener noreferrer"}
              href={`https://opensea.io/assets/ethereum/${collectionId}/${sentinels}`}
            >
              <Elf
                elfId={sentinels}
                collection={collectionName}
                minLevel={minLevel}
                maxLevel={maxLevel}
              />
            </a>
          </div>
        );
      })
  );
};

export default ElfCard;
