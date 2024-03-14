import { FC } from "react";

export interface CategoryRadioProps extends React.HTMLProps<HTMLInputElement> {}

export const CategoryRadio: FC<CategoryRadioProps> = ({
  title,
  className,
  ...rest
}) => {
  return (
    <div className="flex gap-2">
      <input type="radio" className={`radio w-6 h-6 ${className}`} {...rest} />
      <span>{title}</span>
    </div>
  );
};
