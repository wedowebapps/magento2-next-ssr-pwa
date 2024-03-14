import { WithRequired } from "@/types";
import { FC } from "react";
import { FieldError, useFormContext } from "react-hook-form";

export interface CheckboxProps
  extends WithRequired<
    Omit<React.HTMLProps<HTMLInputElement>, "label">,
    "name"
  > {
  label?: React.ReactNode;
  disabled?: boolean;
}

export const Checkbox: FC<CheckboxProps> = ({
  className,
  name,
  label,
  disabled,
  onChange,
  ...rest
}) => {
  const context = useFormContext();

  if (context) {
    const {
      register,
      formState: { errors },
    } = context;

    return (
      <div className="flex flex-col">
        <div className="form-control">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              className={`checkbox ${className}`}
              type="checkbox"
              {...register(name)}
              {...rest}
              onChange={(value) => {
                register(name).onChange(value);
                onChange && onChange(value);
              }}
              disabled={disabled}
            />
            {label && <span className="label-text">{label}</span>}
          </label>
        </div>

        {errors[name] && (
          <span className="first-letter:uppercase">
            {(errors[name] as FieldError)?.message}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="form-control">
      <label className="cursor-pointer flex items-center gap-2">
        <input
          type="checkbox"
          className={`checkbox ${className}`}
          onChange={onChange}
          {...rest}
        />
        {label && <span className="label-text">{label}</span>}
      </label>
    </div>
  );
};
