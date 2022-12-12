import { React, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Arrow from "./arrow.png";
import Elf from "./elf.png";
import Burger from "./burger.svg";
import Close from "./close.svg";

const NavBar = () => {
  const [classImg, setClassImg] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // <CustomLink to="/Dashboard">Dashboard</CustomLink>

  return (
    <nav className="nav">
      <div className="navtitle">
        <div className="title">
          <Link to="/Ethernal-Elves-Info">EthernalElves INFO</Link>
          <img
            alt="elf"
            id="elfimage"
            src={Elf}
            height="50px"
            className={classImg}
            onClick={() => setClassImg("imgelf")}
            onAnimationEnd={() => setClassImg("")}
          ></img>
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
      {
        <ul className={"navitems-n"}>
          <CustomLink to="/Ethernal-Elves-Info">Analytics</CustomLink>
          <CustomLink to="/LookUp">LookUp</CustomLink>
          <CustomLink to="/Elves">Elves</CustomLink>
          <CustomLink to="/Elders">Elders</CustomLink>
        </ul>
      }
      {isOpen && (
        <ul className={"navitems"}>
          <CustomLink to="/Ethernal-Elves-Info">Analytics</CustomLink>
          <CustomLink to="/LookUp">LookUp</CustomLink>
          <CustomLink to="/Elves">Elves</CustomLink>
          <CustomLink to="/Elders">Elders</CustomLink>
        </ul>
      )}
      <img
        alt="burger menu"
        id={isOpen ? "close-menu" : "burger-menu"}
        src={isOpen ? Close : Burger}
        height={isOpen ? "80px" : "50px"}
        className={classImg}
        onClick={() => setIsOpen(!isOpen)}
      />
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
