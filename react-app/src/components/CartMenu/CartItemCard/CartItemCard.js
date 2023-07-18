import "./CartItemCard.css";

export default function CartItemCard({ cartItem }) {
  return (
    <div className="cart-item-card">
      <p>{cartItem.item.name}</p>
    </div>
  );
}
