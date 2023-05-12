import { FC, PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";

enum btnSize {
  bg = "big",
  sm = "small",
}

interface ISubmitButtonProps extends PropsWithChildren {
  disabled: boolean;
  sizeBtn?: keyof typeof btnSize;
}

export const SubmitButton: FC<ISubmitButtonProps> = ({
  children,
  disabled,
  sizeBtn = btnSize.bg,
}) => {
  const { pathname } = useLocation();
  return (
    <button
      disabled={disabled}
      className={`self-end ${
        ((!pathname.includes("/editor") && sizeBtn === btnSize.bg) ||
          !pathname.includes("/settings")) &&
        "mt-4"
      } ${
        sizeBtn === btnSize.bg
          ? "py-3 px-6 text-xl rounded-md"
          : "py-1 px-2 text-sm font-bold rounded-sm"
      }  bg-lightGreen text-white hover:bg-fruitSalad  focus:-outline-offset-4 disabled:opacity-70 disabled:pointer-events-none`}
    >
      {children}
    </button>
  );
};
