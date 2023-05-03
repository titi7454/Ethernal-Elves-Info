import React from "react";

function WeeklyLeaderboard({ renLB, moonLB, bossLB }) {
  return (
    <>
      <h2 className="prices">Weekly Leaderboard</h2>
      <div className="leaderboard">
        <div className="LBcontainer">
          <div className="top5">Ren burn</div>
          {renLB.map((lb, key) => {
            key = key + 1;
            let fire;
            if (key === 1) {
              fire = "🔥";
            } else {
              fire = "";
            }
            return (
              <div key={key} className="LBtext">
                <div>
                  {!lb.tokenBurn ? (
                    <div>{`${lb.objectId}`}</div>
                  ) : (
                    <div>{`${fire} ${key}. ${lb.objectId}: ${lb.tokenBurn} ren ${fire}`}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="LBcontainer">
          <div className="top5">Moon burn</div>
          {moonLB.map((lb, key) => {
            key = key + 1;
            let fire;
            if (key === 1) {
              fire = "🔥";
            } else {
              fire = "";
            }
            return (
              <div key={key} className="LBtext">
                {!lb.tokenBurn ? (
                  <div>{`${lb.objectId}`}</div>
                ) : (
                  <div>{`${fire} ${key}. ${lb.objectId}: ${lb.tokenBurn} moon ${fire}`}</div>
                )}
              </div>
            );
          })}
        </div>
        <div className="LBcontainer">
          <div className="top5">Boss kills</div>
          {bossLB.map((lb, key) => {
            key = key + 1;
            let fire;
            if (key === 1) {
              fire = "🔥";
            } else {
              fire = "";
            }
            return (
              <div key={key} className="LBtext">
                {!lb.playerWin ? (
                  <div>{`${lb.objectId}`}</div>
                ) : (
                  <div>{`${fire} ${key}. ${lb.objectId}: ${lb.playerWin} kills ${fire}`}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default WeeklyLeaderboard;
