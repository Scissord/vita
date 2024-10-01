import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import FooterListTitle from "./FooterListTitle";
import { paymentCard } from "../../../assets/images";
import { Link } from "react-router-dom";
import Image from "../../designLayouts/Image";


const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };
  return (
    <div className="w-full  py-20 ">
      <div className="max-w-container mx-auto grid grid-cols-1 md:grid-cols-2  xl:grid-cols-6 px-4 gap-10">
        <div className="col-span-2">
          <FooterListTitle title=" Vita-Balance" />
          <div className="flex flex-col gap-6">
            <p className="text-base w-full xl:w-[80%]">
             Мы являемся торговой маркой по производству препаратов для поддержания организма. Наша история началась в 2023 году, когда мы впервые открылись для мира. С тех пор мы ставим перед собой цель помогать людям в укреплении и поддержании своего здоровья, предлагая качественные и эффективные продукты.
            </p>
            
            <ul className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/vitabalance1/"
                target="_blank"
                rel="noreferrer"
              >
                <li className="w-7 h-7 bg-primeColor text-gray-100 hover:text-white cursor-pointer text-lg rounded-full flex justify-center items-center hover:bg-black duration-300">
                  <FaInstagram />
                </li>
              </a>
             
            
            </ul>
            
          </div>
        </div>
        <div className="col-span-2">
          <FooterListTitle title="Магазин" />
          <Link to="/shop">
          <ul className="flex flex-col gap-2">
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Средства для мужчин
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Средства для женщин
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Средства от алкозависимости
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
              Средства от лишнего веса
            </li>
            <li className="font-titleFont text-base text-lightText hover:text-black hover:underline decoration-[1px] decoration-gray-500 underline-offset-2 cursor-pointer duration-300">
             Средства от болей в суставах
            </li>
          </ul>
          </Link>
        </div>
        <div>
          <FooterListTitle title='ТОО "Vita Balance"' />
          <ul className="flex flex-col gap-2">
            <li className="font-titleFont text-base text-lightText decoration-gray-500 underline-offset-2">
                Адрес: Казахстан, г. Астана, проспект Мангилик Ел, здание 33
            </li>
            <li className="font-titleFont text-base text-lightText decoration-gray-500 underline-offset-2">
                E-mail: info@vita-balance.kz
            </li>
            <li className="font-titleFont text-base text-lightText decoration-gray-500 underline-offset-2">
                БИН 240240005135
            </li>
          </ul>
          
        </div>
        <div className="col-span-2 flex flex-col items-center w-full px-4">
          {/* <FooterListTitle title="Subscribe to our newsletter." /> */}
          {/* <div className="w-full">
            <p className="text-center mb-4">
              A at pellentesque et mattis porta enim elementum.
            </p>
            {subscription ? (
              <motion.p
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full text-center text-base font-titleFont font-semibold text-green-600"
              >
                Subscribed Successfully !
              </motion.p>
            ) : (
              <div className="w-full flex-col xl:flex-row flex justify-between items-center gap-4">
                <div className="flex flex-col w-full">
                  <input
                    onChange={(e) => setEmailInfo(e.target.value)}
                    value={emailInfo}
                    className="w-full h-12 border-b border-gray-400 bg-transparent px-4 text-primeColor text-lg placeholder:text-base outline-none"
                    type="text"
                    placeholder="Insert your email ...*"
                  />
                  {errMsg && (
                    <p className="text-red-600 text-sm font-semibold font-titleFont text-center animate-bounce mt-2">
                      {errMsg}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscription}
                  className="bg-white text-lightText w-[30%] h-10 hover:bg-black hover:text-white duration-300 text-base tracking-wide"
                >
                  Subscribe
                </button>
              </div>
            )}

            <Image
              className={`w-[80%] lg:w-[60%] mx-auto ${
                subscription ? "mt-2" : "mt-6"
              }`}
              imgSrc={paymentCard}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
