import Notfound from "../../images/not-found.svg";
import "./NothingFound.css";

const NothingFound = () => {
  return (
    <section className="notfound">
      <img src={Notfound} alt="Nothing found" className="notfound__img" />
      <h2 className="notfound__title">Nothing found</h2>
      <p className="notfound__text">Sorry, but nothing matched</p>
      <p className="notfound__text">your search terms.</p>
    </section>
  );
};

export default NothingFound;
