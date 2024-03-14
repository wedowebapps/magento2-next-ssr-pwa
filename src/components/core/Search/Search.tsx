import { FC } from "react";

export interface SearchProps extends React.HTMLProps<HTMLInputElement> {}

export const Search: FC<SearchProps> = ({ ...rest }) => {
  return (
    <div className="flex border-2 border-neutral-400 rounded-full py-2 px-4 justify-between items-center">
      <input className=" w-full outline-none border-none" {...rest} />
      <button>
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
