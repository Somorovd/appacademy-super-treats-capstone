import { Route, Switch, useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import BusinessMenu from "./BusinessMenu";
import BusinessInfoPage from "./BusinessInfoPage";
import ItemEditPage from "./ItemEditPage";
import ItemManagementPage from "./ItemManagementPage";
import CategoryManagementPage from "./CategoryManagementPage";
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
        <Route path="/business/:businessId/menu/items/new">
          <ItemEditPage />
        </Route>
        <Route path="/business/:businessId/menu/items/:itemId">
          <ItemEditPage />
        </Route>
        <Route path="/business/:businessId/menu/items">
          <ItemManagementPage />
        </Route>
        <Route path="/business/:businessId/menu/categories">
          <CategoryManagementPage />
        </Route>
        <Route path="/business/:businessId">
          <BusinessInfoPage />
        </Route>
      </Switch>
    </div>
  );
}
