import "./BusinessCard.css";

export default function BusinessCard({ business }) {
  return (
    <div className="business-card flex-c">
      <header>
        <img
          className="business-card__image fw fh"
          src=""
          alt=""
        />
      </header>
      <div className="business-card__info">
        <p className="business-card__name">Business Name</p>
        <p className="business-card__rating">4.5</p>
        <p className="business-card__delivery">
          <span className="business-card__delivery-fee">
            $2.99 Delivery Fee
          </span>
          &bull;
          <span className="business-card__delivery-time">15-20 min</span>
        </p>
      </div>
    </div>
  );
}
