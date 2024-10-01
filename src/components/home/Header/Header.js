import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";
import { logo, logoLight, vita , question} from "../../../assets/images";
import Image from "../../designLayouts/Image";
import { navBarList } from "../../../constants";
import Flex from "../../designLayouts/Flex";
import PopupComponent from "../PopupComponent/PopupComponent";

const Header = () => {
    const [orderId, setOrderId] = useState("");
  const [showMenu, setShowMenu] = useState(window.innerWidth >= 667);
  const [sidenav, setSidenav] = useState(false);
  const location = useLocation();
   const [isOpen, setIsOpen] = useState(false);
    const [deliveryInfo, setDeliveryInfo] = useState(null); 
  
   useEffect(() => {
    // Вызов при монтировании компонента
    responsiveMenu();
    // Добавление обработчика событий
    window.addEventListener("resize", responsiveMenu);

    // Cleanup
    return () => {
      window.removeEventListener("resize", responsiveMenu);
    };
  }, []);
  
   const responsiveMenu = () => {
    setShowMenu(window.innerWidth >= 667);
  };

  const openPopup = () => {
    setIsOpen(true);
  };
  const closePopup = () => {
    setIsOpen(false);
  };

  const handleCheckOrder = async () => {
    try {
        const response = await fetch('https://crmdeo.pw:5052/status_info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId }),
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
            
                setDeliveryInfo(data.info);
            } else {
                console.error('Ошибка :', data.error);
            }
        } else {
            console.error('Ошибка');
        }
    } catch (error) {
        console.error(error);
    }
};


const renderDeliveryStatus = () => {
  if (deliveryInfo) {
    const { method, details } = deliveryInfo;
    switch (method) {
      case 1:
        return (
          <p>
            Ваш заказ придет курьером в {details} числа
          </p>
        );
      case 2:
        return (
          <a href={`https://post.kz/services/postal/${details}`} target="_blank" rel="noreferrer">
            Перейти на страницу отслеживания почты
          </a>
        );
      default:
        return <p>Ваш заказ в обработке</p>;
    }
  }
  return null;
};

  return (
    <div className="w-full h-20 bg-white sticky top-0 z-50 border-b-[1px] border-b-gray-200">
      <nav className="h-full px-4 max-w-container mx-auto relative">
        <Flex className="flex items-center justify-between h-full">
          <Link to="/">
            <div>
              <Image className=" object-cover" style = {{width: '30%'}} imgSrc={vita}  />
            </div>
          </Link>
          
          <div className="md:flex">
            {showMenu && (
              <motion.ul
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center w-auto z-50 p-0 gap-2"
              >
                {navBarList.map(({ _id, title, link }) => (
                  <NavLink
                    key={_id}
                    style={{ width: '160px' }}
                    className="flex font-normal hover:font-bold h-6 justify-center items-center px-12 text-base text-[#767676] hover:underline underline-offset-[4px] decoration-[1px] hover:text-[#262626] md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                    to={link}
                    state={{ data: location.pathname.split("/")[1] }}
                  >
                    <li style={{width: '50px'}}>{title}</li>
                  </NavLink>
                ))}
              </motion.ul>
            )}
            
             <div className="flex justify-around w-full">
            <button onClick={openPopup} className="bg-[#33475b] text-sm text-white transition duration-300 ease-in-out p-1 rounded mr-5" style={{ lineHeight: '1' }}>
                  Статус <br/> заказа
            </button>
            <Link to="/oprosnik">
            <button className="bg-[#f7e15f] text-white transition duration-300 ease-in-out rounded-[22px] mr-5 w-[43px]" style={{ lineHeight: '2' }}>
            <Image className="object-cover " imgSrc={question}  /> 
            </button>
            </Link>
            
            {/*sidenav && (
              <div className="fixed top-0 left-0 w-full h-screen bg-black text-gray-200 bg-opacity-80 z-50">
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-[80%] h-full relative"
                >
                  <div className="w-full h-full bg-primeColor p-6">
                    <img
                      className="w-28 mb-6"
                      src={logo}
                      alt="logoLight"
                    />
                    
                    <ul className="text-gray-200 flex flex-col gap-2 md:hidden">
                      {navBarList.map((item) => (
                        <li
                          className="font-normal hover:font-bold items-center text-sm text-gray-200 hover:underline underline-offset-[4px] decoration-[1px] hover:text-white md:border-r-[2px] border-r-gray-300 hoverEffect last:border-r-0"
                          key={item._id}
                        >
                          <NavLink
                            to={item.link}
                            state={{ data: location.pathname.split("/")[1] }}
                            onClick={() => setSidenav(false)}
                          >
                            {item.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <span
                    onClick={() => setSidenav(false)}
                    className="w-8 h-8 border-[1px] border-gray-300 absolute top-2 -right-10 text-gray-300 text-2xl flex justify-center items-center cursor-pointer hover:border-red-500 hover:text-red-500 duration-300">
                    <MdClose />
                  </span>
                </motion.div>
              </div>
            )*/}
            
            {/* <HiMenuAlt2
              onClick={toggleSidenav}
              className="inline-block md:hidden cursor-pointer w-8 h-6 absolute top-6 right-4"
            />*/}
            
             {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                   
                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900" id="modal-headline">
                     Введите ID заказа
                    </h3>

                    <div className="mt-2 flex w-full relative">
                    <input
                      onChange={(e) => setOrderId(e.target.value)}
                      inputMode="numeric"
                      type="text"
                      className="block p-5 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Введите id заказа"
                    />
                  <button onClick={handleCheckOrder} className="ml-5 bg-green-100 p-1 rounded hover:text-white hover:bg-black transition duration-300 ease-in-out">Проверить</button>
                  </div>
                  <p>{renderDeliveryStatus()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={closePopup} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
       <PopupComponent/>
          </div>
          </div>
        </Flex>
      </nav>
    </div>
  );
};

export default Header;
