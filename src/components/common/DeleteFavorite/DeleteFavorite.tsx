import { DeleteIcon } from "@/components";
import { useWishlist } from "@/hooks";
import { WishlistItemV2 } from "@/types";
import { FC } from "react";

export interface DeleteFavoriteProps {
  currentWishlistItem: WishlistItemV2 | undefined;
}

export const DeleteFavorite: FC<DeleteFavoriteProps> = ({
  currentWishlistItem,
}) => {
  const { removeFromWishlist, removeWishlistLoading, refetchWishList } =
    useWishlist();

  const handleRemoveProduct = async (currentWishlistItem: WishlistItemV2) => {
    await removeFromWishlist(currentWishlistItem?.id);
    await refetchWishList();
  };

  return (
    <div
      className="text-transparent bg-primary-500 absolute z-10 rounded-full p-1 top-4 right-4 cursor-pointer"
      role="button"
      onClick={async () => await handleRemoveProduct(currentWishlistItem!)}
    >
      <div
        className={
          removeWishlistLoading ? "block loading text-white" : "hidden"
        }
      ></div>
      <DeleteIcon
        stroke="white"
        strokeWidth={2}
        className={!removeWishlistLoading ? "block" : "hidden"}
      />
    </div>
  );
};
