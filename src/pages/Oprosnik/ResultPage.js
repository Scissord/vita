import React, { useEffect, useState } from 'react';

const ResultsPage = ({ onProgressComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const nextProgress = prevProgress + 25;
        if (nextProgress >= 100) {
          clearInterval(timer);
          // Here we invoke onProgressComplete if it's a function
          if (typeof onProgressComplete === 'function') {
            onProgressComplete();
          }
          return 100;
        }
        return nextProgress;
      });
    }, 1000); // Adjust the interval as needed

    return () => clearInterval(timer);
  }, [onProgressComplete]); // Include onProgressComplete in the dependency array if it could change



  // Состояние для списка задач
  const tasks = [
    'Ваша ситуация',
    'Ваши цели',
    'Выбор наставника',
    'Лучшие материалы',  
  ];

  return (
    <div className="container mx-auto mt-10 p-4">
      {/* Круговой прогресс-бар */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 border-2 border-blue-600 rounded-full flex items-center justify-center">
          <div className="text-4xl">{progress}%</div>
        </div>
        <div className="mt-4 text-lg">Ваш план...</div>
      </div>

      {/* Список задач */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center border-b-2 last:border-b-0 py-2">
            <span className="text-green-500 mr-2">✓</span>
            <span className="flex-1">{task}</span>
            <br/>
            {index === tasks.length - 1 && progress < 100 && (
              
              <span className="text-gray-400">Загрузка...</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
