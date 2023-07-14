import { useHistory } from "react-router-dom";
import "./BusinessMenu.css";

export default function BusinessMenu() {
  const history = useHistory();
  return (
    <div className="business-menu">
      <button onClick={() => history.push("/")}>Return to SuperTreats</button>
    </div>
  );
}
