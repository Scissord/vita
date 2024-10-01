import React from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";

import {
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
  newArrFive,
  newArrSix,
  newArrSeven,
} from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";

const NewArrivals = () => {
  const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true, // Добавляем автоматическое переключение
  autoplaySpeed: 3000, // Устанавливаем интервал автопереключения в миллисекундах
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
};
  return (
    <div className="w-full pb-16">
      <Heading heading="Продукты" />
      <Slider {...settings}>
         <div className="px-2">
          <Product
            _id= "202690"
            img={newArrOne}
            productName="ManBalance"
            price="64800"
            color="средство для мужчин"
            badge={true}
          />

        </div>
        
        <div className="px-2">
          <Product
            _id="204116"
            img={newArrTwo}
            productName="BodyBalance"
            price="64800"
            color="средство для похудения"
            badge={true}
          />
        </div>
        <div className="px-2">
          <Product
            _id="204118"
            img={newArrThree}
            productName="AlcoBalance"
            price="64800"
            color="средство от алкозависимости"
            badge={true}
           
          />
        </div>
        <div className="px-2">
          <Product
            _id="202914"
            img={newArrFour}
            productName="FlexBalance"
            price="64800"
            color="средство от болей в суставах"
            badge={true}
           
          />
        </div>

        
        <div className="px-2">
          <Product
            _id="204120"
            img={newArrSix}
            productName="LibidoFortis"
            price="54000"
            color="средство для мужчин"
            badge={true}
        
          />
        </div>
         <div className="px-2">
          <Product
            _id= "204117"
            img={newArrFive}
            productName="EroKing"
            price="43200"
            color="средство для мужчин"
            badge={true}
          />

        </div>

        <div className="px-2">
          <Product
            _id="204119"
            img={newArrSeven}
            productName="FemBalance"
            price="64800"
            color="средство для женщин"
            badge={true}
          />
        </div>
    
      </Slider>
    </div>
  );
};

export default NewArrivals;
