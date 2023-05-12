import { ComponentPropsWithRef, FC, forwardRef } from "react";

interface IFormTextareaProps extends ComponentPropsWithRef<"textarea"> {
}

export const FormTextarea: FC<IFormTextareaProps> = forwardRef<
  HTMLTextAreaElement
>(({...rest}, ref) => {
  return (
    <div>
      <textarea {...rest} ref={ref} className="w-full text-xl py-3 px-6 border rounded resize-y focus:border-softBlue focus:outline-none" />
    </div>
  );
});
