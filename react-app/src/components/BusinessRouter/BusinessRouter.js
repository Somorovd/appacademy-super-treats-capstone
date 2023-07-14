import { Route, Switch } from "react-router-dom";
import CreateBusinessForm from "./CreateBusinessForm";
import ItemEditPage from "./ItemEditPage";
import BusinessInfoPage from "./BusinessInfoPage";
import UserBussinessesHome from "./UserBusinessesHome";
import ProtectedRoute from "../auth/ProtectedRoute";
import "./BusinessRouter.css";

export default function BusinessRouter() {
  return (
    <ProtectedRoute>
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
        <Route path="/business/:businessId/items/new">
          <ItemEditPage />
        </Route>
        <Route path="/business/:businessId/items/:itemId">
          <ItemEditPage />
        </Route>
        <Route path="/business/:businessId">
          <BusinessInfoPage />
        </Route>
      </Switch>
    </ProtectedRoute>
  );
}
