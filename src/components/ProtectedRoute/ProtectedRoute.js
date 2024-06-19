import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, isLoggedIn, isLoggedInLoading, ...props }) {
  if (isLoggedInLoading) return null;
  return (
    <Route {...props}>{isLoggedIn ? children : <Redirect to={"/"} />}</Route>
  );
}

export default ProtectedRoute;
