import React, { ReactNode } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface IProps {
  children: ReactNode;
  onSubmit: SubmitHandler<any>;
}

const TDForm = ({ children, onSubmit }: IProps) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default TDForm;
