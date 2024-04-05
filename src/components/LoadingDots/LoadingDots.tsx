import { LoadingDotsProps } from "./types";
import styles from "./LoadingDots.module.scss";

const LoadingDots = ({ color }: LoadingDotsProps) => {
  const { dotsContainer, dot } = styles;

  const dotStyle = { backgroundColor: color };

  return (
    <div className={dotsContainer}>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={dot} style={dotStyle} />
      ))}
    </div>
  );
};

export default LoadingDots;
