import trashCan from "../../Images/trash.svg";
import trashCanHover from "../../Images/trash-hover.svg";
import bookmark from "../../Images/Bookmark.svg";
import bookmarkClicked from "../../Images/Bookmark-marked.svg";
import bookmarkHover from "../../Images/Bookmark-hover.svg";
import { KeywordContext } from "../Context/KeywordContext";
import { CurrentPageContext } from "../Context/CurrentPageContext";
import { CurrentUserContext } from "../Context/CurrentUserContext";

import { SavedArticleContext } from "../Context/SavedArticleContext";

const NewsCard = ({
  newsData,
  handleDeleteArticle,
  handleSaveArticle,
  handleLoginModal,
}) => {
  const [hovered, setHovered] = useState(false);
  const [isMarked] = useState(false);

  const { keyword } = useContext(KeywordContext);
  const { currentPage, setCurrentPage } = useContext(CurrentPageContext);
  const { isLoggedIn } = useContext(CurrentUserContext);
  const { savedArticles, setSavedArticles } = useContext(SavedArticleContext);

  const isSaved = savedArticles.find(
    (article) => article.link === newsData.url
  );

  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname, setCurrentPage]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    getSavedArticles(jwt).then(() => {
      setSavedArticles(savedArticles);
    });
  }, [getSavedArticles]);

  const handleBookmark = () => {
    const token = localStorage.getItem("jwt");
    if (isLoggedIn) {
      handleSaveArticle({ newsData, keyword, token });
    } else {
      handleLoginModal();
    }
  };

  const handleRemoveBookmark = () => {
    const token = localStorage.getItem("jwt");
    handleDeleteArticle({ newsData, token });
  };

  const icon =
    currentPage === "/saved-news"
      ? hovered
        ? trashCanHover
        : trashCan
      : isSaved
      ? bookmarkClicked
      : hovered
      ? bookmarkHover
      : bookmark;

  const buttonClass =
    currentPage === "/saved-news" ? "card__delete-button" : "card__save-button";

  return (
    <section className="card">
      <div className="card__image">
        <div className="card__container">
          <img
            src={newsData.image || newsData.urlToImage}
            alt={newsData.link || newsData.url}
            className="card__image"
          />
          <div className="card__card-container">
            {currentPage === "/saved-news" && newsData.keyword && (
              <div className="card__tag-container">
                <h2 className="card__tag">{newsData.keyword}</h2>
              </div>
            )}
            {hovered && !isLoggedIn && currentPage !== "/saved-news" && (
              <div className="card__login_prompt">
                <p className="card__login_prompt-text">
                  Login to save articles
                </p>
              </div>
            )}

            {hovered && currentPage === "/saved-news" && (
              <div className="card__remove_card">
                <p className="card__remove_card-text">
                  Remove from saved cards
                </p>
              </div>
            )}
          </div>
          <button
            type="button"
            className={buttonClass}
            onClick={!isMarked ? handleBookmark : handleRemoveBookmark}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              className="card__icon"
              src={icon}
              alt={
                currentPage === "/saved-news"
                  ? "Remove article"
                  : "Save article"
              }
            />
          </button>
        </div>
      </div>
      <div className="card__content">
        <h3 className="card__publish_date">
          {new Date(newsData.publishedAt || newsData.date).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          )}
        </h3>
        <h3 className="card__title">{newsData.title}</h3>
        <p className="card__description">
          {newsData.text || newsData.description}
        </p>
        {newsData.source && (
          <p className="card__publisher">
            {newsData.source.name || newsData.source}
          </p>
        )}
      </div>
    </section>
  );
};
