import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import { kaspi } from "../../../assets/images/index";
import Badge from "./Badge";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { ProductsDetailItems } from "../../../constants";

const Product = (props) => {
  const dispatch = useDispatch();
  const _id = props._id;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);
  const navigate = useNavigate();

  const handleProductDetails = () => {
    navigate(`/product/${rootId}`);
  };

  const handleAddToCart = () => {
    const selectedProduct = ProductsDetailItems.find((item) => item._id === _id);

    if (selectedProduct) {
      dispatch(
        addToCart({
          _id: selectedProduct._id,
          name: selectedProduct.productName,
          quantity: 1,
          image: selectedProduct.img,
          badge: selectedProduct.badge,
          price: selectedProduct.price,
          colors: selectedProduct.color,
        })
      );
    }
  };

  return (
    <div className="w-full h-full relative group">
      <div className="max-w-full relative overflow-y-hidden">
         <div>
          <Link onClick={handleProductDetails}>
          <Image className="w-full h-full" imgSrc={props.img} />
          </Link>
        </div>
        <div className="absolute top-6 left-8">
          {props.badge && <Badge imgSrc={kaspi} />}
        </div>
    
      </div>
      <div  className="max-w-full py-6 flex flex-col gap-1 border-[1px] border-t-0 px-3 relative">
        <div className="flex items-center flex-col justify-between font-titleFont md:flex-row">
          <h2 className="text-lg text-primeColor font-bold">
            {props.productName}
          </h2>
          <p className="text-[#767676] text-[15px]">{props.price} тг</p>
        </div>
        <div>
          <p className="text-[#767676] text-[15px]">{props.color}</p>
        </div>
        <div className='flex justify-around gap-5 items-center md:flex-row'>
        <button onClick={handleAddToCart} class="bg-[#077931] hover:bg-green-700 text-white py-2 px-4 rounded sm:px-2 sm:py-1 md:px-4 md:py-2">
        <span>
                <FaShoppingCart />
              </span>
            
        </button>
        <button onClick={handleProductDetails} class="bg-[#077931] flex hover:bg-green-700 text-white py-2 px-4 rounded flex items-center justify-start sm:px-1 text-sm sm:py-1 text-sm md:px-4 md:py-2">
    Подробнее
    <span class="text-sm sm:text-lg">
        <MdOutlineLabelImportant />
    </span>
</button>

        </div>
      </div>
    </div>
  );
};

export default Product;
