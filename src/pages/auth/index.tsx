import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginPage } from "./login";
import { RegisterPage } from "./register";
import { Container } from "../../components/container";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../components/submit-button";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, registerSchema } from "../../utils/yup";
import { useLoginUserMutation, useRegisterUserMutation } from "../../api/auth";
import { IAuthDTO } from "../../api/dto/auth";
import { useAppDispatch } from "../../hooks/redux";
import { setIsAuth } from "../../store/slice/user";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export interface IUserData {
  username?: string;
  email: string;
  password: string;
}

// const validateForm = ({ username, email, password }: IUserData) => {
//   const errors = {
//     email: !email
//       ? { message: "Email is required" }
//       : !email.includes("@")
//       ? { message: "Email should have @" }
//       : "",
//     username: !username
//       ? { message: "Username is required" }
//       : username.length < 3
//       ? { message: "Username too short" }
//       : username.length > 16
//       ? { message: "Username length must be no more then 16 chars" }
//       : "",
//     password: !password
//       ? { message: "Password is required" }
//       : password.length < 6
//       ? { message: "Password length must be biggest then 6 chars" }
//       : password.length > 16
//       ? { message: "Password length must be no more then 16 chars" }
//       : "",
//  };
//  return Object.values(errors) ? errors : {};
// };

export const AuthComponent: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IUserData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(
      location.pathname === "/login" ? loginSchema : registerSchema
    ), //(values) => {
    //   return {
    //     values,
    //     errors: validateForm(values),
    //   };
    // },
  });

  const [registerUser, result] = useRegisterUserMutation();
  const [loginUser, loginResult] = useLoginUserMutation();

  const submitUserData = async (data: IUserData) => {
    if (pathname === "/register") {
      try {
        const response = (await registerUser(data)) as { data: IAuthDTO };

        if (response.data) {
          dispatch(setIsAuth(true));
          navigate("/");
        }
      } catch (err) {
        return err;
      }
    } else {
      try {
        const response = (await loginUser(data)) as { data: IAuthDTO };

        if (response.data) {
          dispatch(setIsAuth(true));
          navigate("/");
        }
      } catch (err) {
        return err;
      }
    }
  };

  return (
    <Container className="mt-5">
      <form
        onSubmit={handleSubmit(submitUserData)}
        autoComplete="off"
        noValidate
        className="flex flex-col text-montana text-center mx-auto max-w-xl"
      >
        {pathname === "/login" ? (
          <LoginPage
            register={register}
            errors={errors}
            errorServer={loginResult.error as FetchBaseQueryError | undefined}
            reset={reset}
          />
        ) : (
          <RegisterPage
            register={register}
            errors={errors}
            errorServer={result.error as FetchBaseQueryError | undefined}
            reset={reset}
          />
        )}
        <SubmitButton disabled={isSubmitting}>
          {pathname === "/login" ? "Sign in" : "Sign up"}
        </SubmitButton>
      </form>
    </Container>
  );
};
