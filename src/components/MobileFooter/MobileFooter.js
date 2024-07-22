import { Link, useNavigate } from "react-router-dom";

import "../Footer/Footer.css";
import "./MobileFooter.css";

const MobileFooter = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer mobile-footer">
      <nav className="mobile-footer_buttons">
        <div className="footer__buttons-left">
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
        </div>
        <div className="footer__buttons-right">
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
        </div>
      </nav>
      <p className="footer__copyright mobile-footer__copyright">
        © 2024 Supersite, Powered by News API
      </p>
    </footer>
  );
};

export default MobileFooter;
