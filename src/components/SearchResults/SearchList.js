import "./SearchList.css";

import NewsCard from "../NewsCard/NewsCard";

const SearchList = () => {
  return (
    <section className="searchlist">
      <h2 className="searchlist__title">Search results</h2>
      <ul className="searchlist__cards">
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </ul>
      <button className="searchlist__button">Show more</button>
    </section>
  );
};

export default SearchList;
