import { ComponentPropsWithRef, FC, forwardRef } from "react";

type RefType = HTMLInputElement;

enum inputSize {
  sm = "small",
  bg = "big",
}

interface IFormInputProps extends ComponentPropsWithRef<"input"> {
  error: string;
  sizeInput?: keyof typeof inputSize;
}

export const FormField: FC<IFormInputProps> = forwardRef<
  RefType,
  IFormInputProps
>(({ error, sizeInput = inputSize.bg, ...rest }, ref) => {
  const borderColor = error
    ? "border-red-500 focus:border-red-500"
    : "focus:border-softBlue";

  return (
    <div>
      <input
        {...rest}
        ref={ref}
        className={`w-full border rounded ${
          sizeInput === inputSize.bg ? "text-xl py-3 px-6" : "py-2 px-3"
        } focus:outline-none ${borderColor}`}
      />
    </div>
  );
});
