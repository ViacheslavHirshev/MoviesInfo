import { SetStateAction } from "react";
import { TSortOption } from "../../types/types";

interface SearchBarProps {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
}
export const SearchBar = ({ value, setValue }: SearchBarProps) => {
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

interface SortOptionProps {
  value: TSortOption;
  setValue: React.Dispatch<SetStateAction<TSortOption>>;
}
export const SortOption = ({ value, setValue }: SortOptionProps) => {
  return (
    <select
      value={value}
      onChange={(e) => setValue(e.target.value as TSortOption)}
    >
      <option value="default">Default</option>
      <option value="alphabetical">Alphabetical</option>
    </select>
  );
};
