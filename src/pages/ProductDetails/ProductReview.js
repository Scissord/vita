import React, { useEffect, useState  } from 'react';
import { ProductsDetailItems } from '../../constants';
import InputMask from 'react-input-mask';

const ReviewCard = ({ name, date, content,image, helpfulCount   }) => (
  <div className="mb-6">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
    <p className="text-gray-700 mt-2">{content}</p>
    {image && <img alt={name} src={image} />} 
    <div className="mt-4 flex items-center justify-between">
      <button className="text-gray-500 text-sm">Это было полезно?</button>
      <span className="text-gray-500 text-sm">{helpfulCount}</span>
    </div>
  </div>
);

const ReviewForm = ({ onReviewSubmit }) => {
  const [name, setName] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [content, setContent] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      name,
      mobilePhone,
      content,
      date: 'только что',
      helpfulCount: 0,
    };

    setName('');
    setMobilePhone('');
    setContent('');
    onReviewSubmit(newReview);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Оставьте отзыв</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="font-bold mb-2 block" htmlFor="name">Ваше имя:</label>
          <input type="text" id="name" className="p-2 block w-full border-2 border-gray-200 rounded-md" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-4 relative">
          <label htmlFor="mobilePhone" className="block mb-2 font-medium">Мобильный телефон:</label>
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
            id="mobilePhone"
            name="mobilePhone"
            className="w-full px-4 py-2 border border-gray-300 rounded-md pl-12"
            value={mobilePhone}
            onChange={(e) => setMobilePhone(e.target.value)}
            required
            maskChar={null}
          />
        </div>
        <div className="mb-4">
          <label className="font-bold mb-2 block" htmlFor="content">Ваш отзыв</label>
          <textarea id="content" rows="4" className="p-2 block w-full border-2 border-gray-200 rounded-md" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 flex items-center justify-center">
          Оставить отзыв
          <span className="ml-2">→</span>
        </button>
      </form>
    </div>
  );
};

const CustomerReviews = ({ productId }) => {
  // Состояние для списка отзывов и деталей продукта
  const [reviews, setReviews] = useState([]);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    // Находим продукт по _id
    const selectedProduct = ProductsDetailItems.find(item => item._id === (productId));
    
    if (selectedProduct) {
      // Устанавливаем детали продукта и его отзывы
      setProductDetails(selectedProduct);
      
      setReviews(selectedProduct.customerReviews || []);
    }
  }, [productId]);

  // Обработчик добавления нового отзыва
  const handleReviewSubmit = (newReview) => {
    setReviews(prevReviews => [...prevReviews, newReview]);
  };

  // Убедитесь, что компонент корректно обрабатывает случаи, когда productDetails еще не загружены
  if (!productDetails) {
    return <div>Загрузка данных о продукте...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 gap-10">
    <div>
      <h2 className="text-2xl font-bold mb-6">Отзывы клиентов</h2>
      {/* Отображаем все отзывы для выбранного товара */}
      {reviews.map((review) => (
        <ReviewCard key={review.id} {...review} />
      ))}
    </div>
    {/* Передаем обработчик добавления отзыва и выводим форму для добавления нового отзыва */}
    <ReviewForm onReviewSubmit={handleReviewSubmit} />
  </div>
  );
};

export default CustomerReviews;
