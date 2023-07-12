import { Route, Switch } from "react-router-dom";
import CreateBusinessForm from "./CreateBusinessForm";
import BusinessInfoPage from "./BusinessInfoPage";

export default function UserBusinessPage() {
  return (
    <>
      <Switch>
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
