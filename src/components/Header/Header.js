import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import logout from "../../images/logout-white.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = ({ onLogin, onLogout, isLoggedIn }) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <header className="header">
      <button className="header__logo-group">
        <h2 className="header__logo header__logo-color">
          {" "}
          <Link to="/">NewsExpolorer</Link>
        </h2>
      </button>
      {isLoggedIn ? (
        <>
          <Link to="/">
            <button
              type="text"
              className="header__button header__button-color header__button-home"
            >
              Home
              <div className="header__underline"></div>
            </button>
          </Link>
          <Link to="/saved-news">
            <button
              type="text"
              className="header__button header__button-saved header__button_saved-color"
            >
              Saved articles
            </button>
          </Link>
          <button
            type="text"
            className="header__button header__button-color header__button-logout"
            onClick={onLogout}
          >
            <p className="header__button-text">{currentUser.name}</p>
            <img
              src={logout}
              className="header__logout-img"
              alt="header-logout"
            ></img>
          </button>
        </>
      ) : (
        <>
          <Link to="/">
            <button
              type="text"
              className="header__button header__button-home header__button-color"
            >
              Home
              <div className="header__underline"></div>
            </button>
          </Link>
          <button
            type="text"
            className="header__button header__button-signin header__button-color"
            onClick={onLogin}
          >
            Sign in
          </button>
        </>
      )}
    </header>
  );
};

export default Header;
