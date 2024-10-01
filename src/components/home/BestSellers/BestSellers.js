import React from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  bestSellerOne,
  bestSellerTwo,
  bestSellerThree,
  bestSellerFour,
} from "../../../assets/images/index";

const BestSellers = () => {
  return (
    <div className="w-full pb-20">
      <Heading heading="Хит продаж" />
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lgl:grid-cols-3 xl:grid-cols-4 gap-10">
        <Product
          _id="202690"
          img={bestSellerFour}
          productName="ManBalance"
          price="64800"
          color="Здоровье мужчин"
          badge={false}
        />
        <Product
          _id="202914"
          img={bestSellerTwo}
          productName="Flex-Balance"
          price="64800"
          color="Здоровье суставов"
          badge={false}
    
        />
        
      </div>
    </div>
  );
};

export default BestSellers;
