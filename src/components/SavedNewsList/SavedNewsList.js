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
  //   const { currentPage } = useContext(CurrentPageContext);
  //   const { searchResults } = useContext(SearchResultContext);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    getSavedNews(jwt).then(setSavedNews);
  }, [setSavedNews]);

  return (
    <ul className="saved-news__list searchlist__cards">
      {savedNews
        .filter((card) => card.owner === currentUser._id)
        .map((cards) => (
          <NewsCard
            newsData={cards}
            key={cards.link}
            handleDeletecard={handleDeleteCard}
            handleSaveCard={handleSaveCard}
            onLogin={onLogin}
            isSaved={isSaved}
          />
        ))}
    </ul>
  );
};

export default SavedNewsList;
