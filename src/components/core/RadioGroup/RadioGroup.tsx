"use client";
import { FC, ReactNode, useState } from "react";
import { FieldError, useFormContext, get } from "react-hook-form";
import { RadioButton } from ".";

export interface RadioGroupProps {
  items: {
    label: string | ReactNode;
    value: string | number;
  }[];
  name: string;
  className?: string;
  label?: React.ReactNode;
  radioWrapper?: string;
  radioContainer?: string;
  onChange?: (value: any) => void;
  defaultValue?: any;
}

export const RadioGroup: FC<RadioGroupProps> = (props) => {
  const {
    className,
    items,
    name,
    label,
    onChange,
    radioWrapper,
    radioContainer,
    defaultValue,
  } = props;

  const [selected, setSelected] = useState(defaultValue);

  const context = useFormContext();

  if (context) {
    const {
      formState: { errors },
      register,
      clearErrors,
    } = context;

    const errorMessage = (get(errors, name) as FieldError)?.message;

    return (
      <div className={`flex ${radioWrapper}`}>
        {label && label}
        <div className="flex flex-col gap-2">
          <div className={`${className}`}>
            {items.map((item, i) => (
              <RadioButton
                checked={selected && item.value == selected}
                isShowError={false}
                name={name}
                value={item.value}
                label={item.label}
                key={i}
                id={`${item.value}-${name}-id`}
                radioContainer={radioContainer}
                onChange={(value: any) => {
                  setSelected(value.target.value);
                  register(name).onChange(value);
                  onChange && onChange(value.target.value);
                  clearErrors(name);
                }}
              />
            ))}
          </div>
          {errorMessage && (
            <span className="text-[#ff0000] py-1 first-letter:uppercase block">
              {errorMessage}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${radioWrapper}`}>
      {label && label}
      <div className="flex flex-col gap-2">
        <div className={`${className}`}>
          {items.map((item, i) => (
            <RadioButton
              checked={selected && item.value == selected}
              isShowError={false}
              name={name}
              value={item.value}
              label={item.label}
              key={i}
              id={`${item.value}-${name}-id`}
              radioContainer={radioContainer}
              onChange={(value: any) => {
                setSelected(value.target.value);
                onChange && onChange(value.target.value);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
