import React, { useState } from "react";
import Slider from "react-slick";
import { reviews } from "../../../constants";
import { FaQuoteRight, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import "./ReviewSlider.css"; // Убедитесь, что у вас есть этот CSS файл с необходимыми стилями

// Компоненты для стрелок
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <FaArrowRight
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <FaArrowLeft
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
}

const ReviewSlider = () => {
  const [dotActive, setDotActive] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (prev, next) => {
      setDotActive(next);
    },
    appendDots: dots => (
      <div style={{ position: "absolute", bottom: "25px" }}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <button
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          padding: "0px",
          marginLeft: "5px",
          marginRight: "5px",
          color: dotActive === i ? "black" : "white",
          border: dotActive === i ? "1px black solid" : "1px white solid",
        }}
      ></button>
    )
  };

  return (
    <div className="review-slider-container">
      <Slider {...settings}>
       {reviews.map((review, index) => (
          <div key={index} className="p-10 mb-10">
            <div className="flex flex-col items-center justify-center">
              <img src={review.image} alt={review.name} className="w-24 h-24 rounded-full mb-4" />
              <FaQuoteRight className="text-2xl mb-4" />
              <p className="text-lg font-semibold">{review.name}</p>
              <p className="text-sm uppercase mb-4">{review.job}</p>
              <p className="text-gray-600 text-center">{review.text}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewSlider;
