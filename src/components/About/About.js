import "./About.css";
import Author from "../../images/Yury.jpg";

const About = () => {
  return (
    <section className="about__section">
      <img src={Author} alt="Yury" className="about__avatar" />
      <div className="about__text">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">some info about me</p>
      </div>
    </section>
  );
};

export default About;
