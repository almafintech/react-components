import { ReactNode } from "react";
import UploadIcon from "../../assets/images/ui/icons/ui-icon-file_upload.svg";
import plusIcon from "../../assets/images/ui/icons/ui-icon-plus-circle.svg";

import styles from "./InputFile.module.scss";

interface InputFileDefaultProps {
  name: string;
  text: ReactNode;
  infoText?: string;
  infoTextPosition: "bottom" | "top";
  infoTextClassName?: string;
  isMobile?: boolean;
  attachImageText?: string;
  replaceImageText?: string;
  isFileUploaded?: boolean;
  handleDrag: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropOrInputChange: (
    e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>
  ) => void;
  labelProps: {
    label?: string | React.ReactNode;
    isOptional?: boolean;
    anchor?: React.ReactNode;
    tooltip?: React.ReactNode;
  };
}

const InputFileDefault = ({
  name,
  text,
  isMobile,
  attachImageText,
  replaceImageText,
  infoText,
  infoTextPosition,
  infoTextClassName,
  isFileUploaded,
  handleDrag,
  handleDropOrInputChange,
  labelProps,
}: InputFileDefaultProps) => {
  const {
    inputFile,
    fileHeader,
    infoTextStyle,
    topPosition,
    bottomPosition,
    // onDrag,
    mobile,
  } = styles;
  return (
    <label
      htmlFor={`input-file-upload-${name}`}
      style={{ width: "100%", height: "100%" }}
      className={`${infoTextPosition === "top" ? topPosition : bottomPosition}`}
    >
      <InputFileLabel {...labelProps} />
      {isMobile ? (
        <div className={mobile}>
          <span>{isFileUploaded ? replaceImageText : attachImageText}</span>
          <img src={plusIcon} alt="adjuntar" />
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDropOrInputChange}
          className={inputFile}
        >
          <div className={fileHeader}>
            <img src={UploadIcon} />
            <label
              id={`label-file-upload-${name}`}
              htmlFor={`input-file-upload-${name}`}
            >
              {text}
            </label>
          </div>
        </div>
      )}
      {infoText && (
        <div className={`${infoTextStyle} ${infoTextClassName}`}>
          {infoText}
        </div>
      )}
    </label>
  );
};

export const InputFileLabel = ({
  label,
  isOptional,
  tooltip,
  anchor,
}: {
  label?: string | React.ReactNode;
  isOptional?: boolean;
  tooltip?: React.ReactNode;
  anchor?: React.ReactNode;
}) => {
  if (!label) return null;

  const { label: labelStyle, optionalText, tooltipContainer } = styles;

  return (
    <div className={labelStyle}>
      <div>
        <span>{label}</span>
        {isOptional && <span className={optionalText}>- Opcional</span>}
        <span className={tooltipContainer}>{tooltip}</span>
      </div>
      <div className="text-nowrap">{anchor}</div>
    </div>
  );
};

export default InputFileDefault;
