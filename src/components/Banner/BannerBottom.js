import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { CgRedo } from "react-icons/cg";

import { FaTelegramPlane } from "react-icons/fa";
const BannerBottom = () => {
  return (
      <section>
    <div className="w-full bg-white border-b-[1px] border-b-gray-200">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
        <div className="bg-gray-200 rounded-lg p-4">
          <div className="flex">
          <span className="font-bold font-titleFont w-6 text-center">
             <FaTelegramPlane/>
          </span>
          <h3 class="text-lg font-semibold mb-2">Специальное предложение</h3>
          </div>
          <p class="text-sm">На вторую покупку дается скидка в размере 10 990 тг <br/>
          И при заказе через интернет-магазин есть спец цена на все товары !
          </p>
        </div>
        <div className="bg-gray-200 rounded-lg p-4">
        <div className="flex">
          <span className="text-xl text-center w-6 ml-1">
            <MdLocalShipping />
          </span>
          <h3 class="text-lg font-semibold mb-2">Бесплатная доставка</h3>
          </div>
          <p class="text-sm">У нас действует бесплатная доставка по всему Казахстану</p>
        </div>
        <div className="bg-gray-200 rounded-lg p-4">
        <div className="flex">
          <span className="text-2xl text-center w-6">
            <CgRedo />
          </span>
          <h3 class="text-lg font-semibold mb-2">Новое поступление</h3>
          </div>
          <p class="text-sm">Ознакомьтесь с новыми продуктами, которые поступили в продажу. Перейдите в наш каталог, чтобы узнать больше.</p>
        </div>
       
      </div>
      
    </div>
    </section>
  );
};

export default BannerBottom;
