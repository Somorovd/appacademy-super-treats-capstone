import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function AllCartsMenu() {
  const { businessId } = useParams();
  const cartsObj = useSelector((state) => state.carts);
  const carts = Object.values(cartsObj);

  return (
    <>
      <div className="all-carts flex flex-11">
        <i className="fa-solid fa-cart-shopping"></i>
        {!businessId && (
          <>
            <span>{carts?.length || 0} carts</span>
            <i className="fa-solid fa-angle-down"></i>
          </>
        )}
      </div>
    </>
  );
}
