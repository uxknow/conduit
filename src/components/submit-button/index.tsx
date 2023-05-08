import { FC, PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

interface ISubmitButtonProps extends PropsWithChildren {
  disabled: boolean;
}

export const SubmitButton: FC<ISubmitButtonProps> = ({
  children,
  disabled,
}) => {
  const { pathname } = useLocation();
  return (
    <button
      disabled={disabled}
      className={`self-end ${
        !pathname.includes("/editor") && "mt-4"
      } py-3 px-6 text-xl rounded-md bg-lightGreen text-white hover:bg-fruitSalad  focus:-outline-offset-4 disabled:opacity-70 disabled:pointer-events-none`}
    >
      {children}
    </button>
  );
};
