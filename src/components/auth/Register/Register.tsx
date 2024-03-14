import { Checkbox, Form, Input, RadioGroup, Tab } from "@/components";
import { registrationSchema } from "@/utils";
import { FC } from "react";
import { useAuthenticate } from "@/hooks";
import { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";

export interface RegisterProps {
  handleTabChange: (value: Tab) => void;
}

export interface RegisterFormValue {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  is_subscribed: boolean;
  date_of_birth: string;
  gender: number;
}

export const Register: FC<RegisterProps> = ({ handleTabChange }) => {
  const { handleRegister, registerLoading } = useAuthenticate();

  const handleFormSubmit = async (
    value: RegisterFormValue,
    methods: UseFormReturn<RegisterFormValue, any, RegisterFormValue>,
  ) => {
    const response = await handleRegister(value);
    if (response) {
      methods.reset();
      handleTabChange("login");
      toast.success("Customer create successfully.");
    }
  };

  return (
    <Form<RegisterFormValue>
      className=""
      onSubmit={handleFormSubmit}
      schema={registrationSchema}
    >
      <div className="flex flex-col gap-4 px-4">
        <Input placeholder="First Name" name="firstname" className="rounded" />
        <Input placeholder="Last Name" name="lastname" className="rounded" />
        <Input
          placeholder="Email"
          name="email"
          type="email"
          className="rounded"
        />
        <Input
          placeholder="Password"
          name="password"
          type="password"
          className="rounded"
        />
        <Input
          placeholder="Date of Birth"
          name="date_of_birth"
          type="date"
          className="rounded"
        />
        <RadioGroup
          items={[
            { label: "Male", value: 1 },
            { label: "Female", value: 2 },
          ]}
          name="gender"
          label="Gender"
          radioWrapper="flex gap-4"
          className="flex gap-2"
        />
        <Checkbox
          label="Opt in to receive weekly updates and be the first to know about new arrivals and offers. (You can unsubscribe at any time)"
          name="is_subscribed"
        />

        <button
          className="btn bg-primary-500 text-white  hover:bg-gray-600 disabled:bg-gray-400 disabled:text-white"
          type="submit"
          disabled={registerLoading}
        >
          {registerLoading ? "Loading..." : "Register"}
        </button>
      </div>
    </Form>
  );
};
