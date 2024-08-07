import { useContext, useEffect } from "react";

import "../SavedNews/SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedNewsContext } from "../../contexts/SavedNewsContext";
import { getSavedNews } from "../../utils/api";

const SavedNewsList = ({
  handleSaveCard,
  handleDeleteCard,
  onLogin,
  isSaved,
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { savedNews, setSavedNews } = useContext(SavedNewsContext);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    getSavedNews(jwt)
      .then(setSavedNews)
      .catch((error) => {
        console.error("Error fetching saved news:", error);
      });
  }, []);

  return (
    <ul className="saved-news__list searchlist__cards">
      {savedNews
        .filter((card) => card.owner === currentUser._id)
        .map((news) => (
          <NewsCard
            newsData={news}
            key={news.link}
            handleDeleteCard={handleDeleteCard}
            handleSaveCard={handleSaveCard}
            onLogin={onLogin}
            isSaved={isSaved}
          />
        ))}
    </ul>
  );
};

export default SavedNewsList;
