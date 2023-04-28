import { FC, PropsWithChildren } from "react";

interface IAuthButtonProps extends PropsWithChildren {
  disabled: boolean
}

export const AuthButton: FC<IAuthButtonProps> = ({ children, disabled }) => {

  return (
    <button
      disabled={disabled}
      className="self-end mt-4 py-3 px-6 text-xl rounded-md bg-lightGreen text-white hover:bg-fruitSalad  focus:-outline-offset-4 disabled:opacity-70 disabled:pointer-events-none"
    >
      {children}
    </button>
  );
};
