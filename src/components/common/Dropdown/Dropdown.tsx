"use client";
import { FC } from "react";
import BaseDropdown, { Option, ReactDropdownProps } from "react-dropdown";
import "react-dropdown/style.css";
import { Controller, FieldError, useFormContext } from "react-hook-form";

export interface DropdownProps extends ReactDropdownProps {
  name: string;
  handleOnChange?: ((arg: Option) => void) | undefined;
}

export const Dropdown: FC<DropdownProps> = (props) => {
  const { name, value, handleOnChange, ...rest } = props;
  const context = useFormContext();

  if (context) {
    const {
      control,
      formState: { errors },
    } = context;

    return (
      name && (
        <div className="flex flex-col">
          <Controller
            key={`${name}-select`}
            control={control}
            defaultValue={value}
            render={({ field: { onChange, value } }) => (
              <BaseDropdown
                onChange={(value) => {
                  handleOnChange && handleOnChange(value);
                  onChange(value.value);
                }}
                value={value}
                {...rest}
              />
            )}
            name={name}
          />
          {errors[name] && (
            <span className="text-[#ff0000] py-1 first-letter:uppercase block">
              {(errors[name] as FieldError)?.message}
            </span>
          )}
        </div>
      )
    );
  }

  return <BaseDropdown {...props} />;
};
