import { ChangeEvent, ComponentPropsWithRef, FC,  forwardRef } from "react";

type RefType = HTMLInputElement;

interface IFormInputProps extends ComponentPropsWithRef<'input'> {
  error: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement>
  ) => void;
}

export const FormInput: FC<IFormInputProps> = forwardRef<RefType, IFormInputProps>(({
  error ,
  onChange,
  ...rest
}, ref) => {
  const borderColor = error ? 'border-red-500 focus:border-red-500' : "focus:border-softBlue"

  return (
    <div>
      <input
        onChange={onChange}
        {...rest}
        ref={ref}
        className={`w-full border rounded py-3 px-6 text-xl focus:outline-none ${borderColor}`}
      />
    </div>
  );
})