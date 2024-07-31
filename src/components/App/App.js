import React, {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { HasSearchedContext } from "../../contexts/HasSearchedContext";
import { SearchResultContext } from "../../contexts/SearchResultContext";
import { CurrentPageContext } from "../../contexts/CurrentPageContext";
import { SavedNewsContext } from "../../contexts/SavedNewsContext";
import { KeywordContext } from "../../contexts/KeywordContext";
import { getSearchResults } from "../../utils/newsAPI";
import { signIn, signUp, checkToken } from "../../utils/auth";
import { addSavedNews, removeSavedNews } from "../../utils/api";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterCompleteModal from "../RegisterCompleteModal/RegisterCompleteModal";
import MobileNavigation from "../MobileNavigation/MobileNavigation";
import MobileFooter from "../MobileFooter/MobileFooter";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentUser, setCurrentUser] = useState({});
  const [currentPage, setCurrentPage] = useState("/");
  const [hasSearched, setHasSearched] = useState("");
  const [savedNews, setSavedNews] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const [keyword, setKeyword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleMobile);
    return () => window.removeEventListener("resize", handleMobile);
  }, []);

  const openRegisterModal = () => {
    setActiveModal("signup");
  };

  const openConfirmationModal = () => {
    setActiveModal("confirm");
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const openMobileModal = () => {
    setActiveModal("mobile");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleRegister = ({ email, password, name }) => {
    setIsLoading(true);
    signUp(email, password, name)
      .then(() => {
        openConfirmationModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogin = ({ email, password }) => {
    setIsLoading(true);

    signIn(email, password)
      .then((res) => {
        // console.log("SignIn response:", res);
        if (res) {
          localStorage.setItem("token", res.token);
          setIsLoggedIn(true);
          handleCloseModal();
        }
        checkToken(res.token)
          .then((data) => {
            // console.log("Data received:", data);
            setCurrentUser(data);
            // console.log("CurrentUser set:", data.data);
          })
          .catch(console.error);
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setCurrentUser({});
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleRedirect = () => {
    activeModal === "login"
      ? setActiveModal("signup")
      : setActiveModal("login");
  };

  const handleSearch = ({ keyword }) => {
    setKeyword(keyword);
    setIsSearching(true);
    getSearchResults(keyword)
      .then((res) => {
        setSearchResults(res.articles);
        setIsSaved(true);
        setHasSearched(true);
        setIsSearching(false);
        setSearchError(false);
      })
      .catch((err) => {
        console.log(err);
        setSearchError(true);
        setIsSearching(false);
      });
  };

  const handleSaveCard = async ({ newsData, keyword, token }) => {
    const cardSaved = savedNews.some((card) => card.link === newsData.url);

    const updateNews = (updatedCard, remove = false) => {
      const updatedSavedNews = remove
        ? savedNews.filter((card) => card._id !== updatedCard._id)
        : [updatedCard, ...savedNews];

      setSavedNews(updatedSavedNews);

      const updatedSearchResults = searchResults.map((card) =>
        card.url === newsData.url ? updatedCard : card
      );

      setSearchResults(updatedSearchResults);
    };

    try {
      if (!cardSaved) {
        const response = await addSavedNews(newsData, keyword, token);
        if (response && response.data && response.data._id) {
          const newArticle = {
            ...newsData,
            _id: response.data._id,
            isSaved: true,
          };
          updateNews(newArticle);
        } else {
          throw new Error("Failed to save article");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteCard = async ({ newsData, token }) => {
    // console.log("Attempting to delete article:", newsData);
    const cardToDelete = savedNews.find(
      (card) => card.link === newsData.url || card.link === newsData.link
    );
    // console.log("Found card to delete:", cardToDelete);
    // console.log("Saved news list:", savedNews);

    const updateNews = (updatedCard, remove = false) => {
      const updatedSavedNews = remove
        ? savedNews.filter((card) => card._id !== updatedCard._id)
        : [updatedCard, ...savedNews];

      setSavedNews(updatedSavedNews);

      const updatedSearchResults = searchResults.map((card) =>
        card.url === newsData.url ? updatedCard : card
      );

      setSearchResults(updatedSearchResults);
    };

    try {
      if (cardToDelete && cardToDelete._id) {
        await removeSavedNews(cardToDelete._id, token);
        updateNews({ ...newsData, _id: "", isSaved: false }, true);
        // console.log("Article removed:", cardToDelete);
      } else {
        console.error("Failed to find article to delete:", cardToDelete);
        throw new Error("Failed to find article to delete");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken(token)
        .then((res) => {
          setCurrentUser(res);
          setIsLoggedIn(true);
        })
        .catch(console.error)
        .finally(() => setIsLoggedInLoading(false));
    } else {
      setIsLoggedInLoading(false);
    }
  }, []);

  return (
    <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <SavedNewsContext.Provider value={{ savedNews, setSavedNews }}>
          <HasSearchedContext.Provider value={{ hasSearched }}>
            <SearchResultContext.Provider value={{ searchResults }}>
              <KeywordContext.Provider value={{ keyword, setKeyword }}>
                <div className="app">
                  <Routes>
                    <Route
                      exact
                      path="/"
                      element={
                        <Main
                          onLogin={openLoginModal}
                          onLogout={handleLogout}
                          isLoggedIn={isLoggedIn}
                          isLoading={isSearching}
                          handleSearch={handleSearch}
                          searchError={searchError}
                          handleSaveCard={handleSaveCard}
                          handleDeleteCard={handleDeleteCard}
                          handleMobileModal={openMobileModal}
                        />
                      }
                    />
                    <Route
                      exact
                      path="/saved-news"
                      element={
                        <SavedNews
                          onLogout={handleLogout}
                          handleMobileModal={openMobileModal}
                          handleDeleteCard={handleDeleteCard}
                          onLogin={openLoginModal}
                          isSaved={isSaved}
                        />
                      }
                    />
                  </Routes>
                  {isMobile ? <MobileFooter /> : <Footer />}

                  {activeModal === "mobile" && (
                    <MobileNavigation
                      isLoggedIn={isLoggedIn}
                      onLogin={openLoginModal}
                      onClose={handleCloseModal}
                      onLogout={handleLogout}
                    />
                  )}
                  {activeModal === "signup" && (
                    <RegisterModal
                      handleCloseModal={handleCloseModal}
                      isOpen
                      onRegister={handleRegister}
                      switchToLogin={handleRedirect}
                      isLoading={isLoading}
                    />
                  )}
                  {activeModal === "confirm" && (
                    <RegisterCompleteModal
                      onClose={handleCloseModal}
                      isOpen
                      switchToLogin={handleRedirect}
                    />
                  )}
                  {activeModal === "login" && (
                    <LoginModal
                      handleCloseModal={handleCloseModal}
                      isOpen
                      onLogin={handleLogin}
                      switchToRegister={handleRedirect}
                      isLoading={isLoading}
                    />
                  )}
                </div>
              </KeywordContext.Provider>
            </SearchResultContext.Provider>
          </HasSearchedContext.Provider>
        </SavedNewsContext.Provider>
      </CurrentUserContext.Provider>
    </CurrentPageContext.Provider>
  );
}

export default App;
