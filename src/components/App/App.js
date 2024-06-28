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
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
  const openLoginModal = () => {
    setActiveModal("login");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleRegister = ({ email, password, name }) => {
    setIsLoading(true);
    signUp(email, password, name)
      .then((res) => {
        handleLogin({ email, password });
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
    activeModal === "signup"
      ? setActiveModal("login")
      : setActiveModal("signup");
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
