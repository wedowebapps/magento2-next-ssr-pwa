"use client";
import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { Dropdown } from "@/components";
import { Option } from "react-dropdown";
import { useQuery } from "@apollo/client";
import { CountryListItem } from "@/types";
import { Queries } from "@/utils/graphql";

export interface CountrySelectorProps {
  name: string;
  selected: Option;
  setSelected: Dispatch<SetStateAction<Option | undefined>>;
}

export const CountrySelector: FC<CountrySelectorProps> = (props) => {
  const { name, selected, setSelected } = props;
  const { GET_COUNTRIES } = Queries;
  const { data: countriesData } = useQuery(GET_COUNTRIES);

  const countriesList = useMemo(
    () =>
      countriesData?.countries?.length
        ? countriesData?.countries?.map((x: CountryListItem) => ({
            label: x.full_name_english,
            value: x.id,
          }))
        : [],
    [countriesData?.countries],
  );

  return (
    <Dropdown
      key={`${name}-select`}
      name={name}
      options={countriesList?.length ? countriesList : []}
      handleOnChange={(value) => setSelected(value)}
      value={selected}
    />
  );
};
