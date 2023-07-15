import { Route, Switch, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import BusinessMenu from "./BusinessMenu";
import ItemEditPage from "./ItemEditPage";
import BusinessInfoPage from "./BusinessInfoPage";
import { thunkGetOneBusiness } from "../../store/userBusinesses";

export default function UserBusinessManagementPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { businessId } = useParams();

  const business = useSelector((state) => state.userBusinesses.singleBusiness);

  useEffect(() => {
    (async () => {
      const res = await dispatch(thunkGetOneBusiness(businessId));
      if (res.errors) history.push("/business");
    })();
  }, [dispatch]);

  if (business.id !== Number(businessId)) return null;

  return (
    <div className="business-page">
      <BusinessMenu />
      <Switch>
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
    </div>
  );
}