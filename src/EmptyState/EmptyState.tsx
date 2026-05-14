import styles from "./EmptyState.module.scss";
import { EmptyStateProps } from "./types";

const EmptyState = ({
  title,
  description,
  image,
  type = "fullpage",
  primaryAction,
  secondaryAction,
  className,
}: EmptyStateProps) => {
  const { container, section, imageWrapper, content, title: titleClass, description: descriptionClass } = styles;

  return (
    <div className={[container, type === "section" ? section : "", className].filter(Boolean).join(" ")}>
      {image && (
        <div className={imageWrapper}>{image}</div>
      )}
      <div className={content}>
        <p className={titleClass}>{title}</p>
        {description && <p className={descriptionClass}>{description}</p>}
      </div>
      {/* ButtonGroup placeholder */}
      {(primaryAction || secondaryAction) && <div />}
    </div>
  );
};

export default EmptyState;
