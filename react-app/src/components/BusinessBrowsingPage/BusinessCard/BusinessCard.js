import "./BusinessCard.css";

export default function BusinessCard({ business }) {
  return (
    <div className="business-card">
      <header>
        <img
          className="business-card__image fw fh"
          src={business.image}
          alt=""
        />
      </header>
      <div className="business-card__info">
        <p className="business-card__name">{business.name}</p>
        <p className="business-card__rating">
          {(Math.random() * 2.5 + 2.5).toFixed(1)}
        </p>
        <p className="business-card__delivery">
          <span className="business-card__delivery-fee">
            ${business.deliveryFee} Delivery Fee
          </span>{" "}
          &bull;
          <span className="business-card__delivery-time">15-20 min</span>
        </p>
      </div>
    </div>
  );
}
