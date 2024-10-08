/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { setCategory } from "@/src/redux/features/post/postSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { categoryOptions } from "@/src/utils/categoryOptions";
import React from "react";

const PostCategories = () => {
  const dispatch = useAppDispatch();

  const handleCategorySubmit = (item: string) => {
    // console.log(item);
    dispatch(setCategory(item));
  };

  return (
    <div className="border rounded-xl shadow-md min-h-[250px] px-3 py-3">
      <h1 className="text-lg">Trends for you</h1>
      {categoryOptions?.map((item, index) => {
        return (
          <div
            key={index}
            className="cursor-pointer hover:bg-slate-100 p-1 hover:text-blue-800"
            onClick={() => handleCategorySubmit(item?.key)}
          >
            # {item?.key}
          </div>
        );
      })}
    </div>
  );
};

export default PostCategories;
