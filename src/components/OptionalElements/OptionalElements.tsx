import { SetStateAction } from "react";
import { TSortOption } from "../../types/types";

interface SearchBarProps {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  className?: string;
}

export const SearchBar = ({
  value,
  setValue,
  className = "",
}: SearchBarProps) => {
  return (
    <input
      className={className}
      placeholder="Movie name or Actor name"
      type="search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

interface CustomButtonProps {
  className?: string;
  onClickHandler: () => void;
  value: string;
}

export const CustomButton = ({
  className = "",
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
  className?: string;
}

export const SortOption = ({
  value,
  setValue,
  className = "",
}: SortOptionProps) => {
  return (
    <select
      className={className}
      value={value}
      onChange={(e) => setValue(e.target.value as TSortOption)}
    >
      <option value="default">Default</option>
      <option value="alphabetical">Alphabetical</option>
    </select>
  );
};
