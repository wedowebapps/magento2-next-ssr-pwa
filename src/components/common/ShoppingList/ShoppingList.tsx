import { ShoppingItem, Typography } from "@/components";
import { useCartContext } from "@/context";
import { FC } from "react";

export interface ShoppingListProps {}

export const ShoppingList: FC<ShoppingListProps> = () => {
  const { cartDetails } = useCartContext();
  return (
    <div className="card bg-base-100 shadow-[0_0px_40px_-22px_rgba(0,0,0,0.3)]">
      <div className="card-body">
        <div className="flex flex-col gap-8">
          {cartDetails?.items.map((item, index) => (
            <ShoppingItem key={index} cartItem={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
