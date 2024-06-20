import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import About from "../About/About";

const Main = () => {
  return (
    <main className="main">
      <div className="main__cover">
        <Header />
        <section className="main__section">
          <h1 className="main__title">
            What's going on in <br />
            the world?
          </h1>
          <p className="main__description">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm />
        </section>
      </div>
      <About />
    </main>
  );
};

export default Main;
