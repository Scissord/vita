import React from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import PromotionBanner from "./PromotionBanner";
import { bannerImgOne } from "../../assets/images";

const Contact = () => {
  const location = useLocation();

  // Массив объектов с данными для каждого баннера
  const promotionDataArray = [
    {
      title: "Супер Акция: Скидка 50% на все товары!",
      content: "Только до 12 февраля у вас есть возможность приобрести любой товар со скидкой 50%! Успейте воспользоваться этим предложением!",
      date: "7 февраля 2024",
      imageUrl: bannerImgOne,
      destinationUrl: "/shop",
    },
    // {
    //   title: "Супер Акция: Скидка 50% на все товары!",
    //   content: "Только сегодня у вас есть возможность приобрести любой товар со скидкой 50%! Успейте воспользоваться этим предложением!",
    //   date: "7 февраля 2024",
    //   imageUrl: bannerImgOne,
    //   destinationUrl: "/destination",
    // },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-screen-lg">
      <h1 className="text-3xl font-bold mb-8">Актуальные акции</h1>
      {promotionDataArray.map((promotionData, index) => (
        <PromotionBanner key={index} {...promotionData} />
      ))}
    </div>
  );
};

export default Contact;
