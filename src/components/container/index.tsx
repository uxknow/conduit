import { FC, PropsWithChildren, ReactNode } from "react";

interface IContainerProps {
  className?: string;
  children: ReactNode;
}

export const Container: FC<PropsWithChildren<IContainerProps>> = ({
  className = '',
  children,
}) => {
  return (
    <div className={`container mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
};
