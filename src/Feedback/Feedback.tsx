import { ButtonGroup } from "../ButtonGroup";
import { Modal } from "../Modal";
import styles from "./Feedback.module.scss";
import { FeedbackProps, FeedbackType } from "./types";
import { ReactComponent as InfoIcon } from "@icons/infoIcon.svg";
import { ReactComponent as SuccessIcon } from "@icons/successIcon.svg";
import { ReactComponent as WarningIcon } from "@icons/warningIcon.svg";
import { ReactComponent as PendingIcon } from "@icons/pendingIcon.svg";
import { ReactComponent as ErrorIcon } from "@icons/errorIcon.svg";

const FeedbackIcon = ({ type }: { type: FeedbackType }) => {
  switch (type) {
    case "INFO":
      return <InfoIcon />;
    case "SUCCESS":
      return <SuccessIcon />;
    case "WARNING":
      return <WarningIcon />;
    case "PENDING":
      return <PendingIcon />;
    case "ERROR":
      return <ErrorIcon />;
  }
};

const Feedback = ({
  type = "INFO",
  title,
  description,
  children,
  showButtonsContainer = true,
  isOpen,
  onClose,
  className,
  ...buttonGroupProps
}: FeedbackProps) => {
  const {
    modal,
    wrapper,
    content,
    iconWrapper,
    textContent,
    title: titleStyle,
    description: descriptionStyle,
  } = styles;

  return (
    <Modal isOpen={isOpen} onClose={onClose} hideCloseButton className={modal}>
      <div className={[wrapper, className].filter(Boolean).join(" ")}>
        <div className={content}>
          <div className={iconWrapper}>
            <FeedbackIcon type={type} />
          </div>
          <div className={textContent}>
            {title && <p className={titleStyle}>{title}</p>}
            {description && <p className={descriptionStyle}>{description}</p>}
            {children}
          </div>
        </div>
        <ButtonGroup
          container={showButtonsContainer}
          align="center"
          {...buttonGroupProps}
        />
      </div>
    </Modal>
  );
};

export default Feedback;
