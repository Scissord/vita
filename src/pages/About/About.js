import React, {  } from "react";
import { Link, useLocation } from "react-router-dom";

import { newArrOne } from "../../assets/images";

const About = () => {


  
 
  return (
    <div className="max-w-container mx-auto px-4 mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>
    
      <div className="mt-8 flex flex-col lg:flex-row items-center lg:items-start justify-between">
        <div className="lg:w-1/2 lg:pr-8">
          <h2 className="text-3xl font-bold mb-4">Vita Balance</h2>
          <p className="text-lg mb-4">
            Vita Balance - это инновационная компания, которая специализируется на создании продуктов для здоровья и благополучия. Мы постоянно стремимся к разработке высококачественных продуктов, которые помогают нашим клиентам улучшить их качество жизни и достичь своих целей в заботе о здоровье.
          </p>
          <p className="text-lg mb-4" >
          Наша миссия - обеспечить каждого клиента надежными решениями для улучшения качества жизни. Мы гордимся тем, что наши препараты получили признание и доверие клиентов по всему миру. С каждым годом мы стремимся к инновациям и совершенствованию наших продуктов, чтобы удовлетворить все потребности наших ценных клиентов.
          </p>
          <Link to="/shop" className="text-lg font-semibold text-blue-600 hover:underline">Каталог продуктов</Link>
        </div>
        <div className="lg:w-1/3 mt-8 lg:mt-0 flex justify-around">
          <img src={newArrOne} alt="Баннер" className="rounded-lg shadow-lg w-full" />
     
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <div className="bg-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Специальное предложение</h3>
          <p className="text-sm">На вторую покупку дается скидка в размере 10 990 тг</p>
        </div>
        <div className="bg-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Бесплатная доставка</h3>
          <p className="text-sm">У нас действует бесплатная доставка по всему Казахстану</p>
        </div>
        <div className="bg-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Подписка на рассылку</h3>
          <p className="text-sm">Ознакомьтесь с новыми продуктами, которые поступили в продажу. Перейдите в наш каталог, чтобы узнать больше.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
