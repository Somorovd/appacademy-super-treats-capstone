import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function AllCartsMenu() {
  const { businessId } = useParams();
  const carts = useSelector((state) => state.carts);

  return (
    <div className="carts-menu__all flex flex-11">
      <i className="fa-solid fa-cart-shopping"></i>
      {!businessId && (
        <>
          <span>{Object.keys(carts)?.length} carts</span>
          <i className="fa-solid fa-angle-down"></i>
        </>
      )}
    </div>
  );
}
