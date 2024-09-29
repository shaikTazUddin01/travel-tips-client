import React from "react";
import { FormProvider, useForm } from "react-hook-form";

const TXForm = ({ children,onSubmit }) => {

    const methods=useForm()
  return <FormProvider onSubmit={methods.handleSubmit({onSubmit})}>
    {children}
  </FormProvider>;
};

export default TXForm;
