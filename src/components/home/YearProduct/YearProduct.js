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

  const [phoneMask, setPhoneMask] = useState('+7 (999) 999 99 99');
  const [phonePlaceholder, setPhonePlaceholder] = useState('+7 (___) ___ __ __');
  const [country, setCountry] = useState('KZ');

  const handleChangeCountry = (val) => {
    setMobilePhone('')
    setCountry(val);
    switch (val) {
      case 'KZ': // Казахстан
        setPhoneMask('+7 (999) 999 99 99');
        setPhonePlaceholder('+7 (___) ___ __ __');
        break;
      case 'KYR': // Кыргызстан
        setPhoneMask('+996 (999) 999 999');
        setPhonePlaceholder('+996 (___) ___ ___');
        break;
      case 'UZB': // Узбекистан
        setPhoneMask('+998 (99) 999 9999');
        setPhonePlaceholder('+998 (__) ___ ____');
        break;
      default:
        setPhoneMask('+7 (999) 999 99 99');
        setPhonePlaceholder('+7(___)___-__-__');
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'https://api.talkcall-crm.com/api/orders';
    const data = {
      fio: fullName,
      phone: mobilePhone,
      additional1: 'vita-balance.kz',
      web: 18,
    };

    try {
      const response = await fetch(
        url,
        {
          method: "POST",
          body: JSON.stringify(data)
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
            <div className="mb-10 relative">
              <label htmlFor="phone" className="block mb-2 font-bold text-white">Телефон</label>
              <select
                id="country"
                name="country"
                value={country}
                onChange={(e) => handleChangeCountry(e.target.value)}
                className="absolute max-w-xs top-10 left-1 py-1 px-1 bg-white"
                required
              >
                <option value="KZ">{"\u{1F1F0}\u{1F1FF}"}</option>
                <option value="KYR">{"\u{1F1F0}\u{1F1EC}"}</option>
                <option value="UZB">{"\u{1F1FA}\u{1F1FF}"}</option>
              </select>
              <InputMask
                placeholder={phonePlaceholder}
                mask={phoneMask}
                type="tel"
                id="phone"
                name="phone"
                autocomplete="tel"
                className="border border-gray-300 shadow p-3 w-full rounded pl-12"
                value={mobilePhone}
                onChange={(e) => setMobilePhone(e.target.value)}
                required
                maskChar={null}
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
