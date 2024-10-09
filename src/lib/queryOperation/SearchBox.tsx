import { SearchIcon } from "@/src/assets/icons";
import useDebounce from "@/src/hooks/useDebounce";
import { setSearch } from "@/src/redux/features/post/postSlice";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const SearchBox = () => {
  const [searchText, setSearchText] = useState("");

  const debounce = useDebounce(searchText);
  const dispatch = useDispatch();

  // console.log(debounce);

  const handleSearch = (value:any) => {
    // console.log('value-->',value);
    setSearchText(value);
    // console.log("deo-->",debounce);
    // if (debounce) {
        dispatch(setSearch(value))
        // console.log(debounce);
    // }
  };
  return (
    <Input
      aria-label="Search"
      onValueChange={handleSearch}
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          A
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
};

export default SearchBox;
