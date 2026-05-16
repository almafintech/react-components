import styles from "./Tag.module.scss";
import { TagProps } from "./types";

const Tag = ({
  label,
  variant = "success",
  leadingIcon,
  trailingIcon,
  className,
}: TagProps) => {
  const { tag, tagLabel, icon } = styles;

  return (
    <span className={`${tag} ${variant !== "custom" ? styles[variant] : ""} ${className ?? ""}`}>
      {leadingIcon && <span className={icon}>{leadingIcon}</span>}
      <span className={tagLabel}>{label}</span>
      {trailingIcon && <span className={icon}>{trailingIcon}</span>}
    </span>
  );
};

export default Tag;
