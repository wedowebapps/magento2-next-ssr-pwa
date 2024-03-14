import { ConfigurableOptions } from "@/types";
import { FC, Fragment } from "react";
import {
  ColorConfiguration,
  ConfigureParam,
  SizesConfiguration,
} from "@/components";

export interface ConfigurationOptionProps {
  configureOption: ConfigurableOptions;
  handleConfiguration: (config: ConfigureParam) => void;
}

export const ConfigurationOption: FC<ConfigurationOptionProps> = ({
  configureOption,
  handleConfiguration,
}) => {
  return (
    <Fragment>
      <span className="font-semibold text-lg">{configureOption?.label}</span>
      <div className="flex gap-1 flex-wrap">
        {configureOption?.values?.map((option, index) => (
          <Fragment key={index}>
            {configureOption.attribute_code === "color" && (
              <ColorConfiguration
                configureOption={configureOption}
                option={option}
                handleConfiguration={handleConfiguration}
              />
            )}
            {configureOption.attribute_code === "size" && (
              <SizesConfiguration
                configureOption={configureOption}
                option={option}
                handleConfiguration={handleConfiguration}
              />
            )}
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
};
