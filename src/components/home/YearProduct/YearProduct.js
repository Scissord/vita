import React, { useState } from "react";
import './YearProduct.css';
import { productOfTheYear } from "../../../assets/images";
import ShopNow from "../../designLayouts/buttons/ShopNow";
import Image from "../../designLayouts/Image";
import InputMask from 'react-input-mask';
const YearProduct = () => {
  const [fullName, setFullName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // Состояние для отслеживания отправки заявки
    
  const handleSubmit = async (event) => {
    event.preventDefault();

    let apiUrl = `https://call-center1.leadvertex.ru/api/webmaster/v2/addOrder.html?webmasterID=3&token=1234`;
        const domain = 'vita-balance.kz'
    const formData = new FormData();

    formData.append('fio', fullName);
    formData.append('phone', mobilePhone);
    formData.append('domain', domain);

    try {
      const response = await fetch(
        apiUrl,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Order placed successfully. Order ID:", responseData);
      } else {
        console.error("Failed to place the order. HTTP Status:", response.status);
      }
    } catch (error) {
      console.error("Error occurred while placing the order:", error);
    }
    setIsSubmitted(true)
  };

  return (
    <div className="w-full h-90 mb-20 mt-5 md:bg-transparent relative font-titleFont mt-5 ">
      <Image
          className="w-full h-full object-cover hidden md:inline-block"
          imgSrc={productOfTheYear}
        />

      <div className="w-full md:w-2/3 xl:w-1/2 h-80  absolute px-4 md:px-0 top-0 right-0 flex flex-col items-start gap-6 justify-center relativer" >
        <div className="bg-[#323136] p-10 rounded-lg shadow-lg md:w-3/4 lg:w-1/2 mx-auto relative m-7">
          <h4 className="text-white font-bold text-21">Нужна помощь?</h4>
          <p className="text-white">Закажите бесплатный обратный звонок, и мы перезвоним для консультации в</p>
          <span className="text-[#ff3131] font-bold"> течение 10 минут.</span>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 font-bold text-white">Имя</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Имя"
                autocomplete="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="border border-gray-300 shadow p-3 w-full rounded"
              />
            </div>
            <div className="mb-10">
              <label htmlFor="phone" className="block mb-2 font-bold text-white">Телефон</label>
              <InputMask
                  placeholder="+7(___)___-__-__"
                  mask="+7 (999) 999 99 99"
                  type="tel"
                  id="phone"
                  name="phone"
                  autocomplete="tel"
                  className="border border-gray-300 shadow p-3 w-full rounded"
                  value={mobilePhone}
                  onChange={(e) => setMobilePhone(e.target.value)}
                  required
                />
            </div>
            <button type="submit" style={{ boxShadow: '0px 0px 9px 0px #fe3768' }} className="block w-full bg-[#fe3768] text-white font-bold p-4 rounded">Жду звонка</button>
          </form>
            {isSubmitted && (
            <div className="text-green-500 mt-4">Ваша заявка отправлена успешно!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YearProduct;
