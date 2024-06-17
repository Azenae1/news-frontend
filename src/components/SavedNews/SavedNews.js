const SavedNews = () => {
  return (
    <section className="saved__news">
      <div className="saved__info">
        <p className="saved__text saved__grey">Saved articles</p>
        <h2 className="saved__title">Dude, you have X saved articles</h2>
        <p className="saved__text">
          By keywords:{" "}
          <span className="saved__text-bold">
            Nature, Yellowstone, and X other
          </span>
        </p>
      </div>
      <ul className="saved__list"></ul>
    </section>
  );
};

export default SavedNews;
