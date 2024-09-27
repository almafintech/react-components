import styles from "./LoadingCircle.module.scss";
import { LoadingCircleProps } from "./types";

const LoadingCircle = ({ width, color }: LoadingCircleProps) => {
  const circleStyle = { height: width, width, backgroundColor: color };
  const isSmall = parseInt(width || "0", 10) <= 20;
  return (
    <div
      className={`${styles.loader} ${isSmall ? styles.small : ""}`}
      style={circleStyle}
    ></div>
  );
};

export default LoadingCircle;
