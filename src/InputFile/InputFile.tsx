import { DragEvent, useCallback, useEffect, useRef, useState } from "react";
import { saveAs } from "file-saver";
import { FileData, InputFileProps } from "./types";

import UploadIcon from "../../assets/images/ui/icons/ui-icon-file_upload.svg";
import UploadIconByma from "../../assets/images/ui/icons/ui-icon-file_upload-byma.svg";

import ErrorIcon from "../../assets/images/ui/icons/ui-icon-error-exclamation-filled.svg";
import ErrorIconByma from "../../assets/images/ui/alert-icons/ui-alert-icon-error-exclamation-filled-byma.svg";

import SuccessIcon from "../../assets/images/ui/icons/ui-icon-success-bg-dark.svg";
import SuccessIconByma from "../../assets/images/ui/icons/ui-icon-success-bg-dark-byma.svg";

import TrashIcon from "../../assets/images/ui/icons/ui-icon-trash.svg";
import TrashIconByma from "../../assets/images/ui/icons/ui-icon-trash-byma.svg";

import DownloadIcon from "../../assets/images/ui/icons/ui-icon-download.svg";
import DownloadIconByma from "../../assets/images/ui/icons/ui-icon-download-byma.svg";

import LoadingDots from "../LoadingDots/LoadingDots";

import plusIcon from "../../assets/images/ui/icons/ui-icon-plus-circle.svg";
import plusIconByma from "../../assets/images/ui/icons/ui-icon-plus-circle-byma.svg";

import styles from "./InputFile.module.scss";
import { isByma } from "../utils";

