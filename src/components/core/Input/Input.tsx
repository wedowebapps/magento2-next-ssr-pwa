"use client";
import { WithRequired } from "@/types";
import { convertCamelCaseToWords } from "@/utils/helper";
import { FC } from "react";
import { FieldError, get, useFormContext } from "react-hook-form";

export interface InputProps
  extends WithRequired<React.HTMLProps<HTMLInputElement>, "name"> {}

export const Input: FC<InputProps> = ({
  label,
  type = "text",
  className,
  name,
  ...rest
}) => {
  const context = useFormContext();
  if (context) {
    const {
      register,
      formState: { errors },
    } = context;

    const errorMessage = (get(errors, name) as FieldError)?.message;

    return (
      <label className="form-control">
        {label && (
          <div className="label">
            <span className="label-text">{label}</span>
          </div>
        )}

        <input
          type={type}
          className={`input input-bordered focus:outline-none ${className}`}
          {...register(name as string)}
          {...rest}
        />
        {errorMessage && (
          <span className="text-[#ff0000] py-1 first-letter:uppercase">
            {convertCamelCaseToWords(errorMessage! as string)}
          </span>
        )}
      </label>
    );
  }

  return (
    <label className="form-control">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}

      <input
        type={type}
        className={`input input-bordered focus:outline-none ${className}`}
        {...rest}
      />
    </label>
  );
};

export default Input;
