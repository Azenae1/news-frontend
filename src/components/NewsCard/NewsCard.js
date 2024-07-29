import React, { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import "./NewsCard.css";
import { getSavedNews } from "../../utils/api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentPageContext } from "../../contexts/CurrentPageContext";
import { SavedNewsContext } from "../../contexts/SavedNewsContext";
import { KeywordContext } from "../../contexts/KeywordContext";

const NewsCard = ({
  newsData,
  handleDeleteCard,
  handleSaveCard,
  isLoggedIn,
  onLogin,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { keyword } = useContext(KeywordContext);
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { savedNews, setSavedNews } = useContext(SavedNewsContext);

  const location = useLocation();

  const isSaved = savedNews.some((card) => card.link === newsData.url);
  // console.log("Is saved:", isSaved, newsData.url);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname, setCurrentPage]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getSavedNews(token).then((news) => {
        setSavedNews(news);
      });
    }
  }, [setSavedNews]);

  const handleFavorite = () => {
    const token = localStorage.getItem("token");
    if (isLoggedIn) {
      handleSaveCard({ newsData, keyword, token }).then(() => {
        getSavedNews(token).then((news) => {
          setSavedNews(news);
        });
      });
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
      : `card__favorite-button ${
          isSaved ? "card__favorite-button_pressed" : ""
        }`;

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
          onClick={isSaved ? handleRemoveFavorite : handleFavorite}
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
      {isHovered && !isLoggedIn && currentPage !== "/saved-news" && (
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
