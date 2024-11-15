// components/OrderCard.js
const OrderCard = ({ order, onStatusChange }) => (
  <div className="card mb-4 shadow-sm border-0">
    <div className="card-body">
      <p className="card-text text-muted">
        <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
      </p>
      <h6 className="text-secondary">Products:</h6>
      <ul className="list-group list-group-flush">
        {order.products.map((productDetail) => (
          <li
            key={productDetail.product._id}
            className="list-group-item border-0"
          >
            {productDetail.product.name}{" "}
            <span className="text-muted">(x{productDetail.quantity})</span> -
            <span className="fw-bold">
              ${productDetail.product.price.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 d-flex align-items-center">
        {order.paymentStatus === "Pending" && (
          <button
            className="btn btn-primary me-3"
            style={{
              backgroundColor: "rgb(241, 97, 38)",
              borderColor: "rgb(241, 97, 38)",
            }}
            onClick={() => onStatusChange(order._id)}
          >
            Mark as Completed
          </button>
        )}
        <span
          className={`badge ${
            order.paymentStatus === "Completed" ? "bg-success" : "bg-warning"
          } text-white`}
          style={{
            fontSize: "0.9rem",
            padding: "0.5rem 1rem",
            borderRadius: "20px",
          }}
        >
          {order.paymentStatus}
        </span>
      </div>
    </div>
  </div>
);

export default OrderCard;
