import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";
import { Link } from "react-router-dom";

const FooterBottom = () => {
  return (
    <div className="w-full bg-[#F5F5F3] group">
      <div className="max-w-container mx-auto border-t-[1px] pt-10 pb-20">
        <p className="text-titleFont font-normal text-center md:items-center justify-center text-lightText duration-200 text-sm">
          <span className="text-md mr-[1px] mt-[2px] items-center justify-center md:mt-0 text-center flex ">
            {/* Убрал класс hidden */}
            <AiOutlineCopyright />
            VitaBalance
          </span>
        </p>
        <br/>
        <p className="text-titleFont font-normal text-center flex md:items-center justify-center text-lightText duration-200 text-sm">
          <Link to="/privacy-policy" className="text-md mr-[1px] mt-[2px] md:mt-0 text-center md:inline-flex items-center">
            {/* Убрал класс hidden */}
            Политика Конфиденциальности
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
