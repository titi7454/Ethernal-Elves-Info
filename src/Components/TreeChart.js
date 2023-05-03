import React, { useState } from "react";
import { Group } from "@visx/group";
import { hierarchy, Tree } from "@visx/hierarchy";
import { LinearGradient } from "@visx/gradient";
import { pointRadial } from "d3-shape";
import useForceUpdate from "./useForceUpdate";
import LinkControls from "./LinkControls";
import getLinkComponent from "./getLinkComponent";

const defaultMargin = { top: 50, left: 45, right: 250, bottom: 50 };

export default function TreeChart({
  width: totalWidth,
  height: totalHeight,
  margin = defaultMargin,
  renBurnData,
}) {
  const [layout, setLayout] = useState("cartesian");
  const [orientation, setOrientation] = useState("horizontal");
  const [linkType, setLinkType] = useState("diagonal");
  const [stepPercent, setStepPercent] = useState(0.5);
  const forceUpdate = useForceUpdate();

  const innerWidth = totalWidth - margin.left - margin.right;
  const innerHeight = totalHeight - margin.top - margin.bottom;
  const data = {
    name: `${renBurnData[renBurnData.length - 1]?.name}`,
    number: `${renBurnData[renBurnData.length - 1]?.burn}`,
    children: [
      {
        name: `${renBurnData[0]?.name}`,
        number: `${renBurnData[0]?.burn}`,

        children: [
          {
            name: `${renBurnData[1]?.name}`,
            number: `${renBurnData[1]?.burn}`,
          },
          {
            name: `${renBurnData[2]?.name}`,
            number: `${renBurnData[2]?.burn}`,
          },
          {
            name: `${renBurnData[3]?.name}`,
            number: `${renBurnData[3]?.burn}`,
          },
          {
            name: `${renBurnData[4]?.name}`,
            number: `${renBurnData[4]?.burn}`,
          },
          {
            name: `${renBurnData[5]?.name}`,
            number: `${renBurnData[5]?.burn}`,
          },
          {
            name: `${renBurnData[6]?.name}`,
            number: `${renBurnData[6]?.burn}`,
          },
          {
            name: `${renBurnData[7]?.name}`,
            number: `${renBurnData[7]?.burn}`,
          },
          {
            name: `${renBurnData[8]?.name}`,
            number: `${renBurnData[8]?.burn}`,
          },
          {
            name: `${renBurnData[9]?.name}`,
            number: `${renBurnData[9]?.burn}`,
          },
          {
            name: `${renBurnData[10]?.name}`,
            number: `${renBurnData[10]?.burn}`,
          },
          {
            name: `${renBurnData[11]?.name}`,
            number: `${renBurnData[11]?.burn}`,
          },
        ],
      },
      {
        name: `${renBurnData[19]?.name}`,
        number: `${renBurnData[19]?.burn}`,
      },
      {
        name: "",
        children: [
          {
            name: `${renBurnData[14]?.name}`,
            number: `${renBurnData[14]?.burn}`,
          },
          {
            name: `${renBurnData[15]?.name}`,
            number: `${renBurnData[15]?.burn}`,
          },
          {
            name: `${renBurnData[16]?.name}`,
            number: `${renBurnData[16]?.burn}`,
          },
          {
            name: `${renBurnData[17]?.name}`,
            number: `${renBurnData[17]?.burn}`,
          },
          {
            name: `${renBurnData[18]?.name}`,
            number: `${renBurnData[18]?.burn}`,
          },

          {
            name: `${renBurnData[20]?.name}`,
            number: `${renBurnData[20]?.burn}`,
          },
        ],
      },
    ],
  };

  let origin;
  let sizeWidth;
  let sizeHeight;

  if (layout === "polar") {
    origin = {
      x: innerWidth / 2,
      y: innerHeight / 2,
    };
    sizeWidth = 2 * Math.PI;
    sizeHeight = Math.min(innerWidth, innerHeight) / 2;
  } else {
    origin = { x: 0, y: 0 };
    if (orientation === "vertical") {
      sizeWidth = innerWidth;
      sizeHeight = innerHeight;
    } else {
      sizeWidth = innerHeight;
      sizeHeight = innerWidth;
    }
  }

  const LinkComponent = getLinkComponent({ layout, linkType, orientation });

  return totalWidth < 10 ? null : (
    <div>
      <svg width={totalWidth} height={totalHeight}>
        <rect width={totalWidth} height={totalHeight} rx={8} fill="#282c34" />
        <Group top={margin.top} left={margin.left}>
          <Tree
            root={hierarchy(data, (d) => (d.isExpanded ? null : d.children))}
            size={[sizeWidth, sizeHeight]}
            separation={(a, b) => (a.parent === b.parent ? 0.4 : 0.7) / a.depth}
          >
            {(tree) => (
              <Group top={origin.y} left={origin.x}>
                {tree.links().map((link, i) => {
                  return (
                    <LinkComponent
                      key={i}
                      data={link}
                      percent={stepPercent}
                      stroke={
                        link.source.data.name === ""
                          ? "rgb(147, 250, 165,0.4)"
                          : link.source.data.name === "Burned"
                          ? "rgb(196, 77, 86,0.7)"
                          : "rgb(147, 250, 165,0.4)"
                      }
                      strokeWidth={
                        link.source.data.name === "Created"
                          ? "4"
                          : link.source.data.name === "Burned"
                          ? "3"
                          : "5"
                      }
                      fill="none"
                    />
                  );
                })}

                {tree.descendants().map((node, key) => {
                  const width = 0;
                  const height = 0;

                  let top;
                  let left;
                  if (layout === "polar") {
                    const [radialX, radialY] = pointRadial(node.x, node.y);
                    top = radialY;
                    left = radialX;
                  } else if (orientation === "vertical") {
                    top = node.y;
                    left = node.x;
                  } else {
                    top = node.x;
                    left = node.y;
                  }

                  return (
                    <Group top={top} left={left} key={key}>
                      {node.depth === 0 && (
                        <circle
                          r={12}
                          fill="url('#links-gradient')"
                          onClick={() => {
                            node.data.isExpanded = !node.data.isExpanded;
                            console.log(node);
                            forceUpdate();
                          }}
                        />
                      )}

                      <text
                        dy="-0.3em"
                        fontSize={
                          node.depth === 0
                            ? "1.4rem"
                            : node.depth === 1
                            ? "1.2rem"
                            : "1rem"
                        }
                        fontFamily="Arial"
                        style={{ pointerEvents: "none" }}
                        textAnchor={node.depth === 0 ? "middle" : ""}
                        fill={
                          node.depth === 0
                            ? "white"
                            : node.children
                            ? "white"
                            : "#26deb0"
                        }
                      >
                        {node.data.name === "" ? "" : `${node.data.name}:`}
                      </text>
                      <text
                        dy="1em"
                        fontSize={
                          node.depth === 0
                            ? "1.2rem"
                            : node.depth === 1
                            ? "1rem"
                            : "0.8rem"
                        }
                        fontFamily="Arial"
                        style={{ pointerEvents: "none" }}
                        textAnchor={node.depth === 0 ? "middle" : ""}
                        fill={
                          node.depth === 0
                            ? "white"
                            : node.children
                            ? "white"
                            : "#26deb0"
                        }
                      >
                        {node.data.number}
                      </text>
                    </Group>
                  );
                })}
              </Group>
            )}
          </Tree>
        </Group>
      </svg>
    </div>
  );
}
