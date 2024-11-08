import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";
import { capsule, firstCertificate, secondCertificate } from "../../../assets/images/index";
import StatCard from "./ProductStats";
import { ItemsBox as itemsBoxConstants } from "../../../constants/index"; // Изменил имя при импорте для избежания конфликта


const ProductInfo = ({ productInfo }) => {
  const dispatch = useDispatch();
  const [currentPrice, setCurrentPrice] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  

  useEffect(() => {
    if (productInfo.priceList && productInfo.priceList.length > 0) {
      setCurrentPrice(productInfo.priceList[0].price);
    }
  }, [productInfo.priceList]);

  const handlePriceChange = (newPrice, index) => {
    setCurrentPrice(newPrice);
    setActiveIndex(index);
  };

  const itemsBoxComponent = (
    <div className="flex flex-wrap -m-2">
      {itemsBoxConstants.map((item, index) => (
        <div key={index} className="p-2 w-full md:w-1/3">
          <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
            <span className="inline-block rounded-lg bg-gray-50 p-3">
              <img className="h-10 w-10" src={item.img} alt={item.title} />
            </span>
            <h2 className="mt-2 font-bold">{item.title}</h2>
            <p className="mt-1 text-sm text-gray-600">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );




 const priceList = Array.isArray(productInfo.priceList) ? (
  <>
    <ul className="text-left text-gray-500 dark:text-gray-400 list-disc contents md:flex flex-row justify-around ">
      {productInfo.priceList.map((item, index) => (
        <li
          key={index}
          className={`flex flex-col items-center justify-around rounded-xl bg-white border border-gray-100 p-1 shadow-sm ${activeIndex === index ? '' : ''}`}
          onClick={() => handlePriceChange(item.price, index)}
          style={activeIndex === index ? { border: '2px solid #097832' } : null}
        >
          <img src={item.pack} alt={`Pack ${index + 1}`} className="mx-auto mb-2" style={{ maxWidth: '100px' }} />
          {item.undiscount && <span className="line-through text-gray-400">{item.undiscount}тг</span>}
          <span className="bg-[#247935] text-white rounded-lg px-1 py-0">{item.price}тг</span>
        </li>
      ))}
    </ul>
  </>
) : null;


const addTocartPrice = currentPrice ;

  const listItems = Array.isArray(productInfo.listItems) ? (
    <>
      <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400 list-disc flex flex-col justify-around">
        {productInfo.listItems.map((item, index) => (
          <li key={index} className="flex items-center space-x-3 rtl:space-x-reverse text-sm uppercase">
            <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
            <span>{item.li}</span>
          </li>
        ))}
      </ul>
    </>
  ) : null;

  const rules = Array.isArray(productInfo.rules) ? (
    <>
      <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400 list-disc flex flex-col justify-around">
        {productInfo.rules.map((item) => (
          
            
            <p className="font-medium text-lg text-black">{item.li}</p>          
        ))}
      </ul>
    </>
  ) : null;

  return (
    <div className="flex flex-col gap-5">
    
      <h2 className="text-4xl font-semibold">{productInfo.productName}</h2>
      
      
      
      <p className="text-base text-gray-600 font-bold">{productInfo.des}</p>
      {itemsBoxComponent}
      <p className="font-medium text-lg">
        <span className="font-normal">Cостав:</span> <br/>
        {productInfo.des1}
      </p>
      <p className="text-sm">Предоставляем гарантию</p>

      <h2 className="mt-2 font-bold uppercase" style={{fontSize: '50px'}}>ПОМОГАЕТ:</h2>
      <h4 className="mt-2 font-bold text-md text-[#077931]" style={{fontSize: '26px'}}>ИЗБАВИТЬСЯ ОТ:</h4>
      <div className="flex justify-between">
        {listItems}
        <div className="w-[100px] uppercase bg-[#077931] flex items-center justify-center rounded-lg text-white"><img style={{ maxWidth: '150px' }} src={productInfo.capsule} /></div>
      </div>
      <div>
        {rules}

      </div>
  
    <StatCard/>
      
      <p className="font-medium text-lg">Сертификаты:</p>
      <div className="flex flex-row">
        
        <img style={{ width: '50%', maxWidth: '200px' }} src={secondCertificate} alt="certificate" />
      </div>
      <p className="font-medium text-lg">
        <span className="font-normal">Результат:</span> <br/>
        {productInfo.des2}
      </p>
     
     

      <p className="font-normal text-sm">
        <span className="text-base font-medium"> Бренд:</span> VitaBalance
      </p>
      <h1 className="text-[#578029] font-bold">Выгодное предложение</h1>
      <div className="flex flex-row justify-center p-px lg:justify-stretch rounded gap-2 lg:grid ">
      
        {priceList}
      </div>
              
     <button
        onClick={() =>
          dispatch(
            addToCart({
              _id: productInfo._id,
              name: productInfo.productName,
              quantity: 1,
              image: productInfo.img,
              badge: productInfo.badge,
              price: currentPrice,
              colors: productInfo.color,
            })
          )
        }
        className="w-full py-4 bg-[#077931] hover:bg-[#000] duration-300 text-white text-lg font-titleFont rounded"
      >
        Добавить в корзину {addTocartPrice}
      </button>
      <button
        onClick={() =>
          dispatch(
            addToCart({
              _id: productInfo._id,
              name: productInfo.productName,
              quantity: 1,
              image: productInfo.img,
              badge: productInfo.badge,
              price: currentPrice,
              colors: productInfo.color,
            })
          )
        }
        className="w-full py-2 bg-[#ef4635] duration-300 text-white text-lg font-titleFont rounded"
      >
        Купить в кредит
      </button>
    </div>
  );
};

export default ProductInfo;
