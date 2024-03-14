import { ChangeEvent, FC } from "react";
import { CategoryRadio } from "@/components";
import { FilterSidebarContext } from "@/context";
import { Filter, ProductSidebarFilter } from "@/types";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";

export interface FilterSidebarProps {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  productSidebarFilter: ProductSidebarFilter;
  searchParams: any;
  handleRemoveFilter: (value?: any) => void;
}

export interface FilterComponent {
  data: Filter;
  handleChange: (e: any) => void;
}

const FilterComponent: FC<FilterComponent> = ({ data, handleChange }) => {
  const searchParams = useSearchParams();
  const price = searchParams.get("price");
  const color = searchParams.get("color");

  return (
    <div className="flex flex-col gap-2">
      <span className="font-semibold text-xl">{data.label}</span>
      <div
        className={clsx("flex flex-col gap-2", [
          {
            "grid grid-cols-2": data.label === "Color",
          },
        ])}
      >
        {data.options.map((option, index) => (
          <CategoryRadio
            key={index}
            onChange={handleChange}
            value={option.value}
            title={option.label}
            name={data.attribute_code}
            checked={option.value === price || option.value === color}
          />
        ))}
      </div>
    </div>
  );
};

export const FilterSidebar: FC<FilterSidebarProps> = ({
  handleChange,
  productSidebarFilter,
  searchParams,
  handleRemoveFilter,
}) => {
  const selectedFilter = Object.keys(searchParams).filter(
    (x) => x !== "page" && x !== "uid",
  );

  return (
    <FilterSidebarContext.Provider value={{ handleChange }}>
      <div className="card w-72 lg:80 bg-base-100 shadow-[0_0px_40px_-22px_rgba(0,0,0,0.3)]">
        <div className="card-body flex flex-col gap-6">
          {!!selectedFilter.length && (
            <div className="flex gap-2 flex-wrap">
              {selectedFilter.map((filter, index) => (
                <div
                  className="badge badge-ghost gap-2 badge-lg"
                  key={index}
                  role="button"
                  onClick={() => handleRemoveFilter(filter)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-4 h-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  {filter}
                </div>
              ))}
              <div
                className="badge badge-ghost gap-2 badge-lg"
                role="button"
                onClick={() => handleRemoveFilter()}
              >
                Clear All
              </div>
            </div>
          )}

          {productSidebarFilter.aggregations
            .filter((x) => x.attribute_code !== "category_uid")
            .map((filter, index) => (
              <FilterComponent
                handleChange={handleChange}
                data={filter}
                key={index}
              />
            ))}
        </div>
      </div>
    </FilterSidebarContext.Provider>
  );
};
