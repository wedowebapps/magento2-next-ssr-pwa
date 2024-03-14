import { FC, ReactNode } from "react";

export interface AccordionProps {
  defaultChecked?: boolean;
  title: ReactNode;
  children: ReactNode;
  name: string;
}

export const Accordion: FC<AccordionProps> = ({
  children,
  defaultChecked = false,
  title,
  name,
}) => {
  return (
    <div className="collapse collapse-arrow bg-base-200 w-full">
      <input type="radio" name={name} defaultChecked={defaultChecked} />
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};
