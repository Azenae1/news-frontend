import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import logout from "../../images/logout-white.svg";

const Header1 = () => {
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

      <button type="text" className="header__button header__button-saved">
        Saved articles
      </button>

      <button type="text" className="header__button header__button-logout">
        <p className="header__button-text">Dude</p>
        <img
          src={logout}
          className="header__logout-img"
          alt="header-logout"
        ></img>
      </button>
    </header>
  );
};

export default Header;
