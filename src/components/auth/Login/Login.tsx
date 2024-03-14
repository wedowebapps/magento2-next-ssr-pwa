import { Form, Input, Tab } from "@/components";
import { loginSchema } from "@/utils";
import { FC } from "react";
import { useAuthenticate } from "@/hooks";

export interface LoginProps {
  handleTabChange: (value: Tab) => void;
}

export interface LoginFormValue {
  email: string;
  password: string;
}

export const Login: FC<LoginProps> = () => {
  const { handleLogin, loginLoading } = useAuthenticate();

  return (
    <Form<LoginFormValue>
      className=""
      onSubmit={handleLogin}
      schema={loginSchema}
    >
      <div className="flex flex-col gap-4 px-4">
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

        <button
          className="btn bg-primary-500 text-white  hover:bg-gray-600 disabled:bg-gray-400 disabled:text-white"
          type="submit"
          disabled={loginLoading}
        >
          {loginLoading ? "Loading..." : "Login"}
        </button>
      </div>
    </Form>
  );
};
