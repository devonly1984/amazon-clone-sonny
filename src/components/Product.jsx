import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from "react";
import Currency from "react-currency-formatter";
const MIN_RATING = 1;
const MAX_RATING = 5;
const Product = ({ id, title, price, description, category, image }) => {
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
  const [hasPrime] = useState(Math.random() < 0.5);
  return (
    <div className="">
      <p>{category}</p>
      <Image src={image} height={200} width={200} objectFit="contain" />
      <h4>{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <div key={i}>
              <StarIcon className="h-5" />
            </div>
          ))}
      </div>
      <div>
        <Currency quantity={price} currency="USD" />
      </div>
      {hasPrime && (
        <div>
          <img src="https://links.papareact.com/fdw" alt="Prime Delivery" />
          <p>FREE Next-day Delivery</p>
        </div>
      )}
      <button>Add to Basket</button>
      <p>{description}</p>
    </div>
  );
};

export default Product;
