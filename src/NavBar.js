import { React,useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Arrow from "./arrow.png";
import Elf from "./elf.png";

const NavBar = () => {
    const [classImg, setClassImg] = useState("");

  return (
    <nav className="nav">
      <div className="navtitle">
        <div className="title">
        <Link to="/Ethernal-Elves-Info">
          EthernalElves INFO
        </Link>
        <img alt="elf" id="elfimage" src={Elf} height="50px" className={classImg} onClick={() => setClassImg("imgelf")} onAnimationEnd={() => setClassImg("")}></img>
        </div>
        <div className="navflex">
        <div className="unof">Unofficial website of</div>
        <a
          href="https://www.ethernalelves.com/"
          rel={"noopener noreferrer"}
          target={"_blank"}
          className="eelink"
        >
          <div className="ee">EthernalElves</div>
          <img alt="link arrow" height={"12px"} src={Arrow}></img>
        </a>
        </div>
      </div>
      <ul>
        <CustomLink to="/Ethernal-Elves-Info">Analytics</CustomLink>
        <CustomLink to="/LookUp">LookUp</CustomLink>
        <CustomLink to="/Dashboard">Dashboard</CustomLink>
      </ul>
    </nav>
  );
};

const CustomLink = ({ to, children, ...props }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};

export default NavBar;
