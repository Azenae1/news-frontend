import React, { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import "./NewsCard.css";
import { getSavedNews } from "../../utils/api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentPageContext } from "../../contexts/CurrentPageContext";
import { SavedNewsContext } from "../../contexts/SavedNewsContext";
import { KeywordContext } from "../../contexts/KeywordContext";
// import img from "../../images/main-background.png";

// import trash from "../../images/trash-grey.svg";
// import trash_hover from "../../images/trash-black.svg";
// import flag from "../../images/flag.svg";
// import flag_hover from "../../images/flag-hover.svg";
// import flag_marked from "../../images/flag-marked.svg";

const NewsCard = ({ newsData, handleDeleteCard, handleSaveCard, onLogin }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMarked] = useState(false);

  const { keyword } = useContext(KeywordContext);
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { isLoggedIn } = useContext(CurrentUserContext);
  const { savedNews, setSavedNews } = useContext(SavedNewsContext);

  const location = useLocation();

  const isSaved = savedNews.find((card) => card.link === newsData.url);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname, setCurrentPage]);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    getSavedNews(jwt).then(() => {
      setSavedNews(savedNews);
    });
  }, [setSavedNews, savedNews]);

  const handleFavorite = () => {
    const token = localStorage.getItem("token");
    if (isLoggedIn) {
      handleSaveCard({ newsData, keyword, token });
    } else {
      onLogin();
    }
  };

  const handleRemoveFavorite = () => {
    const token = localStorage.getItem("token");
    handleDeleteCard({ newsData, token });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const iconClass =
    currentPage === "/saved-news"
      ? "card__delete-button"
      : "card__favorite-button";

  return (
    <li className="card">
      <div
        className="card__button-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          className={iconClass}
          type="button"
          onClick={!isMarked ? handleFavorite : handleRemoveFavorite}
        ></button>
      </div>
      <img
        src={newsData.image || newsData.urlToImage}
        alt={newsData.link || newsData.url}
        className="card__image"
        id="card-image"
      />

      {currentPage === "/saved-news" && newsData.keyword && (
        <p className="card__tag">{newsData.keyword}</p>
      )}
      {isHovered && currentPage !== "/saved-news" && (
        <div className="card__favorite-login">
          <p className="card__favorite-text">Sign in to save articles</p>
        </div>
      )}

      {isHovered && currentPage === "/saved-news" && (
        <div className="card__favorite-remove">
          <p className="card__favorite-text">Remove from saved</p>
        </div>
      )}

      <div className="card__description">
        <p className="card__date">
          {new Date(newsData.publishedAt || newsData.date).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}
        </p>
        <h3 className="card__name" id="card-name">
          {newsData.title}
        </h3>
        <p className="card__text">{newsData.text || newsData.description}</p>
        <p className="card__source">
          {newsData.source.name || newsData.source}
        </p>
      </div>
    </li>
  );
};

export default NewsCard;
