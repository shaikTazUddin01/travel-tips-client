/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";

import { setCategory } from "@/src/redux/features/post/postSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { categoryOptions } from "@/src/constant/categoryOptions";

const CategoryFilter = () => {
  const dispatch = useAppDispatch();
  const [selectedItem,setSelected]=useState("")

  const handleCategorySubmit = (item: string) => {
    setSelected(item)
    dispatch(setCategory(item));
  };
// console.log(selectedItem);
  return (
    <div className="border rounded-xl shadow-md min-h-[250px] px-3 py-3">
      <h1 className="text-lg">Trends for you</h1>
      {categoryOptions?.map((item, index) => {
        return (
          <div
            key={index}
            className={`cursor-pointer hover:bg-slate-100 p-1 hover:text-blue-800 ${item.key==selectedItem && "text-blue-800"}`}
            onClick={() => handleCategorySubmit(item?.key)}
          >
            # {item?.key}
          </div>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
