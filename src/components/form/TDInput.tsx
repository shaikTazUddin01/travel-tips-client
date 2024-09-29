import { Input } from "@nextui-org/input";
import React from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  required?: boolean;
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
  required = false,
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  // console.log(errors);
  return (
    <Input
      type={type}
      label={label}
      variant={variant}
      {...register(name)}
      isInvalid={!!errors[name]}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isRequired={required}
    />
  );
};

export default TDInput;