const InputFile = ({
  name,
  text,
  infoText,
  onFileUpload,
  onFileRemove,
  onFileDownload,
  maxSize, // in MB
  validTypes,
  initialValue,
  className,
  selectedFile,
  fileData,
  error,
  isLoading,
  infoTextPosition = "bottom",
  infoTextClassName,
  hideDownloadIcon,
  isMobile,
  successMessage,
  theme,
  formatErrorMessage = "Formato de archivo inválido.",
  sizeErrorMessage = "El archivo adjunto excede el peso máximo permitido de",
  replaceImageText = "Reemplazar imagen",
  attachImageText = "Adjuntar imagen",
  ...labelProps
}: InputFileProps) => {
  const isBymaTheme = isByma(theme);

  const {
    inputFile,
    fileContent,
    errorMessageStyle,
    fileHeader,
    fileOptions,
    inputSuccess,
    container,
    infoTextStyle,
    topPosition,
    bottomPosition,
    // onDrag,
    mobile,
    successMessageStyle,
    hiddenInputFile,
  } = styles;

  // const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | FileData | null>(fileData ?? null);
  const [fileError, setFileError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (
    e: DragEvent<HTMLDivElement> | DragEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    // if (e.type === "dragenter" || e.type === "dragover") {
    //   setDragging(true);
    // } else if (e.type === "dragleave") {
    //   setDragging(false);
    // }
  };

  const handleFileChange = (inputFile: File) => {
    const allowedTypes = validTypes ? new Set(validTypes) : new Set([]);
    const maxFileSize = maxSize ? maxSize * 1024 * 1024 : 0;

    if (
      (!validTypes || allowedTypes.has(inputFile.type)) &&
      (!maxSize || inputFile.size <= maxFileSize)
    ) {
      setFileError(false);
      setFile(inputFile);
      onFileUpload && !isLoading && onFileUpload(inputFile);
    } else {
      setFile(inputFile);
      setFileError(true);
      onFileRemove && onFileRemove();
      allowedTypes.size !== 0 && !allowedTypes.has(inputFile.type)
        ? setErrorMessage(formatErrorMessage)
        : setErrorMessage(`${sizeErrorMessage} ${maxSize}MB.`);
    }
  };

  const handleDropOrInputChange = (
    e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    // setDragging(false);

    const droppedFile =
      "dataTransfer" in e
        ? e.dataTransfer.files[0]
        : e.target.files && e.target.files[0];

    if (droppedFile) {
      handleFileChange(droppedFile);
    }
  };

  const handleFileDownload = () => {
    if (fileData) {
      onFileDownload && onFileDownload(fileData);
    } else {
      file instanceof File &&
        file?.arrayBuffer().then((arrayBuffer) => {
          const blob = new Blob([new Uint8Array(arrayBuffer)], {
            type: file.type,
          });
          saveAs(blob, `${file.name}`);
        });
    }
  };

  const handleFileRemove = useCallback(() => {
    setFile(null);
    setFileError(false);
    hiddenInputRef.current && (hiddenInputRef.current.value = "");
    onFileRemove && onFileRemove();
  }, []);

  useEffect(() => {
    if (selectedFile) {
      handleFileChange(selectedFile);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (initialValue) {
      handleFileChange(initialValue);
    } else {
      setFile(null);
    }
  }, [initialValue]);

  useEffect(() => {
    if (fileData) setFile(fileData);
  }, [fileData]);

  useEffect(() => {
    if (error) {
      setFileError(true);
      onFileRemove && onFileRemove();
    }
  }, [error]);

  return (
    <div
      className={`${isBymaTheme ? "byma" : ""} ${container} ${className ?? ""}`}
      id={`inputFile-container-${name}`}
    >
      <input
        ref={hiddenInputRef}
        className={hiddenInputFile}
        type="file"
        accept={validTypes?.join(",")}
        onChange={handleDropOrInputChange}
        id={`input-file-upload-${name}`}
        multiple={false}
      />
      {isMobile ? (
        <label
          htmlFor={`input-file-upload-${name}`}
          style={{ width: "100%", height: "100%" }}
          className={`${infoTextPosition === "top" ? topPosition : bottomPosition}`}
        >
          <InputFileLabel {...labelProps} />
          <div className={mobile}>
            <span>{file ? replaceImageText : attachImageText}</span>
            {!file && (
              <img src={isBymaTheme ? plusIconByma : plusIcon} alt="adjuntar" />
            )}
          </div>
          {infoText && (
            <div className={`${infoTextStyle} ${infoTextClassName}`}>
              {infoText}
            </div>
          )}
        </label>
      ) : (
        <>
          {!file || fileError ? (
            <label
              htmlFor={`input-file-upload-${name}`}
              style={{ width: "100%", height: "100%" }}
              className={`${infoTextPosition === "top" ? topPosition : bottomPosition}`}
            >
              <InputFileLabel {...labelProps} />
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDropOrInputChange}
                className={inputFile}
              >
                <div className={fileHeader}>
                  <img src={isBymaTheme ? UploadIconByma : UploadIcon} />
                  <label
                    id={`label-file-upload-${name}`}
                    htmlFor={`input-file-upload-${name}`}
                  >
                    {text}
                  </label>
                </div>
              </div>
              {infoText && (
                <div className={`${infoTextStyle} ${infoTextClassName}`}>
                  {infoText}
                </div>
              )}
            </label>
          ) : (
            <div
              className={`${infoTextPosition === "top" ? topPosition : bottomPosition}`}
            >
              <InputFileLabel {...labelProps} />
              <div className={`${inputFile} ${!isLoading ? inputSuccess : ""}`}>
                <div className={fileContent}>
                  <div className={`${fileHeader} ${file && "w-4/5"}`}>
                    {isLoading ? (
                      <>
                        <img src={isBymaTheme ? UploadIconByma : UploadIcon} />
                        <label
                          id={`label-file-upload-${name}`}
                          htmlFor={`input-file-upload-${name}`}
                        >
                          Cargando {file?.name}
                        </label>
                      </>
                    ) : (
                      <>
                        <img
                          src={isBymaTheme ? SuccessIconByma : SuccessIcon}
                        />
                        <p>{file?.name}</p>
                      </>
                    )}
                  </div>
                  <div className={fileOptions}>
                    {isLoading ? (
                      <LoadingDots theme={theme} color="#acb3bf" />
                    ) : (
                      <>
                        {!hideDownloadIcon && (
                          <img
                            src={isBymaTheme ? DownloadIconByma : DownloadIcon}
                            onClick={handleFileDownload}
                          />
                        )}
                        <img
                          src={isBymaTheme ? TrashIconByma : TrashIcon}
                          onClick={handleFileRemove}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              {infoText && (
                <div className={`${infoTextStyle} ${infoTextClassName}`}>
                  {infoText}
                </div>
              )}
            </div>
          )}
        </>
      )}
      {isMobile && file && !fileError && (
        <div className={successMessageStyle}>
          <img src={isBymaTheme ? SuccessIconByma : SuccessIcon} />
          <p>{successMessage ?? "Archivo cargado con éxito"}</p>
        </div>
      )}
      {fileError && (
        <div className={errorMessageStyle}>
          <img src={isBymaTheme ? ErrorIconByma : ErrorIcon} />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

const InputFileLabel = ({
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

  const {
    label: labelStyle,
    optionalText,
    tooltipContainer,
  } = styles;

  return (
    <div className={labelStyle}>
      <div>
        {label}
        {isOptional && <span className={optionalText}>- Opcional</span>}
        <span className={tooltipContainer}>{tooltip}</span>
      </div>
      <div className="text-nowrap">{anchor}</div>
    </div>
  );
};

export default InputFile;
