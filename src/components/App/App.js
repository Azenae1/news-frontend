// import logo from "../../logo.svg";
import "./App.css";
import React, { Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";
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

function App() {
  return (
    <div className="App">
      <div className="app__container">
        <Header />
        <Main />
        {/* <Routes>
        <Route exact path="/" element={<Main />}></Route>
        <Route path="/saved-news" element={<SavedNews />}></Route>
      </Routes> */}
      </div>
      <NothingFound />
      <About />
      <Footer />

      {/* {activeModal === "register" && <RegisterModal />}
      {activeModal === "login" && <LoginModal />} */}
    </div>
  );
}

export default App;
