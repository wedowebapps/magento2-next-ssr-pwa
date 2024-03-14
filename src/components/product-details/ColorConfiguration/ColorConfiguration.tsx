"use client";
import { ConfigurableOptions, ConfigurableOptionsValue } from "@/types";
import { FC, useContext, useEffect } from "react";
import { ConfigureParam } from "@/components";
import clsx from "clsx";
import { ProductDetailsContext } from "@/context";

export interface ColorConfigurationProps {
  configureOption: ConfigurableOptions;
  option: ConfigurableOptionsValue;
  handleConfiguration: (config: ConfigureParam) => void;
}

export const ColorConfiguration: FC<ColorConfigurationProps> = ({
  configureOption,
  option,
  handleConfiguration,
}) => {
  useEffect(() => {
    if (configureOption) {
      handleConfiguration({
        key: configureOption?.attribute_code,
        value: configureOption?.default_option_value,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configureOption]);
  const { configuration } = useContext(ProductDetailsContext);

  return (
    <div
      className={clsx(
        `flex justify-center items-center rounded-full min-h-14 min-w-14`,
        [
          {
            "border-2 border-primary-500": configuration?.color === option?.uid,
          },
        ],
      )}
    >
      <button
        style={{ backgroundColor: option?.swatch_data?.value }}
        className={clsx(`btn rounded-full h-12 w-12`, [])}
        onClick={() =>
          handleConfiguration({
            key: configureOption?.attribute_code,
            value: option?.uid,
          })
        }
      ></button>
    </div>
  );
};
