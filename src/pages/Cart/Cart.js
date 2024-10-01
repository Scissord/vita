import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { updateTotalAmount } from "../../redux/orebiSlice";
import { emptyCart } from "../../assets/images/index";
import ItemCard from "./ItemCard";
import { promoCodes } from "../../constants/index";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.orebiReducer.products);
  
  const [totalAmt, setTotalAmt] = useState(0);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromoCode, setAppliedPromoCode] = useState('');
  const [message, setMessage] = useState('');
  const [discount, setDiscount] = useState(0);
  
  useEffect(() => {
    let price = 0;
    products.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmt(price);
    
    let finalPrice = price;
    if (appliedPromoCode) {
      const promo = promoCodes.find((code) => code.promo === appliedPromoCode);
      finalPrice -= promo ? price * Math.abs(promo.discount) : 0;
      
    }

    if (finalPrice <= 200) {
      setShippingCharge(0);
    } else if (finalPrice <= 400) {
      setShippingCharge(0);
    } else {
      setShippingCharge(0);
    }

    dispatch(updateTotalAmount(finalPrice));
  }, [products, appliedPromoCode, dispatch]);

  const applyPromoCode = () => {
    const matchedPromoCode = promoCodes.find((code) => code.promo === promoCode);
    if (matchedPromoCode) {
      setAppliedPromoCode(promoCode);
      let discountValue = matchedPromoCode.discount;

      // Check if the discount is a percentage or a fixed amount
      if (Math.abs(discountValue) < 1) {
        // It's a percentage, calculate the discount based on the total amount
        discountValue = totalAmt * discountValue;
        localStorage.setItem('discount', discountValue)
      }

      setDiscount(discountValue);
      setMessage(`Промо-код успешно применен. Скидка: ${Math.abs(discountValue)} тг`);
    } else {
      setMessage('Введен недействительный промо-код.');
    }
    setPromoCode('');
  };
  
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Корзина" />
      {products.length > 0 ? (
        <div className="pb-20">
          <div className="w-full h-20 bg-[#F5F7F7] text-primeColor hidden lgl:grid grid-cols-5 place-content-center px-6 text-lg font-titleFont font-semibold">
            <h2 className="col-span-2">Товар</h2>
            <h2>Цена</h2>
            <h2>Количество</h2>
            <h2>Итого</h2>
          </div>
          <div className="mt-5">
            {products.map((item) => (
              <div key={item._id}>
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          <div className="flex flex-col mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
            <div className="flex items-center gap-4">
              <input
                className="w-44 mdl:w-52 h-8 px-4 border text-primeColor text-sm outline-none border-gray-400"
                type="text"
                placeholder="Введите промокод"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button className="text-sm mdl:text-base font-semibold" onClick={applyPromoCode}>Применить</button>
            </div>
          </div>
          
          {appliedPromoCode && (
            <div className="flex flex-col items-start mdl:flex-row justify-between border py-4 px-4 items-center gap-2 mdl:gap-0">
              {message && <p>{message}</p>}
              {appliedPromoCode && <p>Применен промо-код: {appliedPromoCode}</p>}
            </div>
          )}
          
          <div className="max-w-7xl gap-4 flex justify-end mt-4">
            <div className="w-96 flex flex-col gap-4">
              <h1 className="text-2xl font-semibold text-right">Итого заказа</h1>
              <div>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Сумма:
                  <span className="font-semibold tracking-wide font-titleFont">
                    {totalAmt} тг
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 border-b-0 py-1.5 text-lg px-4 font-medium">
                  Доставка
                  <span className="font-semibold tracking-wide font-titleFont">
                    {shippingCharge} тг
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Скидка
                  <span className="font-semibold tracking-wide font-titleFont">
                    {discount} тг
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 text-lg px-4 font-medium">
                  Общий
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    {totalAmt + shippingCharge + discount} тг
                  </span>
                </p>
              </div>
              <div className="flex justify-end">
                <Link to="/paymentgateway">
                  <button className="w-52 h-10 bg-primeColor text-white hover:bg-black duration-300">
                    Оформить заказ
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col mdl:flex-row justify-center items-center gap-4 pb-20"
        >
          <div>
            <img
              className="w-80 rounded-lg p-4 mx-auto"
              src={emptyCart}
              alt="emptyCart"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8 bg-white flex gap-4 flex-col items-center rounded-md shadow-lg">
            <h1 className="font-titleFont text-xl font-bold uppercase">
              Ваша корзина пустая
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Вы можете выбрать товары из каталога в главной и добавить себе в корзину для оформления заказа
            </p>
            <Link to="/shop">
              <button className="bg-primeColor rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-titleFont font-semibold text-lg text-gray-200 hover:text-white duration-300">
                Посмотреть каталог
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
