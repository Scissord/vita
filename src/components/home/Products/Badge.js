import React, { useState, useEffect } from "react";

const Badge = ({ imgSrc }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    setShowTooltip(!showTooltip); // Переключаем состояние показа подсказки
  };

  useEffect(() => {
    let timer;
    if (showTooltip) {
      timer = setTimeout(() => {
        setShowTooltip(false); // Закрываем подсказку через 3 секунды
      }, 3000);
    }
    return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента или при изменении showTooltip
  }, [showTooltip]);

  return (
    <div className="relative w-[30px] h-[40px] text-white flex items-center text-base font-semibold duration-300 cursor-pointer" onClick={handleClick}>
      <img src={imgSrc} alt="Доступен в кредит" title="Доступен в кредит" />
      {showTooltip && (
        <div className="absolute w-[190px] top-[4px] left-full ml-2 bg-[#929292] text-white px-2 py-1 rounded opacity-100 transition-opacity duration-300 pointer-events-none">
          Доступен в кредит
        </div>
      )}
    </div>
  );
};

export default Badge;
