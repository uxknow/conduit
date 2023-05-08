import { FC } from "react";
import { Link } from "react-router-dom";
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormReset,
} from "react-hook-form";
import { IUserData } from "..";
import { ErrorMessage } from "../../../components/error-message";
import { FormField } from "../../../components/form-input";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

interface ILoginProps<TFieldValues extends FieldValues = IUserData> {
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  errorServer: FetchBaseQueryError | undefined;
  reset: UseFormReset<TFieldValues>;
}

export const LoginPage: FC<ILoginProps> = ({
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
      <h2 className="text-[2.5rem]">Sign in</h2>
      <p className="mb-4">
        <Link
          to="/register"
          onClick={() => reset()}
          className="text-lightGreen"
        >
          Need an account?
        </Link>
      </p>
      <ErrorMessage error={errorMsg || serverErrMsg} />
      <div className="flex flex-col gap-4 max-w-xl">
        <FormField
          type="email"
          placeholder="Email"
          {...register("email")}
          error={(errorMsg?.includes("email") && errorMsg) || ""}
        />
        <FormField
          type="password"
          placeholder="Password"
          {...register("password")}
          error={(errorMsg?.includes("password") && errorMsg) || ""}
        />
      </div>
    </>
  );
};
