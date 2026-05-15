import styles from "./EmptyState.module.scss";
import { EmptyStateProps } from "./types";
import { ButtonGroup } from "../ButtonGroup";
import { ButtonProps } from "../Button";

const EmptyState = ({
  title,
  description,
  image,
  type = "fullpage",
  primaryAction,
  secondaryAction,
  className,
}: EmptyStateProps) => {
  const {
    container,
    section,
    imageWrapper,
    content,
    title: titleClass,
    description: descriptionClass,
  } = styles;

  const hasActions = primaryAction || secondaryAction;
  const resolvedPrimary = primaryAction
    ? {
        ...primaryAction,
        variant:
          type === "section" && !secondaryAction
            ? ("secondary" as ButtonProps["variant"])
            : ("primary" as ButtonProps["variant"]),
      }
    : undefined;

  return (
    <div
      className={[container, type === "section" ? section : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {image && <div className={imageWrapper}>{image}</div>}
      <div className={content}>
        <p className={titleClass}>{title}</p>
        {description && <p className={descriptionClass}>{description}</p>}
      </div>
      {hasActions && (
        <ButtonGroup
          primary={resolvedPrimary}
          secondary={secondaryAction}
          align="center"
        />
      )}
    </div>
  );
};

export default EmptyState;
