import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import CartSidebar from "./CartSidebar/CartSidebar";

export default function SingleCartMenu() {
  const business = useSelector((state) => state.businesses.singleBusiness);
  const cart = useSelector((state) => state.carts[business?.id]);

  const { setModalContent, setModalClass } = useModal();

  const handleClick = () => {
    setModalClass("flex flex-20 fh");
    setModalContent(<CartSidebar businessId={cart.business.id} />);
  };

  if (!cart) return null;

  return (
    <div
      className="cart-bt single-cart flex flex-11 bt-black"
      onClick={handleClick}
    >
      {business.image && (
        <img
          src={business.image}
          alt=""
        />
      )}
      <span>{cart.count} items</span>
    </div>
  );
}
