import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import './contact.css' 

const PromotionBanner = ({ title, content, date, imageUrl, destinationUrl }) => {
  return (
    <div className="mt-8 shadow-lg rounded-lg overflow-hidden promotion-banner">
      <div className="flex justify-center">
        <img src={imageUrl} alt="Promotion Banner" className="max-w-full h-auto" />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-4">{content}</p>
        <p className="mt-2 text-gray-500">Дата публикации: {date}</p>
        <div className="wrapper float-right mb-4 mr-4 mt-4">
          <Link to={destinationUrl} className="btn">Перейти</Link>
        </div>
      </div>
    </div>
  );
};

PromotionBanner.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  destinationUrl: PropTypes.string.isRequired,
};

export default PromotionBanner;
