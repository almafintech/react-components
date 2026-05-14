import styles from "./Feedback.module.scss";
import { FeedbackProps, FeedbackType } from "./types";

const FeedbackIcon = ({ type }: { type: FeedbackType }) => {
  switch (type) {
    case "Info":
      return (
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="28" cy="28" r="28" fill="#0150B7" />
          <rect x="25.5" y="25" width="5" height="17" rx="2.5" fill="white" />
          <circle cx="28" cy="17" r="3" fill="white" />
        </svg>
      );
    case "Success":
      return (
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="28" cy="28" r="28" fill="#199E4E" />
          <circle cx="28" cy="28" r="22" stroke="#A1D7B6" strokeWidth="1.5" fill="none" />
          <path
            d="M17 29L24 36L39 20"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Warning":
      return (
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M26.268 5C27.038 3.667 28.962 3.667 29.732 5L53.856 47C54.626 48.333 53.664 50 52.124 50H3.876C2.336 50 1.374 48.333 2.144 47L26.268 5Z"
            fill="#DEA916"
          />
          <rect x="25.5" y="20" width="5" height="16" rx="2.5" fill="white" />
          <circle cx="28" cy="42" r="3" fill="white" />
        </svg>
      );
    case "Pending":
      return (
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="28" cy="28" r="28" fill="#DEA916" />
          <circle cx="28" cy="28" r="17" stroke="white" strokeWidth="2.5" fill="none" />
          <path
            d="M28 17V28L35 35"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Error":
      return (
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="28" cy="28" r="28" fill="#BF1D26" />
          <path
            d="M18 18L38 38M38 18L18 38"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      );
  }
};

const Feedback = ({
  type = "Info",
  title = "Título",
  description = "Descripción de máximo 3 líneas, en lo posible.",
  hasDescription = true,
  hasNestedContent = false,
  children,
  primaryAction,
  secondaryAction,
  className,
}: FeedbackProps) => {
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <FeedbackIcon type={type} />
        </div>

        <div className={styles.textContent}>
          <p className={styles.title}>{title}</p>
          {hasDescription && (
            <p className={styles.description}>{description}</p>
          )}
        </div>

        {hasNestedContent && (
          <div className={styles.nestedContent}>{children}</div>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <div className={styles.buttonGroupInner}>
          <div className={styles.primaryButton}>{primaryAction}</div>
          {secondaryAction && (
            <div className={styles.secondaryButton}>{secondaryAction}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
