import {
  Modal as NextUiModal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@nextui-org/modal";
import styles from "./Modal.module.scss";
import CloseIcon from "../../assets/images/ui/icons/ui-icon-close.svg";
import { ToastMessage } from "../ToastMessage/ToastMessage";
import { ModalProps } from "./types";

const Modal = ({
  children,
  header,
  footer,
  centerFooter,
  width,
  ...rest
}: ModalProps) => {
  const { modalAlert, customFooter, ...restStyles } = styles;
  return (
    <NextUiModal
      classNames={{ ...restStyles }}
      closeButton={<CloseIcon />}
      scrollBehavior="inside"
      placement="center"
      {...rest}
    >
      <ModalContent style={width ? { minWidth: width } : {}}>
        <ToastMessage
          messageId="modalAlert"
          position="top-center"
          className={modalAlert}
        />
        {header && <ModalHeader>{header}</ModalHeader>}

        <ModalBody>{children}</ModalBody>

        {footer && (
          <ModalFooter className={centerFooter ? customFooter : ""}>
            {footer}
          </ModalFooter>
        )}
      </ModalContent>
    </NextUiModal>
  );
};

export default Modal;

/* 
//EXAMPLE OF USE//

<Modal 
  isOpen={open} 
  onClose={handleClose}
  header="Modal Title"
  footer={
    <>
      <Button>Close</Button>
      <Button>Action</Button>
    </>
  }
>
  <p>
    Magna exercitation reprehenderit magna aute tempor cupidatat
    consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
    incididunt cillum quis. Velit duis sit officia eiusmod Lorem
    aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
    consectetur esse laborum eiusmod pariatur proident Lorem eiusmod
    et. Culpa deserunt nostrud ad veniam.
  </p>
</Modal>

*/
