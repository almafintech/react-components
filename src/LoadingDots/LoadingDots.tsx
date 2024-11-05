import { LoadingDotsProps } from "./types";
import styles from "./LoadingDots.module.scss";

const LoadingDots = ({ color, theme }: LoadingDotsProps) => {
  const { dotsContainer, dot, byma } = styles;

  const dotStyle = { backgroundColor: color };

  return (
    <div
      data-testid="loading-dots"
      className={`${theme ? byma : ""} ${dotsContainer}`}
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className={dot} style={dotStyle} />
      ))}
    </div>
  );
};

export default LoadingDots;
