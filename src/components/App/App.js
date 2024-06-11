// import logo from "../../logo.svg";
import "./App.css";
import React, { Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal";

function App() {
  return (
    <div className="App">
      <RegisterModal />
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
