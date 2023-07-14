import { Route, Switch } from "react-router-dom";
import BusinessMenu from "./BusinessMenu";
import CreateItemForm from "./CreateItemForm";
import BusinessInfoPage from "./BusinessInfoPage";

export default function UserBusinessManagementPage() {
  return (
    <div className="business-page">
      <BusinessMenu />
      <Switch>
        <Route path="/business/:businessId/items/new">
          <CreateItemForm />
        </Route>
        <Route path="/business/:businessId/items/:itemId">
          <CreateItemForm />
        </Route>
        <Route path="/business/:businessId">
          <BusinessInfoPage />
        </Route>
      </Switch>
    </div>
  );
}
