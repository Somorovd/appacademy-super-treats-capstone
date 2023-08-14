import { Link } from "react-router-dom";
import "./SubmitOrderModal.css";

export default function SubmitOrderModal() {
  return (
    <div className="submit-order-modal flex flex-c g20">
      <h2> Order Placed </h2>
      <h3>Thank you for your order!</h3>
      <p>
        More order related features will be coming in the future! In the
        meantime, you can check out my{" "}
        <Link
          to="https://somorovd.github.io/"
          target="_blank"
        >
          porfolio here
        </Link>
        .
      </p>
    </div>
  );
}
