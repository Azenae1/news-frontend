import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo-group">
        <h2 className="header__logo">NewsExpolorer</h2>
      </div>

      <button type="text" className="header__button header__button-home">
        Home
      </button>

      <button type="text" className="header__button">
        Sign In
      </button>
    </header>
  );
};

export default Header;
