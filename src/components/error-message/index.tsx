import { FC } from "react";

interface IErrorMessageProps {
  error: string;
}

export const ErrorMessage: FC<IErrorMessageProps> = ({ error }) => {
  return (
    <ul className="pl-10 mb-4 text-left">
      <li className={`font-bold text-red-700 ${error && "list-disc"}`}>
        {error}
      </li>
    </ul>
  );
};
