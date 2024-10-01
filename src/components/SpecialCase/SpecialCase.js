import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const SpecialCase = () => {
  const products = useSelector((state) => state.orebiReducer.products);

  return (
    <div className="fixed top-52 right-2 z-20 md:flex md:flex-col gap-2 ">
      <Link to="/cart">
        <div className="bg-white w-16 h-[70px] rounded-md flex flex-col gap-1 text-[#33475b] justify-center items-center shadow-testShadow overflow-x-hidden group cursor-pointer relative">
          <div className="flex justify-center items-center">
            <div className="relative">
              <FaShoppingCart style={{ fontSize: "35px" }} />
            </div>
          </div>
          <p className="text-xs font-semibold font-titleFont">Корзина</p>
          {products.length > 0 && (
            <p className="absolute top-1 right-2 bg-[#247935] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
              {products.length}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default SpecialCase;
