import React, { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import About from "../About/About";
import Footer from "../Footer/Footer";
import SavedNews from "../SavedNews/SavedNews";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterCompleteModal from "../RegisterCompleteModal/RegisterCompleteModal";
import SearchList from "../SearchResults/SearchList";
import Preloader from "../Preloader/Preloader";
import NothingFound from "../NothingFound/NothingFound";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const openRegisterModal = () => {
    setActiveModal("signup");
  };
  const openLoginModal = () => {
    setActiveModal("login");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };
  const handleRedirect = () => {
    activeModal === "signup"
      ? setActiveModal("login")
      : setActiveModal("signup");
  };

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Main onLogin={openLoginModal} />} />
        <Route exact path="/saved-news" element={<SavedNews />} />
      </Routes>

      <Footer />
      {activeModal === "signup" && (
        <RegisterModal
          handleCloseModal={handleCloseModal}
          isOpen
          switchToLogin={handleRedirect}
          isLoading={isLoading}
        />
      )}
      {activeModal === "login" && (
        <LoginModal
          handleCloseModal={handleCloseModal}
          isOpen
          switchToRegister={handleRedirect}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;
