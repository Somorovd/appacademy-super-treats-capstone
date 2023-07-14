import { useHistory, useParams } from "react-router-dom";
import "./BusinessMenu.css";

export default function BusinessMenu() {
  const { businessId } = useParams();
  const history = useHistory();
  return (
    <div className="business-menu">
      <button onClick={() => history.push("/")}>Return to SuperTreats</button>
      <button onClick={() => history.push(`/business/${businessId}`)}>
        Business Home
      </button>
    </div>
  );
}
