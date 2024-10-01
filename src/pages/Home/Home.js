import React from "react";
import Banner from "../../components/Banner/Banner";
import BannerBottom from "../../components/Banner/BannerBottom";
import BestSellers from "../../components/home/BestSellers/BestSellers";
import NewArrivals from "../../components/home/NewArrivals/NewArrivals";
import Sale from "../../components/home/Sale/Sale";
import YearProduct from "../../components/home/YearProduct/YearProduct";
import { FaShoppingCart } from "react-icons/fa";
import SpecialCase from "../../components/SpecialCase/SpecialCase";
import { DataProvider } from '../../components/home/QuestionMarks/DataContext';
import QuestionAnswerList from '../../components/home/QuestionMarks/QuestionAnswerList';
import AboutUsSection from '../../components/home/AboutUs/weCertificated';
import Review from "../../components/home/Review/Review";
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="relative w-full ">
      <Banner />
      <BannerBottom />
       <div className="mx-auto flex justify-center mt-10 ">
            <Link to="/shop">
  <button className="bg-[#077931] text-white font-bold py-4 px-4 rounded relative overflow-hidden group">
    <span className="block text-white">Перейти в каталог</span>
    <span className="absolute top-0 left-0 w-full h-full bg-green-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-white">Перейти в каталог</span>
  </button>
</Link>
</div>
      <div className="max-w-container mx-auto px-4">
      <h1 className="mx-auto my-5 md:m-10 text-xl font-bodyFont"> <span className="font-bold">Vita-Balance</span> - это инновационный интернет магазин по продаже препаратов.Все препараты сертифицированы и состоят только из натуральных компонентов. Уже более 100 000 Казахстанцев получили результат, присоединись к нам. </h1>
        <Sale />
        <AboutUsSection/>
        <br/>
        <NewArrivals />
        <BestSellers />
          <DataProvider>
         <h1 className="text-center pt-10 text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl mb-8 ">FAQ - Часто задаваемые вопросы</h1>
      <QuestionAnswerList />
       </DataProvider>
       <Review/>
        <YearProduct/>
     
      

        {/* <SpecialOffers /> */}
    
      </div>

  
  
    </div>
  );
};

export default Home;
