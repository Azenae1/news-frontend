import { Link } from "react-router-dom";

import "../Footer/Footer.css";
import "./MobileFooter.css";

const MobileFooter = () => {
  return (
    <footer className="footer mobile-footer">
      <div className="mobile-footer_buttons">
        <div className="footer__buttons-left">
          <button className="footer__button footer__button_text">
            <Link to="/">Home</Link>
          </button>

          <button className="footer__button footer__button_text">
            <Link to="https://tripleten.com/" target="_blank" rel="noreferrer">
              TripleTen
            </Link>
          </button>
        </div>
        <div className="footer__buttons-right">
          <button className="footer__button footer__button_GH">
            <Link
              to="https://github.com/Azenae1"
              target="_blank"
              rel="noreferrer"
            ></Link>
          </button>

          <button className="footer__button footer__button_LI">
            <Link
              to="https://www.linkedin.com/in/yury-bursian/"
              target="_blank"
              rel="noreferrer"
            ></Link>
          </button>
        </div>
      </div>
      <p className="footer__copyright mobile-footer__copyright">
        © 2024 Supersite, Powered by News API
      </p>
    </footer>
  );
};

export default MobileFooter;
