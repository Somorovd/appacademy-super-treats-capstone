import { Route, Switch } from "react-router-dom";
import CreateBusinessForm from "./CreateBusinessForm";
import BusinessInfoPage from "./BusinessInfoPage";
import UserBussinessesHome from "./UserBusinessesHome";

export default function BusinessRouter() {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/business/"
        >
          <UserBussinessesHome />
        </Route>
        <Route path="/business/create">
          <CreateBusinessForm />
        </Route>
        <Route path="/business/:businessId">
          <BusinessInfoPage />
        </Route>
      </Switch>
    </>
  );
}