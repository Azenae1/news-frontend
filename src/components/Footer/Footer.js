import "./Footer.css";
import GitHub from "../../images/GitHub.svg";
import Facebook from "../../images/Facebook.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2024 Supersite, Powered by News API</p>
      <div className="footer__buttons">
        <button className="footer__button footer__button_text">Home</button>
        <button className="footer__button footer__button_text">
          TripleTen
        </button>
        <button className="footer__button footer__button_GH"></button>
        <button className="footer__button footer__button_FB"></button>
      </div>
    </footer>
  );
};

export default Footer;
