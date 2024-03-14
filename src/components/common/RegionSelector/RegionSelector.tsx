"use client";
import { Dispatch, FC, SetStateAction, useEffect, useMemo } from "react";
import { Dropdown } from "@/components";
import { Option } from "react-dropdown";
import { useQuery } from "@apollo/client";
import { RegionListItem } from "@/types";
import { Queries } from "@/utils/graphql";

export interface RegionSelectorProps {
  name: string;
  selected: Option;
  country: Option;
  setSelected: Dispatch<SetStateAction<Option | undefined>>;
}

export const RegionSelector: FC<RegionSelectorProps> = (props) => {
  const { name, selected, country, setSelected } = props;
  const { GET_REGIONS } = Queries;

  const { data: regions } = useQuery(GET_REGIONS, {
    variables: {
      countryCode: country?.value,
    },
  });

  const availableRegion: Option[] = useMemo(
    () =>
      regions?.country?.available_regions?.map((x: RegionListItem) => ({
        label: x.name,
        value: x.code,
      })),
    [regions?.country?.available_regions],
  );

  useEffect(() => {
    setSelected(
      Array.isArray(availableRegion) ? availableRegion[0] : undefined,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableRegion]);

  return (
    <Dropdown
      key={`${name}-select`}
      name={name}
      options={availableRegion?.length ? availableRegion : []}
      handleOnChange={(value) => setSelected(value)}
      value={selected}
    />
  );
};
