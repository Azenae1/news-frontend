import React, { useContext, useState, useEffect } from "react";

import "./SavedNews.css";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import SavedNewsList from "../SavedNewsList/SavedNewsList";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedNewsContext } from "../../contexts/SavedNewsContext";
import { getSavedNews } from "../../utils/api";
import MobileHeader from "../MobileHeader/MobileHeader";

const SavedNews = ({
  onLogin,
  onLogout,
  handleMobileModal,
  handleDeleteCard,
  isSaved,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { savedNews, setSavedNews } = useContext(SavedNewsContext);

  const userNews = savedNews.filter((card) => card.owner === currentUser._id);

  const keywordArr = userNews.map((card) => card.keyword);

  const capatalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getKeywordString = (keywords) => {
    if (keywords.length === 0) {
      return "";
    }

    const count = keywords.reduce((acc, keyword) => {
      acc[keyword] = (acc[keyword] || 0) + 1;
      return acc;
    }, {});

    const sortedKeywords = Object.entries(count).sort((a, b) => b[1] - a[1]);

    switch (sortedKeywords.length) {
      case 1:
        return `${capatalizeFirstLetter(sortedKeywords[0][0])}`;
      case 2:
        return `${capatalizeFirstLetter(
          sortedKeywords[0][0]
        )} and ${capatalizeFirstLetter(sortedKeywords[1][0])}`;
      default:
        const firstKeywords = sortedKeywords
          .slice(0, 2)
          .map(([keyword]) => capatalizeFirstLetter(keyword))
          .join(", ");
        const moreCount = sortedKeywords.length - 2;
        return `${firstKeywords}, and ${moreCount} more`;
    }
  };

  const keywordString = getKeywordString(keywordArr);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getSavedNews(token)
        .then((news) => {
          setSavedNews(news);
        })
        .catch((error) => {
          console.error("Error fetching saved news:", error);
        });
    }
  }, [savedNews]);

  return (
    <section className="saved-news">
      {isMobile ? (
        <MobileHeader
          currentRoute="saved-news"
          handleMobileModal={handleMobileModal}
        />
      ) : (
        <SavedNewsHeader onLogout={onLogout} />
      )}

      <div className="saved-news__info">
        <p className="saved-news__text saved-news__grey">Saved articles</p>
        <h2 className="saved-news__title">
          {currentUser.name}, you{" "}
          {userNews.length === 0
            ? "didn't save any articles yet"
            : `have ${
                userNews.length === 1
                  ? "1 saved article"
                  : `${userNews.length} saved articles`
              }`}
        </h2>
        <p className="saved-news__text">
          By keywords:{" "}
          <span className="saved-news__text-bold">{keywordString}</span>
        </p>
      </div>
      <SavedNewsList
        isSaved={isSaved}
        onLogin={onLogin}
        handleDeleteCard={handleDeleteCard}
      />
    </section>
  );
};

export default SavedNews;
