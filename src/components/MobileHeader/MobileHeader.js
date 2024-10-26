import React from "react";
import { Link } from "react-router-dom";

import "./MobileHeader.css";
import menuWhite from "../../images/mobileMenu-home.svg";
import menuDark from "../../images/mobileMenu-saved.svg";

const MobileHeader = ({ currentRoute, handleMobileModal }) => {
  const isSavedNews = currentRoute === "saved-news";
  const menuIcon = isSavedNews ? menuDark : menuWhite;

  return (
    <header
      className={`mobile-header ${
        isSavedNews ? "mobile-header__saved-news" : ""
      }`}
    >
      <div
        className={`mobile-header__container ${
          isSavedNews ? "mobile-header__container-saved-news" : ""
        }`}
      >
        <h2
          className={` mobile-header__button-news-explorer ${
            isSavedNews ? "mobile-header__button_news-explorer-saved-news" : ""
          }`}
        >
          <Link to="/">NewsExpolorer</Link>
        </h2>
        <button
          className="mobile-header__menu-button"
          onClick={handleMobileModal}
        >
          <img
            className="mobile-header__menu-icon"
            src={menuIcon}
            alt="menu icon"
            aria-label="Menu"
          />
        </button>
      </div>
      <div></div>
    </header>
  );
};

export default MobileHeader;
