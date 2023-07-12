import { Route, Switch } from "react-router-dom";
import CreateBusinessForm from "./CreateBusinessForm";

export default function UserBusinessPage() {
  return (
    <>
      <Switch>
        <Route path="/business/create">
          <CreateBusinessForm />
        </Route>
      </Switch>
    </>
  );
}
