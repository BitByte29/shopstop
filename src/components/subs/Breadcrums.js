import React from "react";
import { Link, useLocation } from "react-router-dom";

function Breadcrumb({ productName }) {
  const location = useLocation();
  const capitalize = (val) => {
    return val.charAt(0).toUpperCase() + val.slice(1, val.length);
  };
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);

  return (
    <div className="breadcrumb">
      <Link to="/">Home</Link>
      {pathSegments.map((segment, index) => (
        <React.Fragment key={segment}>
          <span> {">>"} </span>
          {index === pathSegments.length - 1 && productName ? (
            <span>{productName}</span>
          ) : (
            <Link to={"/" + pathSegments.slice(0, index + 1).join("/")}>
              {capitalize(segment)}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Breadcrumb;
