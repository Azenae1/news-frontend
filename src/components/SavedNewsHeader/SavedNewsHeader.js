import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "../Header/Header.css";
import "../SavedNews/SavedNews.css";
import logout from "../../images/logout-black.svg";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const SavedNewsHeader = ({ onLogout }) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <section className="header saved-news__header">
      <button className="header__logo-group">
        <h2 className="header__logo">
          {" "}
          <Link to="/">NewsExpolorer</Link>
        </h2>
      </button>
      <nav style={{ display: "flex" }}>
        <button
          type="text"
          className="header__button header__button-home saved-news__header-button"
        >
          <Link to="/">Home</Link>
        </button>

        <button
          type="text"
          className="header__button header__button-saved saved-news__header-button"
        >
          <Link to="/saved-news">Saved articles</Link>
          <div className="saved-news__underline"></div>
        </button>

        <button
          type="text"
          className="header__button saved-news__header-logout header__button-logout "
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
    </section>
  );
};

export default SavedNewsHeader;
