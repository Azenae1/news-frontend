import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";

const Main = () => {
  return (
    <main className="main">
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
    </main>
  );
};

export default Main;
