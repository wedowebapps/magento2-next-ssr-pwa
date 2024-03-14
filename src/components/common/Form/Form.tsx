"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  UseFormReturn,
  useForm,
} from "react-hook-form";

export type ISubmitHandler<T extends FieldValues> = (
  data: T,
  methods: UseFormReturn<T>,
) => unknown | Promise<unknown>;

export interface FormProps<T extends FieldValues> {
  onSubmit: ISubmitHandler<T>;
  schema: any;
  children: React.ReactNode;
  className: string;
  defaultValues?: DefaultValues<T>;
  resetData?: DefaultValues<T>;
}

export function Form<T extends FieldValues>({
  schema,
  children,
  onSubmit,
  defaultValues,
  resetData,
  ...rest
}: FormProps<T>) {
  const methods = useForm<T>({
    defaultValues,
    resolver: yupResolver<any>(schema as any),
  });

  useEffect(() => {
    if (resetData) {
      methods.reset(resetData);
    }
  }, [methods, resetData]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((values) => {
          onSubmit(values, methods);
        })}
        {...rest}
      >
        {children}
      </form>
    </FormProvider>
  );
}
