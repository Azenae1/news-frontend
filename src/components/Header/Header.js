import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import logout from "../../images/logout-white.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = ({ onLogin, onLogout, isLoggedIn }) => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <h2 className="header__logo header__logo-color">
        {" "}
        <Link to="/">NewsExpolorer</Link>
      </h2>

      {isLoggedIn ? (
        <nav style={{ display: "flex" }}>
          <Link to="/" className="header__button header__button-home">
            Home
            <div className="header__underline"></div>
          </Link>

          <Link
            to="/saved-news"
            className="header__button header__button-saved"
          >
            Saved articles
          </Link>
          <button
            type="text"
            className="header__button header__button-logout"
            onClick={onLogout}
          >
            <p className="header__button-text">{currentUser.name}</p>
            <img
              src={logout}
              className="header__logout-img"
              alt="header-logout"
            ></img>
          </button>
        </nav>
      ) : (
        <nav style={{ display: "flex" }}>
          <Link
            to="/"
            className="header__button header__button-color header__button-home"
          >
            Home
            <div className="header__underline"></div>
          </Link>
          <button
            type="text"
            className="header__button header__button-signin header__button-color"
            onClick={onLogin}
          >
            Sign in
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
