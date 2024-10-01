import React, { useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import InputMask from 'react-input-mask';

const Payment = () => {
  const [fullName, setFullName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [additional9, setAdditional9] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false); // Состояние для отслеживания успешной отправки

  const discount = localStorage.getItem('discount');
  const products = useSelector((state) => state.orebiReducer.products);
  const totalAmount = useSelector((state) => state.orebiReducer.totalAmount);

  const handleCreditCheckboxChange = () => {
    setAdditional9(!additional9);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setPostalCode("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let apiUrl = `https://call-center1.leadvertex.ru/api/webmaster/v2/addOrder.html?webmasterID=18&token=1234`;
    const domain = 'vita-balance.kz';
    const formData = new FormData();

    products.forEach((product, index) => {
      const price = parseFloat(product.price) + parseFloat(discount);
      formData.append(`goods[${index}][goodID]`, product._id);
      formData.append(`goods[${index}][quantity]`, product.quantity);
      formData.append(`goods[${index}][price]`, price); 
    });
    
    formData.append('additional9', additional9 ? 'KASPI-KREDIT' : '');
    formData.append('fio', fullName);
    formData.append('domain', domain);
    formData.append('phone', mobilePhone);
    formData.append('address', streetAddress);
    formData.append('city', selectedCity);
    formData.append('postIndex', postalCode);

    try {
      const response = await fetch(apiUrl, {method: "POST", body: formData});

      if (response.ok) {
        const responseData = await response.json();
        console.log("Order placed successfully. Order ID:", responseData.orderId);
        setSubmitSuccess(true); // Устанавливаем состояние успешной отправки в true
        

      } else {
        console.error("Failed to place the order. HTTP Status:", response.status);
        setSubmitSuccess(true); // Устанавливаем состояние успешной отправки в true
      }
    } catch (error) {
      console.error("Error occurred while placing the order:", error);
      setSubmitSuccess(true); // Устанавливаем состояние успешной отправки в true
     
      
    }
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Оформление заказа" />
      <div className="pb-10">
        <div className="container mx-auto p-8">
          <form id="divulgacion-form" className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className=" grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombre-completo" className="block mb-2 font-medium">Полное Имя:</label>
                <input
                  type="text"
                  id="nombre-completo"
                  name="nombre-completo"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="correo-electronico" className="block mb-2 font-medium">Мобильный телефон:</label>
                <InputMask
                  placeholder="+7(___)___-__-__"
                  mask="+7 (999) 999 99 99"
                  type="tel"
                  id="correo-electronico"
                  name="correo-electronico"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={mobilePhone}
                  onChange={(e) => setMobilePhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="telefono-movil" className="block mb-2 font-medium">Улица, дом, квартира</label>
                <input
                  type="text"
                  id="telefono-movil"
                  name="telefono-movil"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="pais" className="block mb-2 font-medium">Город:</label>
                <select
                  id="pais"
                  name="pais"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  onChange={handleCityChange}
                  value={selectedCity}
                  required
                >
                  <option value="" disabled>Выберите город</option>
                  <option value="ASTANA-KURER">Астана</option>
                    <option value="ALMATA">Алматы</option>
                    <option value="AKSAI">Аксай</option>
                    <option value="AKTAU">Актау</option>
                    <option value="AKTOBE">Актобе</option>
                    <option value="ATYRAU">Атырау</option>
                    <option value="KARAGANDA">Караганда</option>
                    <option value="KOKSHETAU">Кокшетау</option>
                    <option value="KOSTANAI">Костанай</option>
                    <option value="KYLSARY">Кульсары</option>
                    <option value="KYZYKORDA">Кызылорда</option>
                    <option value="PAVLODAR">Павлодар</option>
                    <option value="PETROPAVLOVSK">Петропавловск</option>
                    <option value="Saryagash">Сарыагаш</option>
                    <option value="SEMEI">Семей</option>
                    <option value="SHIMKENT">Шымкент</option>
                    <option value="TALDYKORGAN">Талдыкорган</option>
                    <option value="TARAZ">Тараз</option>
                    <option value="TEMIRTAU">Темиртау</option>
                    <option value="TURKESTAN">Туркестан</option>
                    <option value="URALSK">Уральск</option>
                    <option value="UST-KAMENOGORSK">Усть-Каменогорск</option>
                    <option value="ZHANAOZEN">Жанаозен</option>
                    <option value="Zhetysai">Жетысай</option>
                    <option value="ZHEZKAZGAN">Жезказган</option>
                    <option value="EKIBASTUZ">Экибастуз</option>
                    <option value="Balkhash">Балхаш</option>
                    <option value="Kentau">Кентау</option>
                    <option value="Other">Другой город</option>
                </select>
              </div>
              
              {selectedCity === "Other" && (
                <div>
                  <label htmlFor="postal-code" className="block mb-2 font-medium">Укажите регион доставки (адрес):</label>
                  <input
                    type="text"
                    id="postal-code"
                    name="postal-code"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                  />
                </div>
              )}
                
              <div className="flex items-center mt-2">
     <input
          type="checkbox"
          id="creditCheckbox"
          name="creditCheckbox"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          onChange={handleCreditCheckboxChange} // Добавляем обработчик изменения состояния чекбокса
        />
        <label htmlFor="creditCheckbox" className="ml-2 block text-sm text-gray-900">
          Оформить в кредит
        </label>
</div>

              
              <div className="col-span-2 mt-5">
                <button type="submit" className="px-2 py-2 bg-blue-500 text-white font-bold rounded-md">
                  Оформить заказ
                </button>
               
              </div>
            </div>
            {submitSuccess && ( // Показываем сообщение об успешной отправке, если submitSuccess true
              <div className="text-green-600 mt-4">
                Ваша заявка отправлена успешно!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
