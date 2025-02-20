import { InputFileProps } from "./types";
import InputFileMultiple from "./InputFileMultiple";
import InputFileSimple from "./InputFileSimple";

import styles from "./InputFile.module.scss";

const InputFile = ({
  name,
  maxSize, // in MB
  validTypes,
  className,
  multiple,
  formatErrorMessage = "Formato de archivo inválido.",
  sizeErrorMessage = "El archivo adjunto excede el peso máximo permitido de",
  ...rest
}: InputFileProps) => {
  const { container } = styles;

  const allowedTypes = validTypes ? new Set(validTypes) : new Set([]);
  const maxFileSize = maxSize ? maxSize * 1024 * 1024 : 0;

  const isValidFile = (file: File) =>
    (!validTypes || allowedTypes.has(file.type)) &&
    (!maxSize || file.size <= maxFileSize);

  const getErrorMessage = (file: File) => {
    if (allowedTypes.size !== 0 && !allowedTypes.has(file.type)) {
      return formatErrorMessage;
    } else {
      return `${sizeErrorMessage} ${maxSize}MB.`;
    }
  };

  return (
    <div
      className={`${container} ${className ?? ""}`}
      id={`inputFile-container-${name}`}
    >
      {multiple ? (
        <InputFileMultiple
          name={name}
          validTypes={validTypes}
          getErrorMessage={getErrorMessage}
          isValidFile={isValidFile}
          {...rest}
        />
      ) : (
        <InputFileSimple
          name={name}
          validTypes={validTypes}
          getErrorMessage={getErrorMessage}
          isValidFile={isValidFile}
          {...rest}
        />
      )}
    </div>
  );
};

export default InputFile;
