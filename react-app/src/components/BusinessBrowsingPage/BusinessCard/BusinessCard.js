import { useHistory } from "react-router-dom";
import "./BusinessCard.css";

const defaultImage =
  "https://cdn.discordapp.com/attachments/723759214123679836/1129101930510172180/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";

export default function BusinessCard({ business, isBrowsing }) {
  const history = useHistory();
  return (
    <div
      className="business-card"
      onClick={() => isBrowsing && history.push(`/feed/${business.id}`)}
    >
      <header>
        <img
          className="business-card__image fw fh"
          src={business.image || "missing"}
          alt=""
          onError={(e) => {
            e.target.src = defaultImage;
            e.target.style = "object-fit: contain";
          }}
          onLoad={(e) => {
            if (e.target.src !== defaultImage)
              e.target.style = "object-fit: cover";
          }}
        />
      </header>
      <div className="business-card__info">
        <p className="business-card__name">{business.name}</p>
        <p className="business-card__rating">
          {Number(business.rating).toFixed(1)}
        </p>
        {!isBrowsing && (
          <p className="business-card__address">{business.address}</p>
        )}
        <p className="business-card__delivery">
          <span className="business-card__delivery-fee">
            ${business.deliveryFee} Delivery Fee
          </span>{" "}
          {isBrowsing && (
            <>
              &bull;
              <span className="business-card__delivery-time">15-20 min</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
