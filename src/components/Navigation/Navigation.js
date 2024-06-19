import { useNavigate } from "react-router-dom";
const Navigation = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToSavedNews = () => {
    navigate("/saved-news");
  };
  return { navigateToHome, navigateToSavedNews };
};

export default Navigation;
