// import logo from "../../logo.svg";
import "./App.css";
import React, { Route, Routes } from "react-router-dom";
// import { useEffect, useState } from "react";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterCompleteModal from "../RegisterCompleteModal/RegisterCompleteModal";
import Header from "../Header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <Routes>
        <Route exact path="/" element={<Main />}></Route>
        <Route path="/saved-news" element={<SavedNews />}></Route>
      </Routes> */}
      <Footer />

      {/* {activeModal === "register" && <RegisterModal />}
      {activeModal === "login" && <LoginModal />} */}
    </div>
  );
}

export default App;
