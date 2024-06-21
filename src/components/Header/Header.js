import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import logout from "../../images/logout-white.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = ({ onLogin, onLogout, isLoggedIn }) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <header className="header">
      <button className="header__logo-group">
        <h2 className="header__logo header__logo-color">NewsExpolorer</h2>
      </button>
      {isLoggedIn ? (
        <>
          <button
            type="text"
            className="header__button header__button-color header__button-home"
          >
            <Link to="/">Home</Link>
            <div className="header__underline"></div>
          </button>
          <button
            type="text"
            className="header__button header__button-saved header__button_saved-color"
          >
            <Link to="/saved-news">Saved articles</Link>
          </button>
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
          <button
            type="text"
            className="header__button header__button-home header__button-color"
          >
            <Link to="/">Home</Link>
            <div className="header__underline"></div>
          </button>
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

const Header1 = ({ onRegister, onLogin }) => {
  return (
    <header className="header">
      <button className="header__logo-group">
        <h2 className="header__logo header__logo-color">NewsExpolorer</h2>
      </button>

      <button
        type="text"
        className="header__button header__button-color header__button-home"
      >
        <Link to="/">Home</Link>
        <div className="header__underline"></div>
      </button>

      <button
        type="text"
        className="header__button header__button-saved header__button_saved-color"
      >
        <Link to="/saved-news">Saved articles</Link>
      </button>

      <button
        type="text"
        className="header__button header__button-color header__button-logout"
      >
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
