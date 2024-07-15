import { useContext } from "react";
import { Link } from "react-router-dom";

import "./MobileNavigation.css";
import { CurrentPageContext } from "../../contexts/CurrentPageContext";

const MobileNavigation = ({ isLoggedIn, onLogin, onClose, onLogout }) => {
  const { currentPage } = useContext(CurrentPageContext);
  console.log("Current page:", currentPage);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="mobile-modal" onClick={handleOverlay}>
      <div className="mobile-modal__container">
        <div className="mobile-modal__header">
          <h1 className="mobile-modal__news-explorer">NewsExplorer</h1>

          <button className="mobile-modal__close-button" onClick={onClose} />
        </div>
        <div className="mobile-modal__redirects">
          {currentPage === "/saved-news" && (
            <button className="mobile-modal__home-button">
              <Link to={"/"}>Home</Link>
            </button>
          )}

          {currentPage === "/" && (
            <button className="mobile-modal__saved-news-button">
              <Link to={"/saved-news"}>Saved news</Link>
            </button>
          )}

          {!isLoggedIn ? (
            <button className="mobile-modal__signin-button" onClick={onLogin}>
              Sign in
            </button>
          ) : (
            <button className="mobile-modal__logout-button" onClick={onLogout}>
              Log out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
