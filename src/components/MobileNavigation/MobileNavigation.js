import { useContext } from "react";
import { Link } from "react-router-dom";

import "./MobileNavigation.css";
import { CurrentPageContext } from "../../contexts/CurrentPageContext";

const MobileNavigation = ({ isLoggedIn, onLogin, onClose, onLogout }) => {
  const { currentPage } = useContext(CurrentPageContext);
  // console.log("Current page:", currentPage);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="mobile-modal" onClick={handleOverlay}>
      <div className="mobile-modal__container">
        <div className="mobile-modal__header">
          <h1 className="mobile-modal__news-explorer">NewsExpolorer</h1>

          <button className="mobile-modal__close-button" onClick={onClose} />
        </div>
        <div className="mobile-modal__redirects">
          {!isLoggedIn ? (
            <button className="mobile-modal__signin-button" onClick={onLogin}>
              Sign in
            </button>
          ) : (
            <>
              {currentPage === "/saved-news" && (
                <Link to="/">
                  <button
                    className="mobile-modal__home-button"
                    onClick={onClose}
                  >
                    Home
                  </button>
                </Link>
              )}

              {currentPage === "/" && (
                <Link to="/saved-news">
                  <button
                    className="mobile-modal__saved-news-button"
                    onClick={onClose}
                  >
                    Saved news
                  </button>
                </Link>
              )}
              <button
                className="mobile-modal__logout-button"
                onClick={onLogout}
              >
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
