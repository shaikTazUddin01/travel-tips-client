import { Input, Textarea } from "@nextui-org/input";
import React from "react";
import { useFormContext } from "react-hook-form";

interface IProps {
  required?: boolean;
  name: string;
    label?: string;
  type?: string;
  defaultvalue?: string;
  placeholder?: string;
  variant?: "bordered" | "flat" | "faded" | "underlined";
}

const TDTextArea = ({
  name,
    label,
  variant = "flat",
  required = false,
  defaultvalue,
  placeholder = "write your commemt",
}: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // console.log(errors);

  return (
    <Textarea
        label={label}
      variant={variant}
      {...register(name)}
      defaultValue={defaultvalue}
      labelPlacement="outside"
    //   errorMessage={errors[name]?.message as string | undefined}
    //   isInvalid={!!errors[name]}
      isRequired={required}
      placeholder={placeholder}
    />
  );
};

export default TDTextArea;
