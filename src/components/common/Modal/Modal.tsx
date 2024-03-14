import { FC, ReactNode } from "react";

export interface ModalProps {
  title?: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  align?: "top" | "right" | "bottom" | "left" | "middle";
  close: () => void;
}

export const Modal: FC<ModalProps> = ({
  children,
  title,
  isOpen,
  align = "middle",
  close,
}) => {
  return (
    <dialog className={`modal modal-${align}`} open={isOpen}>
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={close}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">{title}</h3>
        {children}
      </div>
    </dialog>
  );
};
