import React, { Route, Routes } from "react-router-dom";
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
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentPage, setCurrentPage] = useState("");
  const [hasSearched, setHasSearched] = useState("");
  const [savedNews, setSavedNews] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const [keyword, setKeyword] = useState("");

  const openRegisterModal = () => {
    setActiveModal("signup");
  };

  const openConfirmationModal = () => {
    setActiveModal("confirm");
  };

  const openLoginModal = () => {
    setActiveModal("login");
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
        if (res) {
          localStorage.setItem("token", res.token);
          setIsLoggedIn(true);
          handleCloseModal();
        }
        checkToken(res.token)
          .then((data) => {
            setCurrentUser(data);
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
    // navigate("/");
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
      });
  };

  const handleSaveCard = async ({ newsData, keyword, token }, isSaved) => {
    const cardSaved = savedNews.some((card) => card.link === newsData.url);
    console.log("Token:", token);
    console.log("News Data:", newsData);
    const updateNews = (updatedCard, remove = false) => {
      const updatedsavedNews = remove
        ? savedNews.filter((card) => card._id !== updatedCard._id)
        : [updatedCard, ...savedNews];

      setSavedNews(updatedsavedNews);

      const updatedSearchResults = searchResults.map((card) =>
        card.url === newsData.url ? updatedCard : card
      );

      setSearchResults(updatedSearchResults);
    };

    try {
      if (currentPage === "/" && !cardSaved) {
        const data = await addSavedNews(newsData, keyword, token);
        const savedArticleId = data.data._id;
        const newArticle = { ...newsData, _id: savedArticleId };
        updateNews(newArticle);
      } else if (currentPage === "/" && cardSaved) {
        await removeSavedNews(newsData, token);
        updateNews({ ...newsData, _id: "" }, true);
      } else if (currentPage === "/saved-news" && cardSaved) {
        await removeSavedNews(newsData, token);
        updateNews({ ...newsData, _id: "" }, true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CurrentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      <CurrentUserContext.Provider value={{ currentUser }}>
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
                        />
                      }
                    />
                    <Route exact path="/saved-news" element={<SavedNews />} />
                  </Routes>

                  <Footer />
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
