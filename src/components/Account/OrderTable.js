import React, { useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { formatDateFromTimestamp } from "../../utils/functions";

const OrderTable = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const navigate = useNavigate();
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginate = (where) => {
    if (where === "n") {
      setCurrentPage((currentPage % totalPages) + 1);
    } else {
      if (currentPage === 1) {
        setCurrentPage(totalPages);
      } else {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  return (
    <div className="md:p-14 p-2 ">
      <Table className="w-full border-collapse border shadow-md bg-white">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="p-2 ">Order Details</th>
            <th className="p-2 ">Products</th>
            <th className="p-2 hidden md:block ">Created At</th>
            <th className="p-2 ">Order Status</th>
            <th className="p-2 ">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order._id} className="border-2  hover:bg-gray-100">
              <td>
                <div className="p-2  flex-center text-blue-700 underline ">
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    View Details
                  </span>
                </div>
              </td>

              <td className="p-2">
                <div className="flex items-center md:justify-start justify-center">
                  <div className="hidden md:flex-center w-32 h-20  ">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="h-full cover rounded-lg"
                    />
                  </div>
                  <p>{order.orderItems[0].name}</p>

                  {order.orderItems.length > 1 ? (
                    <span className="text-blue-500 ml-2">
                      +{order.orderItems.length - 1} more
                    </span>
                  ) : null}
                </div>
              </td>
              <td className="hidden md:table-cell">
                <div className="flex-center">
                  <span className="md:flex-center hidden">
                    {formatDateFromTimestamp(order.createdAt)}
                  </span>
                </div>
              </td>
              <td>
                <div
                  className={`flex-center ${
                    order.orderStatus === "Delivered"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {order.orderStatus}
                </div>
              </td>
              <td>
                <div className="flex-center">
                  &#8377;{order.totalPrice.toLocaleString("hi-IN")}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="flex items-center justify-center mt-4">
        <div className="mx-4 flex gap-4 items-center justify-center">
          <span
            className="text-2xl font-semibold hover:text-cyan-500"
            onClick={() => paginate("p")}
          >
            {"<"}
          </span>
          {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }).map(
            (_, index) => (
              <span
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`${
                  index + 1 === currentPage
                    ? "bg-cyan-500 text-center text-white"
                    : ""
                }} w-7 h-7  rounded-full flex-center`}
              >
                {index + 1}
              </span>
            )
          )}{" "}
          <span
            className="text-2xl font-semibold hover:text-cyan-500"
            onClick={() => paginate("n")}
          >{`>`}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
