import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";

const Header = () => {
  return (
    <header className="header">
      <button className="header__logo-group">
        <h2 className="header__logo">NewsExpolorer</h2>
      </button>

      <button type="text" className="header__button header__button-home">
        Home
        <div className="header__underline"></div>
      </button>

      <button type="text" className="header__button header__button-signin">
        Sign in
      </button>
    </header>
  );
};

export default Header;
