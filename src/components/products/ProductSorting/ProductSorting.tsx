import { Dropdown } from "@/components";
import { FC } from "react";

export interface ProductSortingProps {
  handleAddFilter: (value: any) => void;
}

export const ProductSorting: FC<ProductSortingProps> = ({
  handleAddFilter,
}) => {
  const options = [
    {
      value: JSON.stringify({ sortBy: "name", orderBy: "ASC" }),
      label: "Name A-Z",
    },
    {
      value: JSON.stringify({ sortBy: "name", orderBy: "DESC" }),
      label: "Name Z-A",
    },
    {
      value: JSON.stringify({ sortBy: "price", orderBy: "DESC" }),
      label: "price High-to-low",
    },
    {
      value: JSON.stringify({ sortBy: "price", orderBy: "ASC" }),
      label: "price low-to-high",
    },
    {
      value: JSON.stringify({ sortBy: "position", orderBy: "ASC" }),
      label: "popularity",
    },
  ];

  return (
    <Dropdown
      name="product-sorting"
      options={options}
      value={options[0]}
      onChange={(option) => {
        const selectedOption = JSON.parse(option.value);
        handleAddFilter({
          sortBy: selectedOption.sortBy,
          orderBy: selectedOption.orderBy,
        });
      }}
      className="min-w-40"
    />
  );
};
