import styles from "./LoadingCircle.module.scss";
import { LoadingCircleProps } from "./types";

const LoadingCircle = ({ color, small }: LoadingCircleProps) => {
  const style = color
    ? ({ "--loader-color": color } as React.CSSProperties)
    : undefined;

  return (
    <div
      className={`${styles.loader} ${small ? styles.small : ""}`}
      style={style}
    />
  );
};

export default LoadingCircle;
