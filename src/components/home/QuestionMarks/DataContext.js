// DataContext.js
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([
    { question: "Какие преимущества предлагаемые вашими препаратами для улучшения здоровья?"
    , answer: "Наши препараты предназначены для поддержания и улучшения общего состояния здоровья. Они содержат уникальные компоненты, способствующие укреплению иммунной системы, повышению энергии и выносливости, а также улучшению функций органов и систем организма." },
    { question: "Как долго занимает увидеть результаты от ваших препаратов?",
    answer: "Время, необходимое для достижения заметных результатов, может варьироваться в зависимости от индивидуальных характеристик организма. Однако многие наши клиенты сообщают о заметных изменениях в своем самочувствии уже через несколько недель регулярного применения наших продуктов." },
      { question: "Есть ли у ваших препаратов побочные эффекты?",
    answer: "Мы придерживаемся высоких стандартов качества и безопасности при разработке наших препаратов. Большинство из них имеют естественное происхождение и хорошо переносимы организмом. Однако перед началом приема рекомендуется проконсультироваться с врачом, особенно если у вас есть какие-либо медицинские проблемы или вы принимаете другие лекарства." },
      { question: "Как правильно принимать ваши препараты для максимальной эффективности?",
    answer: "Рекомендации по дозировке и режиму приема указаны на упаковке каждого препарата. Обычно наши препараты рекомендуется принимать в соответствии с указаниями на упаковке, предпочтительно во время приема пищи. Это помогает максимально усвоить полезные вещества." }
    // Добавьте другие вопросы и ответы по мере необходимости
  ]);

  return (
    <DataContext.Provider value={{ questionsAndAnswers, setQuestionsAndAnswers }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
