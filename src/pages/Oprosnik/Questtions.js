import React, { useState } from 'react';
import { vita , questionMark } from '../../assets/images/index';

const Question = ({ questionText, options, onAnswer, onBack, totalQuestions, currentQuestionIndex , isLastQuestion }) => {
  // Вычисление прогресса в процентах
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Состояние для отслеживания выбранного варианта ответа
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  // Функция для обработки выбора варианта ответа
  const handleOptionClick = (index) => {
    setSelectedOptionIndex(index); // Обновляем состояние выбранного варианта ответа
  };

  // Функция для обработки нажатия на кнопку "Продолжить"
  const handleContinueClick = () => {
    if (selectedOptionIndex !== null) {
      onAnswer(selectedOptionIndex); // Вызываем функцию onAnswer с индексом выбранного варианта ответа
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff]">
      
      <div className="w-full bg-white px-6 py-4">
        {/* Progress Bar */}
        <img src={vita} alt="Logo" className="h-10 mx-auto mb-[21px]" />  
        <div className="w-full bg-gray-200 h-2 rounded-full">
      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
        {/* Header with back button and logo */}
        <div className="flex items-center py-2 mt-[10px]">
          <button onClick={onBack} className="hover:text-black">
            <span className="h-6 w-6 text-gray-600">← Вернуться</span>    
          </button>
          {/* Replace with your actual logo */}
          
        </div>
        {/* Question Text */}
        <h1 className="text-xl font-semibold text-center">{questionText}</h1>
      </div>
    <img src={questionMark} className='w-[30%] mx-auto' alt='question'/>
       {/* Options List */}
       <div className="w-full  p-4">
        <ul>
          {options.map((option, index) => (
            <li 
              key={index} 
              onClick={() => handleOptionClick(index)}
              className={`w-full mb-4 px-6 py-4 border-2 rounded-lg text-lg cursor-pointer ${
                index === selectedOptionIndex ? 'bg-blue-600 text-white' : 'border-gray-300'
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer with Continue button */}
      <div className="w-full p-4 bg-white shadow-t">
        <button
          onClick={handleContinueClick}
          className="w-full px-6 py-3 bg-black text-white text-lg rounded shadow hover:bg-gray-900"
        >
           {isLastQuestion ? 'Увидеть результаты' : 'Продолжить →'}
        </button>        
      </div>
    </div>
  );
};

export default Question;