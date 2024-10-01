import React, { useState } from "react";
import InputMask from 'react-input-mask';

const OprosForm = () => {
  const [fullName, setFullName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Извлекаем сохраненный результат из localStorage
    const savedResult = JSON.parse(localStorage.getItem('result'));
    if (!savedResult) {
      console.error("No result found in localStorage");
      return;
    }
    
    // Создаем formData
    const formData = new FormData();
    formData.append('fio', fullName);
    formData.append('phone', mobilePhone);
    formData.append('domain', 'vita-balance.kz');
    
    // Добавляем информацию о товарах в formData
    savedResult._id.forEach((productId, index) => {
      formData.append(`goods[${index}][goodID]`, productId);
      formData.append(`goods[${index}][quantity]`, 1);
      formData.append(`goods[${index}][price]`, 1200); // Примерная цена, измените на актуальную
    });

    // Отправляем formData
    const apiUrl = "https://call-center1.leadvertex.ru/api/webmaster/v2/addOrder.html?webmasterID=3&token=1234";
    try {
      const response = await fetch(apiUrl, { method: "POST", body: formData });
      if (response.ok) {
        const responseData = await response.json();
        console.log("Order placed successfully. Order ID:", responseData);
        setIsSubmitted(true);
      } else {
        console.error("Failed to place the order. HTTP Status:", response.status);
      }
    } catch (error) {
      console.error("Error occurred while placing the order:", error);
    }
  };


  return (
    <div className="w-full h-90 mb-20 mt-5 md:bg-transparent relative font-titleFont mt-5 ">
        

      <div className="w-full h-80 px-4 md:px-0 top-0 right-0 flex flex-col items-start gap-6 justify-center relative" >
        <div className="bg-[#323136] w-full p-10 rounded-lg shadow-lg  mx-auto relative m-7">
          <h4 className="text-white font-bold text-21">Оставьте свои контактные данные,</h4>
          <p className="text-white font-bold"> и мы перезвоним для консультации в</p>
          <span className="text-[#ff3131] font-bold"> течение 10 минут.</span>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 font-bold text-white">Имя</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Имя"
                autoComplete="name"
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
                  autoComplete="tel"
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

export default OprosForm;
