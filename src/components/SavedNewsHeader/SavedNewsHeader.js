import React, { useContext } from "react";

import "../Header/Header.css";
import "../SavedNews/SavedNews.css";
import logout from "../../images/logout-black.svg";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const SavedNewsHeader = ({ onLogout }) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <section className="header saved__header">
      <button className="header__logo-group">
        <h2 className="header__logo">NewsExpolorer</h2>
      </button>

      <button type="text" className="header__button header__button-home">
        Home
      </button>

      <button type="text" className="header__button header__button-saved">
        Saved articles
        <div className="saved__underline"></div>
      </button>

      <button
        type="text"
        className="header__button header__button-logout saved__header-logout"
        onClick={onLogout}
      >
        <p className="header__button-text">{currentUser.name}</p>
        <img
          src={logout}
          className="header__logout-img"
          alt="header-logout"
        ></img>
      </button>
    </section>
  );
};

export default SavedNewsHeader;
