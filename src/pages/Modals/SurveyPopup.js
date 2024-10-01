import React, { useState, useEffect } from 'react';
import { questionMark } from '../../assets/images';
import { Link } from 'react-router-dom';
const SurveyPopup = ({ onClose }) => {
  // Создаем состояние для отслеживания видимости всплывающего окна
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Показываем всплывающее окно через 5 секунд после монтирования компонента
    const timer = setTimeout(() => setIsVisible(true), 5000);
    return () => clearTimeout(timer); // Очищаем таймер, если компонент будет размонтирован
  }, []);

  // Если всплывающее окно не видно, ничего не рендерим
  if (!isVisible) return null;

  // Функция для закрытия всплывающего окна
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Это элемент-заполнитель для центрирования модального содержимого вертикально и горизонтально */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Модальное окно */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <img src={questionMark} alt='questionMark' className=' mx-auto' style={{ width: '50%' }}/>
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                 Пройдите онлайн опрос и узнайте есть ли у вас проблемы!
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Хотите пройти опрос и узнать больше о своём здоровье?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
           <Link to='/oprosnik'>
           <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleClose}>
              Пройти опрос
            </button>
           </Link>
            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" onClick={handleClose}>
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyPopup;