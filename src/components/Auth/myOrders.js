import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../App/features/orderSlice";
import { useParams } from "react-router-dom";

const MyOrders = () => {
  const order = useSelector((s) => s.orders.orderInfo);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    // if (!order || order._id !== id) {
    dispatch(getOrder(id));
    // }
  }, []);

  return (
    order && (
      <>
        <div className="p-4">
          <h1 className="text-3xl font-semibold mb-4">My Order Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">
                Shipping Information
              </h2>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {order.shippingInfo.address}, {order.shippingInfo.city},{" "}
                {order.shippingInfo.state}, {order.shippingInfo.pinCode}
              </p>
              <p>
                <span className="font-semibold">Phone Number:</span>{" "}
                {order.shippingInfo.phoneNumber}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">
                Payment Information
              </h2>
              <p>
                <span className="font-semibold">ID:</span>{" "}
                {order.paymentInfo.id}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {order.paymentInfo.status}
              </p>
            </div>
          </div>
          <div className="bg-white p-4 mt-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Order Items</h2>
            {order.orderItems.map((item) => (
              <div key={item._id} className="flex items-center mb-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg mr-4"
                />
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <p>
                    <span className="font-semibold">Quantity:</span>{" "}
                    {item.quantity}
                  </p>
                  <p>
                    <span className="font-semibold">Price:</span> &#8377;
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white p-4 mt-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            <p>
              <span className="font-semibold">Items Price:</span> &#8377;
              {order.itemsPrice}
            </p>
            <p>
              <span className="font-semibold">Tax Price:</span> &#8377;
              {order.taxPrice}
            </p>
            <p>
              <span className="font-semibold">Shipping Price:</span> &#8377;
              {order.shippingPrice}
            </p>
            <p>
              <span className="font-semibold">Total Price:</span> &#8377;
              {order.totalPrice}
            </p>
            <p>
              <span className="font-semibold">Order Status:</span>{" "}
              {order.orderStatus}
            </p>
            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </>
    )
  );
};

export default MyOrders;
