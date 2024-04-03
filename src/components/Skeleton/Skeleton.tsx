import { ReactNode } from "react";
import styles from "./Skeleton.module.scss";

interface Props {
  children?: ReactNode;
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

const Skeleton = ({
  children,
  width,
  height,
  borderRadius,
  className,
}: Props) => {
  const { container } = styles;

  return (
    <div
      className={`${container} ${className}`}
      style={{
        width,
        height,
        borderRadius,
      }}
    >
      {children}
    </div>
  );
};

export default Skeleton;
