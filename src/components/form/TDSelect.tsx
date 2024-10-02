import { Select, SelectItem } from "@nextui-org/react";

import { useFormContext } from "react-hook-form";

interface IProps {
  required?: boolean;
  name: string;
  label: string;
  options: { key: string; label: string }[];
  // type?: string;
  // variant?: "bordered" | "flat" | "faded" | "underlined";
}

const TDSelect = ({
  name,
  label,
  options,
  // type = "text",
  // variant = "bordered",
  // required = false,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  // console.log(errors);
  return (
    <Select label={label} {...register(name)} className="w-full" variant="bordered" isRequired={true}>
      {options?.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};

export default TDSelect;
