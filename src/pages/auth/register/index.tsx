import { FC } from "react";
import { Link } from "react-router-dom";
import { FormInput } from "../../../components/form-input";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { IUserData } from "..";
import { AuthMessage } from "../../../components/auth-message";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

interface IRegisterProps<TFieldValues extends FieldValues = IUserData> {
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  errorServer: FetchBaseQueryError | undefined;
  reset: UseFormReset<TFieldValues>;
}

export const RegisterPage: FC<IRegisterProps> = ({
  register,
  errors,
  errorServer,
  reset,
}) => {

  const errorServerRegister =
  errorServer && "data" in errorServer
    ? (errorServer.data as Record<string, object>).errors
    : "";
  const serverErrMsg = Object.keys(errorServerRegister).length
  ? `${Object.keys(errorServerRegister)[0]} ${
      Object.values(errorServerRegister)[0]
    }`
  : "";
  const errorMsg = serverErrMsg ? "" : [...Object.values(errors)][0]?.message;


  return (
    <>
      <h2 className="text-[2.5rem]">Sign up</h2>
      <p className="mb-4">
        <Link to="/login" onClick={() => reset()} className="text-lightGreen">
          Have an account?
        </Link>
      </p>
      <AuthMessage error={errorMsg || serverErrMsg} />
      <div className="flex flex-col gap-4 max-w-xl">
        <FormInput
          type="text"
          placeholder="Username"
          {...register("username")}
          error={(errorMsg?.includes("username") && errorMsg) || ""}
        />
        <FormInput
          type="email"
          placeholder="Email"
          {...register("email")}
          error={(errorMsg?.includes("email") && errorMsg) || ""}
        />
        <FormInput
          type="password"
          placeholder="Password"
          {...register("password")}
          error={(errorMsg?.includes("password") && errorMsg) || ""}
        />
      </div>
    </>
  );
};
