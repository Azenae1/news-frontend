import React, { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";

import "./SearchList.css";
import NewsCard from "../NewsCard/NewsCard";
import { getSavedNews } from "../../utils/api";
import { SearchResultContext } from "../../contexts/SearchResultContext";
import { CurrentPageContext } from "../../contexts/CurrentPageContext";
import { SavedNewsContext } from "../../contexts/SavedNewsContext";

const SearchList = ({
  handleDeleteCard,
  handleSaveCard,
  isLoggedIn,
  onLogin,
}) => {
  const { searchResults } = useContext(SearchResultContext);
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { setSavedNews } = useContext(SavedNewsContext);
  const location = useLocation();
  const [visibleNews, setVisibleNews] = useState(3);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname, setCurrentPage]);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      getSavedNews(jwt).then(setSavedNews);
    }
  }, [setSavedNews]);

  const renderMoreNews = () => {
    setVisibleNews((render) => render + 3);
  };

  return (
    <section className="searchlist">
      {currentPage === "/" ? (
        <h2 className="searchlist__title">Search results</h2>
      ) : (
        ""
      )}
      <ul className="searchlist__cards">
        {searchResults.slice(0, visibleNews).map((news) => {
          return (
            <NewsCard
              newsData={news}
              key={news.url}
              handleDeleteCard={handleDeleteCard}
              handleSaveCard={handleSaveCard}
              isLoggedIn={isLoggedIn}
              onLogin={onLogin}
            />
          );
        })}
      </ul>
      {visibleNews < searchResults.length && (
        <button onClick={renderMoreNews} className="searchlist__button">
          Show more
        </button>
      )}
    </section>
  );
};

export default SearchList;
