import "./About.css";
import Author from "../../images/Yury.jpg";

const About = () => {
  return (
    <section className="about__section">
      <img src={Author} alt="Yury" className="about__avatar" />
      <div className="about__text">
        <h2 className="about__title">About the author</h2>
        <p className="about__description">
          Hello there, nice to meet you! My name's Yura and I currently live in
          Israel. After making Aliyah from Russia in 2023, I decided to follow
          my passion and become a Software Developer. I'm looking forward to
          continue upgrading my tech skills and use them to contribute and
          develop amazing products! <br></br>
          <br></br>If you like this website and have any offers for me, please
          don't hesitate to reach me out on LinkedIn. You can also see my other
          projects on GitHub, all the links are at the bottom of the page.{" "}
        </p>
      </div>
    </section>
  );
};

export default About;
