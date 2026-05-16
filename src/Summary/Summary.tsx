import { Data } from "../Data";
import styles from "./Summary.module.scss";
import { SummaryProps } from "./types";

const Summary = ({ items, total, className }: SummaryProps) => {
  const { container, divider } = styles;

  return (
    <div className={`${container} ${className ?? ""}`}>
      {items.map((item, index) => (
        <Data
          key={index}
          variant="inline"
          {...item}
          emphasis={items.length === 1 && !total}
        />
      ))}
      {total && (
        <>
          <hr className={divider} />
          <Data variant="inline" {...total} emphasis />
        </>
      )}
    </div>
  );
};

export default Summary;
