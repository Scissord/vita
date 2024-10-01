import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import ProductsOnSale from "../../components/pageProps/productDetails/ProductsOnSale";
import { ProductsDetailItems } from "../../constants";
import CustomerReviews from "./ProductReview";
import './ProductDetailsWithVideo.css'

const ProductDetailsWithVideo = () => {
  const location = useLocation();
  const { _id } = useParams(); // Получаем _id из URL
  const [productInfo, setProductInfo] = useState([]);
  const [selectedPath, setSelectedPath] = useState(null);

  useEffect(() => {
    const selectedProduct = ProductsDetailItems.find((item) => item._id === _id);

    console.log(_id);
    if (selectedProduct) {
      setProductInfo(selectedProduct);
      setSelectedPath(selectedProduct.img || selectedProduct.video);
    }
  }, [location, _id]);

  const handleVideoSelection = (videoPath) => {
    setSelectedPath(videoPath);
  };

  return (
    <div className="w-full bg-[#f3f4f6] mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto px-4 bg-[#f3f4f6]">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 h-full -mt-5 xl:pb-10 bg-gray-100 p-4">
          <div className="h-full relative xl:col-span-2 ">
            <div className="w-1/4 h-1/2 absolute top-32 left-3 z-10 flex flex-col justify-around md:h-1/6 top-6">
              {/* Placeholder for main video */}
              {productInfo.video && (
                <div className="h-1/3 bg-black mb-4 rounded cursor-pointer" onClick={() => handleVideoSelection(productInfo.video)}>
                  <img className="w-full h-full object-cover rounded" src={productInfo.videoPoster} alt="Video placeholder" />
                </div>
              )}

              {/* Placeholder for another video */}
              {productInfo.anotherVideo && (
                <div className="h-1/3 bg-gray-500 rounded mb-4 cursor-pointer" onClick={() => handleVideoSelection(productInfo.anotherVideo)}>
                  <img className="w-full h-full object-cover rounded" src={productInfo.anotherVideoPoster} alt="Video placeholder" />
                </div>
              )}

              {/* Placeholder for image */}
              {productInfo.img && (
                <div className="h-1/3 bg-gray-500 rounded cursor-pointer" onClick={() => handleVideoSelection(productInfo.img)}>
                  <img className="w-full h-full object-cover" src={productInfo.img} alt={productInfo.img} />
                </div>
              )}
            </div>

            <div className="w-full  object-cover">
              {selectedPath && (
                <>
                  {selectedPath.includes(".mp4") ? (
                    <video className="w-full h-full object-cover rounded" controls autoPlay src={selectedPath} type="video/mp4">
                      Ваш браузер не поддерживает тег video.
                    </video>
                  ) : (
                    <img className="w-full h-full object-cover" src={selectedPath} alt={selectedPath} />
                  )}
                </>
              )}
            </div>
            <div className="customer-reviews-desktop">
            <CustomerReviews productId={_id} />
</div>
          </div>
          
          
        <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:px-14 flex flex-col gap-6 justify-center">
            <ProductInfo productInfo={productInfo} />
          </div>  
        </div>
        
        <div className="customer-reviews-mobile">
        <CustomerReviews productId={_id} />
  </div>
      </div>
    </div>
  );
};

export default ProductDetailsWithVideo;
