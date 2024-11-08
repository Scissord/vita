

import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import { ProductsDetailItems } from "../../constants";

const ProductDetails = () => {
  const location = useLocation();
  const { _id } = useParams();
  const [productInfo, setProductInfo] = useState([]);

  useEffect(() => {
   
    const selectedProduct = ProductsDetailItems.find(item => item._id === _id);

    if (selectedProduct) {
      setProductInfo(selectedProduct);
    }
  }, [location, _id]);

  return (
    <div className="w-full bg-[#f3f4f6] mx-auto border-b-[1px] border-b-gray-300 ">
      <div className="max-w-container mx-auto px-4 mt-4">
      
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4">
          <div className="h-full">
            {/* <ProductsOnSale /> */}
          </div>
          <div className="h-full xl:col-span-2">
            <img
              className="mt-4 w-full h-full object-cover"
              src={productInfo.img}
              alt={productInfo.img}
            />
          </div>
          <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
