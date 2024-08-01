import { Link, useNavigate } from "react-router-dom";

import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <p className="footer__copyright">© 2024 Supersite, Powered by News API</p>
      <nav className="footer__buttons">
        <button
          className="footer__button footer__button_text"
          onClick={handleHomeClick}
        >
          Home
        </button>

        <Link
          to="https://tripleten.com/"
          target="_blank"
          rel="noreferrer"
          className="footer__button footer__button_text"
        >
          TripleTen
        </Link>
        <Link
          to="https://github.com/Azenae1"
          target="_blank"
          rel="noreferrer"
          className="footer__button footer__button_GH"
        ></Link>
        <Link
          to="https://www.linkedin.com/in/yury-bursian/"
          target="_blank"
          rel="noreferrer"
          className="footer__button footer__button_LI"
        ></Link>
      </nav>
    </footer>
  );
};

export default Footer;
