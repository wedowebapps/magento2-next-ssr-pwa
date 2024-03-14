import { Dispatch, FC, ReactNode, SetStateAction } from "react";

export interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: ReactNode;
}

export const Drawer: FC<DrawerProps> = ({
  children,
  isOpen,
  title,
  setIsOpen,
}) => {
  return (
    <main
      className={
        " fixed overflow-hidden z-40 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <div
        className={
          " w-screen max-w-md right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-md flex flex-col h-full">
          <header className="border-b">{title}</header>
          {children}
        </article>
      </div>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
};
