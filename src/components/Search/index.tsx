import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { observer } from "mobx-react-lite";
import { useFilterStore } from "@/stores/FilterStore";

export const Search: React.FC = observer(() => {
  const { searchValue, setSearchValue, setSelectedCategory } = useFilterStore();
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setInputValue(value);
    onSearch(value);
  };

  const onSearch = useCallback(
    debounce((value) => {
      setSelectedCategory(0);
      setSearchValue(value);
    }, 250),
    []
  );

  const onSearchClear = () => {
    setInputValue("");
    setSearchValue("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        id="search"
      >
        <g data-name="Layer 2">
          <path
            d="m20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"
            data-name="search"
          ></path>
        </g>
      </svg>
      <input
        className={styles.input}
        placeholder="Поиск"
        value={inputValue}
        ref={inputRef}
        onChange={onChangeInput}
      />
      {inputValue && (
        <svg
          className={styles.clearIcon}
          onClick={onSearchClear}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          id="close"
        >
          <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
        </svg>
      )}
    </div>
  );
});
