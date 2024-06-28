import "../SavedNews/SavedNews.css";
import NewsCard from "../NewsCard/NewsCard";

const SavedNewsList = () => {
  return (
    <ul className="saved__list searchlist__cards">
      <NewsCard />
      <NewsCard />
      <NewsCard />
    </ul>
  );
};

export default SavedNewsList;
