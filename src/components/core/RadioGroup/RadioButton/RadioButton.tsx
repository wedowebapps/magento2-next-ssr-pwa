"use client";
import { FC, ReactNode } from "react";
import { WithRequired } from "@/types";
import { FieldError, useFormContext } from "react-hook-form";

export interface RadioButtonProps
  extends WithRequired<
    Omit<React.HTMLProps<HTMLInputElement>, "label">,
    "name"
  > {
  label: string | ReactNode;
  radioContainer?: string;
  isShowError?: boolean;
}

export const RadioButton: FC<RadioButtonProps> = (props) => {
  const {
    name,
    label,
    value,
    id,
    radioContainer,
    isShowError = true,
    onChange,
    ...rest
  } = props;
  const context = useFormContext();

  if (context) {
    const {
      register,
      formState: { errors },
    } = context;

    return (
      <div className={`flex flex-col ${radioContainer}`}>
        <div className="flex gap-2 ">
          <input
            id={id}
            type="radio"
            value={value}
            {...register(name)}
            {...rest}
            onChange={(value) => {
              register(name).onChange(value);
              onChange && onChange(value);
            }}
            className="radio"
          />
          {label && <label htmlFor={id}>{label}</label>}
        </div>

        {isShowError && errors[name] && (
          <span className="text-[#ff0000] py-1 tracking-normal first-letter:uppercase">
            {(errors[name] as FieldError)?.message}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex gap-4 ${radioContainer}`}>
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        className="radio"
        onChange={onChange}
        {...rest}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
};
