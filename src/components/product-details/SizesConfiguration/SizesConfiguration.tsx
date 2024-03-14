"use client";
import { ConfigurableOptions, ConfigurableOptionsValue } from "@/types";
import { FC, useContext, useEffect } from "react";
import { ConfigureParam } from "@/components";
import clsx from "clsx";
import { ProductDetailsContext } from "@/context";

export interface SizesConfigurationProps {
  configureOption: ConfigurableOptions;
  option: ConfigurableOptionsValue;
  handleConfiguration: (config: ConfigureParam) => void;
}

export const SizesConfiguration: FC<SizesConfigurationProps> = ({
  configureOption,
  option,
  handleConfiguration,
}) => {
  const { configuration } = useContext(ProductDetailsContext);

  useEffect(() => {
    if (configureOption) {
      handleConfiguration({
        key: configureOption?.attribute_code,
        value: configureOption?.default_option_value,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configureOption]);

  return (
    <button
      className={clsx(
        `btn btn-primary-500 hover:text-white hover:bg-primary-500`,
        [
          {
            "bg-primary-500 text-white": configuration?.size === option?.uid,
          },
        ],
      )}
      onClick={() =>
        handleConfiguration({
          key: configureOption?.attribute_code,
          value: option?.uid,
        })
      }
    >
      {option.label}
    </button>
  );
};
