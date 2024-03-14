"use client";
import { Dispatch, FC, SetStateAction } from "react";

export interface ProductCounterProps {
  productQty: number;
  setProductQty: Dispatch<SetStateAction<number>>;
}

export const ProductCounter: FC<ProductCounterProps> = ({
  productQty,
  setProductQty,
}) => {
  const handleDecrementProduct = () => {
    setProductQty((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleIncrementProduct = () => {
    setProductQty((prev) => prev + 1);
  };

  return (
    <div className="product-counter flex justify-center items-center border-[1px] border-neutral-400 px-1 rounded-lg">
      <button className="px-4 text-2xl" onClick={handleDecrementProduct}>
        -
      </button>
      <span className="text-lg">{productQty}</span>
      <button className="px-4 text-2xl" onClick={handleIncrementProduct}>
        +
      </button>
    </div>
  );
};
