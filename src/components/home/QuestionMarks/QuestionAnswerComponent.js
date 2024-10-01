import React, { useState } from 'react';

const QuestionAnswerComponent = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50 sm:rounded-lg">
      <button type="button" className="flex items-center justify-between w-full px-4 py-5 sm:p-6 focus:outline-none" onClick={toggleDropdown}>
        <span className="flex text-lg font-semibold text-black sm:text-base">{question}</span>
        <svg className={`w-6 h-6 text-gray-400 ${isOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3.293 6.707a1 1 0 010-1.414l8-8a1 1 0 011.414 0l8 8a1 1 0 01-1.414 1.414L10 3.414l-7.293 7.293a1 1 0 01-1.414-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      <div className={`${isOpen ? 'block' : 'hidden'} pt-2 px-4 pb-5 sm:px-6 sm:pb-6 transition-all duration-200 border-t border-gray-200`}>
        <p className="text-sm sm:text-base">{answer}</p>
      </div>
    </div>
  );
};

export default QuestionAnswerComponent;
