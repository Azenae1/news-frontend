import { useContext, useEffect, useState } from "react";

import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import About from "../About/About";
import SearchList from "../SearchResults/SearchList";
import NothingFound from "../NothingFound/NothingFound";
import { HasSearchedContext } from "../../contexts/HasSearchedContext";
import { SearchResultContext } from "../../contexts/SearchResultContext";

const Main = ({ onLogin, onLogout, isLoggedIn, handleSearch, searchError }) => {
  const { hasSearched } = useContext(HasSearchedContext);
  const { searchResults } = useContext(SearchResultContext);

  return (
    <main className="main">
      <div className="main__cover">
        <Header onLogin={onLogin} onLogout={onLogout} isLoggedIn={isLoggedIn} />
        <section className="main__section">
          <h1 className="main__title">
            What's going on in <br />
            the world?
          </h1>
          <p className="main__description">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm handleSearch={handleSearch} />
          <div>
            {hasSearched && searchResults.length > 0 ? (
              <SearchList />
            ) : hasSearched && searchResults.length === 0 ? (
              <NothingFound />
            ) : searchError === true ? (
              <div className="main__search-error_container">
                <p className="main__search-error">
                  Something went wrong during your request. The server may be
                  down or there are connection issues, please try again later
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
      </div>
      <About />
    </main>
  );
};

export default Main;
