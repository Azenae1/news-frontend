import { Link } from "react-router-dom";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2024 Supersite, Powered by News API</p>
      <div className="footer__buttons">
        <Link to="/">
          <button className="footer__button footer__button_text">Home</button>
        </Link>
        <Link to="https://tripleten.com/" target="_blank" rel="noreferrer">
          <button className="footer__button footer__button_text">
            TripleTen
          </button>
        </Link>
        <Link to="https://github.com/Azenae1" target="_blank" rel="noreferrer">
          <button className="footer__button footer__button_GH"></button>
        </Link>
        <Link
          to="https://www.linkedin.com/in/yury-bursian/"
          target="_blank"
          rel="noreferrer"
        >
          <button className="footer__button footer__button_LI"></button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
