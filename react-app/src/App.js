import { authenticate } from "./store/session";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import SignupFormPage from "./components/auth/SignupFormPage";
import LoginFormPage from "./components/auth/LoginFormPage";
import LandingPage from "./components/LandingPage";
import BusinessBrowsingPage from "./components/BusinessBrowsingPage";
import BusinessRouter from "./components/BusinessRouter";
import ItemBrowsingPage from "./components/ItemBrowsingPage";
import Page404 from "./components/Page404";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route
            exact
            path="/"
          >
            <LandingPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/feed/:businessId">
            <ItemBrowsingPage />
          </Route>
          <Route path="/feed">
            <BusinessBrowsingPage />
          </Route>
          <Route path="/business">
            <BusinessRouter />
          </Route>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
