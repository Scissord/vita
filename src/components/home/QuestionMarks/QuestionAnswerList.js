// QuestionAnswerList.js
import React from 'react';
import { useData } from './DataContext';
import QuestionAnswerComponent from './QuestionAnswerComponent';

const QuestionAnswerList = () => {
  const { questionsAndAnswers } = useData();

  return (
    <div className="max-w-2xl mx-auto mb-20 " style={{ paddingBottom: '3rem' }}>
      {questionsAndAnswers.map((qa, index) => (
        <QuestionAnswerComponent 
          key={index}
          question={qa.question} 
          answer={qa.answer}
        />
      ))}
    </div>
  );
};

export default QuestionAnswerList;
