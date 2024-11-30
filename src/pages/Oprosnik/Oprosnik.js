import React, { useState } from 'react';
import { questionsForMans, questionsForWomans } from '../../constants/index';
import Question from './Questtions';
import { vita } from '../../assets/images/index';
import { Link } from 'react-router-dom';
import OprosForm from './OprosForm';
import ResultsPage from './ResultPage';
const OprosPage = () => {
  const [gender, setGender] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState({}); // Состояние для хранения ответов
  const [resultText, setResultText] = useState("");
  const [showResultsPage, setShowResultsPage] = useState(false);  
  const [, setProductIds] = useState([]);
  const [idsOfMostFrequentResults, setIdsOfMostFrequentResults] = useState([]);
  // const [] = useState([]);
    

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    const selectedQuestions = selectedGender === 'мужской' ? questionsForMans : questionsForWomans;
    setQuestions(selectedQuestions); // Установка списка вопросов
    setCurrentQuestionIndex(0); // Начало с первого вопроса
    setAnswers({}); // Сброс предыдущих ответов
  };
  

  const handleBack = () => {
    if (currentQuestionIndex === 0) {
      // Возвращаемся к начальному экрану
      setQuestions(null);
      setAnswers({});
      setGender('');
    } else {
      // Возвращаемся к предыдущему вопросу
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  


  const handleAnswer = (optionIndex) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestionIndex]: optionIndex,
    };
    setAnswers(updatedAnswers);
    
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setShowResultsPage(true); // Показываем промежуточную страницу с результатами
    }
  };

  const handleShowFinalResults = () => {
    setShowResultsPage(false); // Hide the intermediate results page
    setShowResults(true); // Show the final results
    calculateResult(); // Calculate the final results text
  };
  
  
  const resultsMapping = {
    '0': {text:'По результатам теста у вас развивается воспаление и отёчность тканей предстательной железы. Чтобы избежать серьёзных последствий, советуем незамедлительно начать курс лечения. Для более подробной консультации по телефону, оставьте заявку ниже.'
         , _id: ['212251'], name: 'LibidoFortis',},
    '1': {text:'По результатам теста у вас наблюдаются признаки хронического артроза, такие как боли в суставах и утренняя скованность. Чтобы предотвратить дальнейшее развитие заболевания и улучшить качество жизни, рекомендуем вам начать курс лечения как можно скорее. Для более подробной консультации по телефону, оставьте заявку ниже.'
     , _id: ['212256'], name: 'Flex-Balance',},
    '2': {text:'На основе ваших ответов в тесте стало ясно, что вы ищете эффективные способы для сжигания жира. Если вы готовы начать изменения уже сегодня, оставьте заявку, и наш консультант свяжется с вами для подбора индивидуального плана и ответит на все интересующие вопросы.' 
    , _id: ['212255'], name: 'BodyBalance',},
    '3': {text:'По результатам теста у вас развивается воспаление и отёчность тканей предстательной железы. Чтобы избежать серьёзных последствий, советуем незамедлительно начать курс лечения. Для более подробной консультации по телефону, оставьте заявку ниже.' 
    , _id: ['212257'], name: 'Manbalance',},
    '0,2': {text:'Ваши ответы подсказывают, что пора обратить внимание на продукцию, способствующую мужскому здоровью и сжиганию жира. Мы предлагаем продукты, которые помогут сохранить силу и форму. Чтобы получить персонализированный план и подбор средств, оставьте заявку, и мы свяжемся для детальной консультации.'
        },
    '0,3': {text:'По результатам теста у вас развивается воспаление и отёчность тканей предстательной железы. Чтобы избежать серьёзных последствий, советуем незамедлительно начать курс лечения. Для более подробной консультации по телефону, оставьте заявку ниже.',
     _id: ['212251','212257'], name: ['LibidoFortis','Manbalance']},
    '0,1': {text:'Результаты вашего теста указывают на необходимость ухода за суставами и поддержки мужского здоровья. Мы предлагаем ознакомиться с нашей мужской линией и средствами для суставов, которые помогут вам поддержать активность и благополучие. Заполните форму ниже, и наш консультант свяжется с вами для персонализированных рекомендаций.',
    _id: ['212251','212256'], name: ['LibidoFortis','Flex-Balance']},
    '1,2': {text:'По результатам теста у вас наблюдаются признаки хронического артроза и проблемы с лишним весом. Мы предлагаем продукты, которые помогут сохранить силу и форму. Чтобы получить персонализированный план и подбор средств, оставьте заявку, и мы свяжемся для детальной консультации.',
    _id: ['212256','212255'], name: ['Flex-Balance','Body-Balance']},
    '2,3': {text:'По результатам теста у вас развивается воспаление и отёчность тканей предстательной железы. Чтобы избежать серьёзных последствий, советуем незамедлительно начать курс лечения. Для более подробной консультации по телефону, оставьте заявку ниже.',
    _id: ['212255','212257'], name: ['BodyBalance','Manbalance']},
    '3,1': {text:'Результаты вашего теста указывают на необходимость ухода за суставами и поддержки мужского здоровья. Мы предлагаем ознакомиться с нашей мужской линией и средствами для суставов, которые помогут вам поддержать активность и благополучие. Заполните форму ниже, и наш консультант свяжется с вами для персонализированных рекомендаций.',
    _id: ['212257','212256'], name: ['Manbalance','Flex-Balance']},
  };
  const resultsMappingWomans = {
    '0': {text:'По результатам теста у вас наблюдаются признаки хронического артроза, такие как боли в суставах и утренняя скованность. Чтобы предотвратить дальнейшее развитие заболевания и улучшить качество жизни, рекомендуем вам начать курс лечения как можно скорее. Для более подробной консультации по телефону, оставьте заявку ниже.'
     , _id: ['212256'], name: 'Flex-Balance',},
    '1': {text:'На основе ваших ответов в тесте стало ясно, что вы ищете эффективные способы для сжигания жира. Если вы готовы начать изменения уже сегодня, оставьте заявку, и наш консультант свяжется с вами для подбора индивидуального плана и ответит на все интересующие вопросы.' 
    , _id: ['212255'], name: 'BodyBalance',}, 
    '2': {text:'На основе ваших ответов в тесте стало ясно, что вы ищете эффективные способы для сжигания жира. Если вы готовы начать изменения уже сегодня, оставьте заявку, и наш консультант свяжется с вами для подбора индивидуального плана и ответит на все интересующие вопросы.' 
    , _id: ['212255'], name: 'BodyBalance',},      
    '3': {text:'По результатам теста у вас наблюдаются признаки хронического артроза, такие как боли в суставах и утренняя скованность. Чтобы предотвратить дальнейшее развитие заболевания и улучшить качество жизни, рекомендуем вам начать курс лечения как можно скорее. Для более подробной консультации по телефону, оставьте заявку ниже.'
     , _id: ['212256'], name: 'Flex-Balance',},
    '0,1': {text:'По результатам теста у вас наблюдаются признаки хронического артроза и проблемы с лишним весом. Мы предлагаем продукты, которые помогут сохранить силу и форму. Чтобы получить персонализированный план и подбор средств, оставьте заявку, и мы свяжемся для детальной консультации.'
    , _id: ['212256' , '212255'], name: ['Flex-Balance' , 'BodyBalance'],},
    '1,2': {text:'По результатам теста у вас наблюдаются признаки хронического артроза и проблемы с лишним весом. Мы предлагаем продукты, которые помогут сохранить силу и форму. Чтобы получить персонализированный план и подбор средств, оставьте заявку, и мы свяжемся для детальной консультации.'
    , _id: ['212256' , '212255'], name: ['Flex-Balance' , 'BodyBalance'],},
    '2,3': {text:'По результатам теста у вас наблюдаются признаки хронического артроза и проблемы с лишним весом. Мы предлагаем продукты, которые помогут сохранить силу и форму. Чтобы получить персонализированный план и подбор средств, оставьте заявку, и мы свяжемся для детальной консультации.'
    , _id: ['212256' , '212255'], name: ['Flex-Balance' , 'BodyBalance'],},
    '3,1': {text:'По результатам теста у вас наблюдаются признаки хронического артроза и проблемы с лишним весом. Мы предлагаем продукты, которые помогут сохранить силу и форму. Чтобы получить персонализированный план и подбор средств, оставьте заявку, и мы свяжемся для детальной консультации.'
    , _id: ['212256' , '212255'], name: ['Flex-Balance' , 'BodyBalance'],},
    '0,2': {text:'По результатам теста у вас наблюдаются признаки хронического артроза и проблемы с лишним весом. Мы предлагаем продукты, которые помогут сохранить силу и форму. Чтобы получить персонализированный план и подбор средств, оставьте заявку, и мы свяжемся для детальной консультации.'
    , _id: ['212256' , '212255'], name: ['Flex-Balance' , 'BodyBalance'],},
    '0,3': {text:'По результатам теста у вас наблюдаются признаки хронического артроза и проблемы с лишним весом. Мы предлагаем продукты, которые помогут сохранить силу и форму. Чтобы получить персонализированный план и подбор средств, оставьте заявку, и мы свяжемся для детальной консультации.'
    , _id: ['212256' , '212255'], name: ['Flex-Balance' , 'BodyBalance'],},
  };









  const calculateResult = () => {
    // Подсчёт количества каждого выбранного индекса
    const counts = Object.values(answers).reduce((acc, index) => {
      acc[index] = (acc[index] || 0) + 1;
      return acc;
    }, {});
  
  
    // Находим максимальное количество выборов
  
    const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    // Собираем все индексы, у которых количество выборов равно максимальному
    const mostFrequentIndices = sortedCounts.slice(0, 2).map(item => item[0]);
  
    // Сортируем и превращаем в строку для создания ключа
    const resultKey = mostFrequentIndices.sort().join(',');
  
    // Выбираем нужный объект результатов
    const currentResultsMapping = gender === 'мужской' ? resultsMapping : resultsMappingWomans;
    
    // Получаем текст и ID результатов, используя созданный ключ
    const resultData = currentResultsMapping[resultKey] || {};
const { text, _id: ids } = resultData;
  
    // Обновляем состояние с текстом и ID
    if (text && ids) {
      setResultText(text);
      setProductIds(ids);
      // Показываем текст в UI
      return <div>{text}</div>;
    } else {
      console.log('Combination of indices not found in results mapping:', resultKey);
      // Fallback text, если результат не найден
      setResultText('Текст результата не найден.'); 
    }
  
    //  const key = mostFrequentIndices.join(', '); // Создание строки из массива
    console.log(`Индексы наиболее часто выбранных ответов: ${resultKey}`);
   
    const result = currentResultsMapping[resultKey];
    console.log(result);
    const formData = new FormData();
    
    result._id.forEach((productId, index) => {
     
      formData.append(`goods[${index}][goodID]`, productId);
      formData.append(`goods[${index}][quantity]`, 1); 
      formData.append(`goods[${index}][price]`, 1200);
    });
    
  
    
    

    setIdsOfMostFrequentResults(ids || []);
    localStorage.setItem('result', JSON.stringify(result));
  
    console.log(setResultText(resultKey.text))
  };
  
  
  
  return (
    <div className="flex flex-col items-center h-screen bg-[#fff] p-4 md:justify-center">
    {showResultsPage ? (
      <ResultsPage onProgressComplete={handleShowFinalResults} />
    ) : showResults ? (
      <div className='flex items-center flex-col'>
        
        <p className='text-[#201752] mx-auto text-center font-bold'>{resultText}</p>
        <div className='mt-20 mb-5'>

        <OprosForm idsOfMostFrequentResults={idsOfMostFrequentResults} />
        </div>
        <Link to="/">
            <button className='bg-[#201752d9] text-white p-2 rounded '>Вернуться на главную</button>
            
        </Link>    
       
      </div> // Здесь ваша логика отображения результатов
    ) : (!questions || (currentQuestionIndex === 0 && !gender)) ? (
        // Код для отображения начального экрана выбора пола
        <>
          <div className="text-center mb-4 max-w-3xl gap-4 max-w-xl shadow-lg shadow-[#b9b9b9] sm:rounded-lg p-4">
            
            <div className='mx-auto flex justify-center '>
            <img src={vita} alt='logo'/>
            </div>
            <h1 className="text-2xl text-gray-800 font-bold mb-2">Пройдите онлайн опрос и узнайте есть ли у вас проблемы</h1>
            <p className="text-gray-600">Этот опросник специально разработан, чтобы помочь вам установить, есть ли скрытые проблемы со здоровьем, на которые вы, возможно, не обращали внимания. Ответы на вопросы помогут нам определить потенциальные риски и предложить наилучшие способы поддержания и улучшения вашего здоровья. <br/>Пройдите этот опрос, чтобы понять, требуется ли вашему организму дополнительная поддержка или консультация со специалистом. </p>
            <h1 className='text-lg font-bold m-4'>Укажите свой пол прежде чем начать!</h1>
            <div className="flex justify-center">
            
            <button onClick={() => handleGenderSelect('мужской')} className="bg-[cadetblue] text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-1">Мужской</button>
            <button onClick={() => handleGenderSelect('женский')} className="bg-[cadetblue] text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow mx-1">Женский</button>
          </div>
          </div>
          
          
        </>
      ) : (
        // Код для отображения вопросов
        <div className="w-full max-w-lg">
          {questions && currentQuestionIndex < questions.length && (
            <Question
              key={questions[currentQuestionIndex].id}
              questionText={questions[currentQuestionIndex].questionText}
              options={questions[currentQuestionIndex].options}
              onAnswer={handleAnswer}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={questions.length}
              onBack={handleBack}
              isLastQuestion={currentQuestionIndex === questions.length - 1}
            />
          )}
        </div>
      )}
    </div>
  );
  
};

export default OprosPage;
