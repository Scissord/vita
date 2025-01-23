import React, { useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import InputMask from 'react-input-mask';

const Payment = () => {
  const [fullName, setFullName] = useState("");
  const [mobilePhone, setMobilePhone] = useState('');
  const [streetAddress, setStreetAddress] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [additional9, setAdditional9] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

    setSubmitSuccess(true); // Устанавливаем состояние успешной отправки в true
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Оформление заказа" />
      <div className="pb-10">
        <div className="container mx-auto p-8">
          <form id="divulgacion-form" className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className=" grid-cols-2 gap-4">
              <div className="mb-2">
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
              <div className="mb-2 relative">
                <label htmlFor="correo-electronico" className="block mb-2 font-medium">Мобильный телефон:</label>
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
                  id="correo-electronico"
                  name="correo-electronico"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md pl-12"
                  value={mobilePhone}
                  onChange={(e) => setMobilePhone(e.target.value)}
                  required
                  maskChar={null}
                />
              </div>
              <div className="mb-2">
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

              <div className="mb-2">
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

                  {/* kz */}
                  {country === 'KZ' && (
                    <>
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
                    </>
                  )}

                  {/* kyr */}
                  {country === 'KYR' && (
                    <>
                      <option value="Bishkek">Бишкек</option>
                      <option value="Osh">Ош</option>
                      <option value="Dzhalal-Abad">Джалал-Абад</option>
                      <option value="Karakol">Каракол</option>
                      <option value="Kyzyl-kia">Кызыл-кия</option>
                      <option value="Uzgen">Узген</option>
                      <option value="Balykchi">Балыкчы</option>
                      <option value="Kara-Balta">Кара-Балта</option>
                      <option value="Naryn">Нарын</option>
                      <option value="Talas">Талас</option>
                    </>
                  )}

                  {/* uzb */}
                  {country === 'UZB' && (
                    <>
                      <option value="Tashkent">Ташкент</option>
                      <option value="Namangan">Наманган</option>
                      <option value="Samarkand">Самарканд</option>
                      <option value="Andijan">Андижан</option>
                      <option value="Fergana">Фергана</option>
                      <option value="Nukus">Нукус</option>
                      <option value="Buhara">Бухара</option>
                      <option value="Karshi">Карши</option>
                      <option value="Nanoi">Навои</option>
                      <option value="Margilan">Маргилан</option>
                      <option value="Urgench">Ургенч</option>
                    </>
                  )}

                  {/* other */}
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
