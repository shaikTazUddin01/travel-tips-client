import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

import { sortIngOptions } from "@/src/constant/options";
import { setSorting } from "@/src/redux/features/post/postSlice";
import { useAppDispatch } from "@/src/redux/hooks";

const Sorting = () => {
    const dispatch=useAppDispatch()
  const handleSorting = (e:any) => {
    
    // console.log(e.target.value);
    dispatch(setSorting(e.target.value))
  };
  return (
    <form action="" className="mb-2 " >
      <Select className="full" label="find by React" variant="bordered" onChange={handleSorting}>
        {sortIngOptions.map((sortitem) => (
          <SelectItem key={sortitem.key} value={sortitem.key}>
            {sortitem.label}
          </SelectItem>
        ))}
      </Select>
    </form>
  );
};

export default Sorting;
