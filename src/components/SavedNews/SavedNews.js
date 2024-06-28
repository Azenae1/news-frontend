import React, { useContext, useState, useEffect } from "react";

import "./SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import SavedNewsList from "../SavedNewsList/SavedNewsList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedNewsContext } from "../../contexts/SavedNewsContext";
import { CurrentPageContext } from "../../contexts/CurrentPageContext";
import { SearchResultContext } from "../../contexts/SearchResultContext";
import { getSavedNews } from "../../utils/api";

const SavedNews = ({ onLogout }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { savedNews, setSavedNews } = useContext(SavedNewsContext);
  const { currentPage } = useContext(CurrentPageContext);
  const { searchResults } = useContext(SearchResultContext);

  const [visibleNews, setVisibleNews] = useState(3);
  const renderMoreNews = () => {
    setVisibleNews((render) => render + 3);
  };
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    getSavedNews(jwt).then(setSavedNews);
  }, [setSavedNews]);

  return (
    <section className="saved__news">
      <SavedNewsHeader onLogout={onLogout} />
      <div className="saved__info">
        <p className="saved__text saved__grey">Saved articles</p>
        <h2 className="saved__title">
          {currentUser.name}, you have X saved articles
        </h2>
        <p className="saved__text">
          By keywords:{" "}
          <span className="saved__text-bold">
            Nature, Yellowstone, and X other
          </span>
        </p>
      </div>
      <SavedNewsList />
    </section>
  );
};

export default SavedNews;
