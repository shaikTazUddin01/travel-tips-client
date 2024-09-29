import { Input } from "@nextui-org/input";
import React from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  name: string;
  label: string;
  type?: string;
  variant?: "bordered" | "flat" | "faded" | "underlined";
}

const TDInput = ({
  name,
  label,
  type = "text",
  variant = "bordered",
}: IProps) => {
  const { register } = useFormContext();
  return (
    <Input type={type} label={label} variant={variant} {...register(name)} />
  );
};

export default TDInput;
