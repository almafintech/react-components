import styles from "./LoadingCircle.module.scss";
import { LoadingCircleProps } from "./types";

const LoadingCircle = ({ width, color }: LoadingCircleProps) => {
  const circleStyle = { height: width, width, backgroundColor: color };
  return <div className={styles.loader} style={circleStyle}></div>;
};

export default LoadingCircle;
