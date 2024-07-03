import { useContext, useEffect, useState } from "react";

import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import About from "../About/About";
import SearchList from "../SearchResults/SearchList";
import NothingFound from "../NothingFound/NothingFound";
import Preloader from "../Preloader/Preloader";
import { HasSearchedContext } from "../../contexts/HasSearchedContext";
import { SearchResultContext } from "../../contexts/SearchResultContext";
import MobileHeader from "../MobileHeader/MobileHeader";

const Main = ({
  onLogin,
  onLogout,
  isLoggedIn,
  isLoading,
  handleSearch,
  handleSaveCard,
  handleDeleteCard,
  handleMobileModal,
  searchError,
}) => {
  const { hasSearched } = useContext(HasSearchedContext);
  const { searchResults } = useContext(SearchResultContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleMobile);
    return () => window.removeEventListener("resize", handleMobile);
  }, []);

  return (
    <main className="main">
      <div className="main__cover">
        {isMobile ? (
          <MobileHeader
            currentRoute={"main"}
            handleMobileModal={handleMobileModal}
          />
        ) : (
          <Header
            onLogin={onLogin}
            onLogout={onLogout}
            isLoggedIn={isLoggedIn}
          />
        )}
        <section className="main__section">
          <h1 className="main__title">What's going on in the world?</h1>
          <p className="main__description">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm handleSearch={handleSearch} />
          <div>
            {isLoading && <Preloader />}
            {!isLoading && hasSearched && searchResults.length > 0 ? (
              <SearchList
                onLogin={onLogin}
                handleSaveCard={handleSaveCard}
                handleDeleteCard={handleDeleteCard}
                isLoggedIn={isLoggedIn}
              />
            ) : !isLoading && hasSearched && searchResults.length === 0 ? (
              <NothingFound />
            ) : searchError === true ? (
              <div className={isMobile ? "" : "main__search-error_container"}>
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
