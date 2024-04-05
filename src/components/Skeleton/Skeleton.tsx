import { SkeletonProps } from "./types";
import styles from "./Skeleton.module.scss";

const Skeleton = ({
  children,
  width,
  height,
  borderRadius,
  className,
}: SkeletonProps) => {
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
