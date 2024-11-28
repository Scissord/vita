import React, { useState } from 'react';
import InputMask from 'react-input-mask';

const PopupComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Добавлено новое состояние для управления видимостью меню
  const [fullName, setFullName] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [productIDs, setProductIDs] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false); // Состояние для отслеживания отправки заявки

  const [phoneMask, setPhoneMask] = useState('+7 (999) 999 99 99');
  const [phonePlaceholder, setPhonePlaceholder] = useState('+7 (___) ___ __ __');
  const [country, setCountry] = useState('KZ');

  const products = [
    { _id: '202690', name: 'Manbalance' },
    { _id: '204116', name: 'BodyBalance' },
    { _id: '202914', name: 'Flex-Balance' },
    { _id: '204117', name: 'EroKing' },
    { _id: '204118', name: 'AlcoBalance' },
    { _id: '204119', name: 'FemBalance' },
    { _id: '204120', name: 'LibidoFortis' },
  ];

  const handleProductChange = (selectedOptions) => {
    const updatedProductIDs = Array.from(selectedOptions).map(option => ({
      _id: option.value,
      name: option.text
    }));
    setProductIDs(updatedProductIDs);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

    // let apiUrl = `https://call-center1.leadvertex.ru/api/webmaster/v2/addOrder.html?webmasterID=18&token=1234`;
    // if(country === 'KYR') {
    //   apiUrl = `https://callcenter-kyrgyzstan.leadvertex.ru/api/webmaster/v2/addOrder.html?webmasterID=18&token=1234`
    // }
    // const domain = 'vita-balance.kz'
    // const formData = new FormData();

    // productIDs.forEach((product, index) => {
    //   formData.append(`goods[${index}][goodID]`, product._id);
    //   formData.append(`goods[${index}][quantity]`, 1);
    //   formData.append(`goods[${index}][price]`, 1200);
    // });

    // formData.append('fio', fullName);
    // formData.append('domain', domain);
    // formData.append('phone', mobilePhone);

    // try {
    //   const response = await fetch(
    //     apiUrl,
    //     {
    //       method: "POST",
    //       body: formData,
    //     }
    //   );

    //   if (response.ok) {
    //     const responseData = await response.json();
    //     console.log("Order placed successfully. Order ID:", responseData);
    //     console.log(apiUrl);
    //   } else {
    //     console.error("Failed to place the order. HTTP Status:", response.status);
    //     console.log(apiUrl);
    //   }
    // } catch (error) {
    //   console.error("Error occurred while placing the order:", error);
    //   console.log(apiUrl);
    // }
    setIsSubmitted(true);
  };
    
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

   return (
    <div>
      {/* Кнопка для открытия попапа */}
      <button onClick={togglePopup} className="block w-full bg-[#077931] text-white text-14 p-2 rounded-[22px]">
        <img style={{ width: '25px' }} src="https://img.icons8.com/ios-filled/50/FFFFFF/ringer-volume.png" alt="ringer-volume"/>
      </button>

      {/* Попап */}
      {isOpen && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#323136] p-8 rounded-lg shadow-lg relative" style={{ width: '350px' }}>
            <button onClick={togglePopup} className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h4 class="text-white font-bold text-21">Нужна помощь?</h4>
            <p class="text-white">Закажите бесплатный обратный звонок, и мы перезвоним для консультации в </p>
            <span class="text-[#ff3131] font-bold">течение 10 минут.</span>

            {/* Форма */}
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label htmlFor="name" className="block mb-2 font-bold text-white">Имя</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autocomplete="name"
                  placeholder="Имя"
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
                  className="absolute max-w-xs top-11 left-1 py-1 px-1 bg-white"
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
                  name="phone"
                  id="phone"
                  required
                  autocomplete="phone"
                  value={mobilePhone}
                  onChange={(e) => setMobilePhone(e.target.value)}
                  className="border border-gray-300 shadow p-3 w-full rounded pl-12"
                  maskChar={null}
                />
              </div>

              {/* Кнопка для выбора продукта */}
              <button type="button" onClick={toggleMenu} className="mt-4 mb-2 w-full bg-[#4CAF50] text-white font-bold p-2 rounded">Выбрать продукт</button>

              {/* Меню выбора продукта */}
              {isMenuOpen && (
                <div className="relative">
                  <select 
                    multiple={true} 
                    value={productIDs.map(p => p._id)} 
                    onChange={(e) => handleProductChange(e.target.selectedOptions)} 
                    className="border border-gray-300 shadow p-3 w-full rounded"
                  >
                    {products.map((product) => (
                      <option key={product._id} value={product._id}>{product.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Кнопка отправки формы */}
              <button type="submit" className="mt-4 block w-full bg-[#fe3768] text-white font-bold p-4 rounded">Жду звонка</button>
            </form>

            {/* Сообщение об успешной отправке заявки */}
            {isSubmitted && (
              <div className="text-green-500 mt-4">Ваша заявка отправлена успешно!</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupComponent;


 
