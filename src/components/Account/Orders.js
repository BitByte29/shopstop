import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../../App/features/orderSlice";
import OrderTable from "./OrderTable";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((s) => s.orders);
  useEffect(() => {
    dispatch(myOrders());
  }, []);

  return (
    <div>
      <OrderTable orders={orders} />
    </div>
  );
};

export default Orders;
