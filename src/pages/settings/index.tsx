import { FC, useEffect } from "react";
import { FormField } from "../../components/form-input";
import { SubmitButton } from "../../components/submit-button";
import { Container } from "../../components/container";
import { FormTextarea } from "../../components/form-textarea";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getUser, setIsAuth } from "../../store/slice/user";
import { IAuthDTO } from "../../api/dto/auth";

interface ISettingsData {
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
  password?: string;
}

export const SettingsPage: FC = () => {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [updateUser] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<ISettingsData>({
    defaultValues: {
      email: "",
      username: "",
      bio: "",
      image: "",
      password: "",
    },
  });

  useEffect(() => {
    reset({
      username: user?.username,
      bio: user?.bio,
      image: user?.image,
      email: user?.email,
    });
  }, [user]);

  const onSubmit = async (userData: ISettingsData) => {
    try {
      const {data} = await updateUser(userData) as {data: IAuthDTO};

      navigate(`/@${data.user.username}`);
    } catch (err) {
      return err;
    }
  };

  const logOut = () => {
    dispatch(getUser(null));
    dispatch(setIsAuth(false));
    localStorage.clear();
    navigate("/");
  };

  return (
    <Container className="text-montana text-center mt-6">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className="text-4xl font-medium mb-2">Your Settings</h1>
          <form
            autoComplete="none"
            noValidate
            className="max-w-md flex flex-col gap-4 mx-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              {...register("image")}
              sizeInput="sm"
              placeholder="URL of profile picture"
            />
            <FormField {...register("username")} placeholder="Username" />
            <FormTextarea
              {...register("bio")}
              rows={8}
              placeholder="Short bio about you"
            />
            <FormField {...register("email")} placeholder="Email" />
            <FormField {...register("password")} placeholder="New Password" />
            <SubmitButton disabled={isSubmitting}>Update Settings</SubmitButton>
            <hr />
          </form>
          <div className="text-left max-w-md mx-auto">
            <button
              onClick={logOut}
              className="mt-4 border border-FuzzyWuzzyBrown rounded-md text-FuzzyWuzzyBrown py-2 px-4 hover:text-white hover:bg-FuzzyWuzzyBrown"
            >
              Or click here to logout
            </button>
          </div>
        </>
      )}
    </Container>
  );
};
