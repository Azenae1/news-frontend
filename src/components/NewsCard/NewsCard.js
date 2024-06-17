import "./NewsCard.css";
import img from "../../images/main-background.png";

import flag from "../../images/flag.svg";
import flag_hover from "../../images/flag-hover.svg";
import flag_marked from "../../images/flag-marked.svg";

const NewsCard1 = () => {
  return (
    <li class="card">
      {/* <button class="card__delete-button" type="button"></button> */}
      <img src={img} alt="alt" class="card__image" id="card-image" />
      <div className="card__favorite-login">
        <p className="card__favorite-text">Sign in to save articles</p>
      </div>
      <button className="card__favorite-button" type="button"></button>

      <div className="card__description">
        <p className="card__date">February 30, 2024</p>
        <h3 className="card__name" id="card-name">
          Card name
        </h3>
        <p className="card__text">
          {" "}
          Card text or some random stuff I dunno Card text or some random stuff
          I dunno Card text or some random stuff I dunno Card text or some
          random stuff I dunno Card text or some random stuff I dunno Card text
          or some random stuff I dunno Card text or some random stuff I dunno
          Card text or some random stuff I dunno Card text or some random stuff
          I dunno 123456789
        </p>
        <p className="card__source">MY BRAIN</p>
      </div>
    </li>
  );
};

const NewsCard = () => {
  return (
    <li class="card">
      <button class="card__delete-button" type="button"></button>
      <img src={img} alt="alt" class="card__image" id="card-image" />
      <div className="card__favorite-remove">
        <p className="card__favorite-text">Remove from saved</p>
      </div>
      <p className="card__tag">Nature</p>

      <div className="card__description">
        <p className="card__date">February 30, 2024</p>
        <h3 className="card__name" id="card-name">
          Card name
        </h3>
        <p className="card__text">
          {" "}
          Card text or some random stuff I dunno Card text or some random stuff
          I dunno Card text or some random stuff I dunno Card text or some
          random stuff I dunno Card text or some random stuff I dunno Card text
          or some random stuff I dunno Card text or some random stuff I dunno
          Card text or some random stuff I dunno Card text or some random stuff
          I dunno 123456789
        </p>
        <p className="card__source">MY BRAIN</p>
      </div>
    </li>
  );
};

export default NewsCard;
