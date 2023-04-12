import { useState } from "react";
import { Link } from "react-router-dom";

function Banner() {
  const [isActive, setIsActive] = useState(true);
  if (isActive) {
    return (
      <div className="banner">
        <div>
          There is a new update. Check it out here:{" "}
          <Link to="/Changelog" onClick={() => setIsActive(false)}>
            Changelog
          </Link>
        </div>
        <button onClick={() => setIsActive(false)} className="close">X</button>
      </div>
    );
  }
}

export default Banner;
