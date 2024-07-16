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
import MobileHeader from "../MobileHeader/MobileHeader";

const SavedNews = ({ onLogout, handleMobileModal }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { savedNews, setSavedNews } = useContext(SavedNewsContext);
  const { currentPage } = useContext(CurrentPageContext);
  const { searchResults } = useContext(SearchResultContext);

  const userNews = savedNews.filter((card) => card.owner === currentUser._id);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="saved__news">
      {isMobile ? (
        <MobileHeader
          currentRoute="saved-news"
          handleMobileModal={handleMobileModal}
        />
      ) : (
        <SavedNewsHeader onLogout={onLogout} />
      )}

      <div className="saved__info">
        <p className="saved__text saved__grey">Saved articles</p>
        <h2 className="saved__title">
          {currentUser.name}, you{" "}
          {userNews.length === 0
            ? "didn't save any articles yet"
            : `have ${
                userNews.length === 1
                  ? "1 saved article"
                  : `${userNews.length} saved articles`
              }`}
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
