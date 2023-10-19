import React from "react";

const PriceFilter = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }) => {
  return (
    <>
      <p>
        {minPrice} - {maxPrice}
      </p>

      <form action="" className="flex gap-0">
        <input
          type="range"
          name="min"
          id="min"
          className="absolute"
          min={0}
          step={100}
          max={20000}
          //   value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          className="absolute mx-4 bg-green-600"
          type="range"
          name="min"
          id="min"
          min={0}
          step={100}
          max={20000}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </form>
    </>
  );
};

export default PriceFilter;
