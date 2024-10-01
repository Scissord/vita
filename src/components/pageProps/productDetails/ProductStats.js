import React, { useEffect, useState } from 'react';


const StatCard = ({ number, title, description }) => {
  // Initial state is false and it changes to true to start the animation
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger the animation shortly after the component mounts
    const timeout = setTimeout(() => setAnimate(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  // Tailwind classes for animation
  const animationClasses = animate ? 'scale-100 opacity-100' : 'scale-0 opacity-0';

  return (
    <div className={`transition-transform duration-500 ease-in-out transform ${animationClasses} p-4 shadow-lg rounded-lg m-2 text-center`}>
      <div className="text-3xl font-bold text-[#33475b]">{number}</div>
      <div className="text-lg font-semibold">{title}</div>
      <div className="text-gray-600">{description}</div>
    </div>
  );
};

const StatsSection = () => {
  return (
      <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2  ">
     <StatCard
  number="99,8%"
  title="Здоровья"
  description="клиенты оценили эффективность препаратов."
/>
<StatCard
  number="9/10"
  title="Покупателей"
  description="возвращаются за повторными заказами."
/>
<StatCard
  number="70.000+"
  title="Отзывов"
  description="с благодарностью за качество и сервис."
/>
<StatCard
number="99.000+"
title="Довольных клиентов"
description="высоко оценили нашу продукцию."
/>


      </div>
    </div>
  );
};

export default StatsSection;
