import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import CartSidebar from "./CartSidebar/CartSidebar";

export default function SingleCartMenu() {
  const business = useSelector((state) => state.businesses.singleBusiness);
  const cart = useSelector((state) => state.carts[business?.id]);

  const { setModalContent } = useModal();

  const handleClick = () => {
    setModalContent(<CartSidebar cart={cart}/>);
  };

  if (!cart) return null;

  return (
    <div
      className="cart-bt single-cart flex flex-01 bt-black"
      onClick={handleClick}
    >
      <img
        src={business.image}
        alt=""
      />
      <span>{Object.values(cart.cartItems).length} items</span>
    </div>
  );
}
