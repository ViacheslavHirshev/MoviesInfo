import { ReactNode, useState } from "react";

export const Options = ({ children }: { children: ReactNode }) => {
  return <div className="options">{children}</div>;
};

export const SearchBar = () => {
  const [value, setValue] = useState("");

  return (
    <input
      className="searchbar"
      type="search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

interface CustomButtonProps {
  className: string;
  onClickHandler: () => void;
  value: string;
}
export const CustomButton = ({
  className,
  onClickHandler,
  value,
}: CustomButtonProps) => {
  return (
    <button className={className} onClick={onClickHandler}>
      {value}
    </button>
  );
};
