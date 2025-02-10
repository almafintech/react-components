import { saveAs } from "file-saver";
import { DragEvent, useCallback, useEffect, useRef, useState } from "react";
import InputFileDefault, { InputFileLabel } from "./InputFileDefault";
import { LoadingDots } from "../LoadingDots";
import { FileData, InputFileProps } from "./types";

import UploadIcon from "../../assets/images/ui/icons/ui-icon-file_upload.svg";
import SuccessIcon from "../../assets/images/ui/icons/ui-icon-success-bg-dark.svg";
import TrashIcon from "../../assets/images/ui/icons/ui-icon-trash.svg";
import DownloadIcon from "../../assets/images/ui/icons/ui-icon-download.svg";
import ErrorIcon from "../../assets/images/ui/icons/ui-icon-error-exclamation-filled.svg";

import styles from "./InputFile.module.scss";

interface InputFileSimpleProps
  extends Omit<
    InputFileProps,
    | "className"
    | "maxSize"
    | "multiple"
    | "formatErrorMessage"
    | "sizeErrorMessage"
  > {
  isValidFile: (file: File) => boolean;
  getErrorMessage: (file: File) => string;
}

const InputFileSimple = ({
  name,
  text,
  validTypes,
  onFileDownload,
  onFileUpload,
  onFileRemove,
  initialValue,
  selectedFile,
  fileData,
  error,
  isLoading,
  infoTextPosition = "bottom",
  infoTextClassName,
  hideDownloadIcon,
  infoText,
  isMobile,
  successMessage = "Archivo cargado con éxito",
  theme,
  replaceImageText = "Reemplazar imagen",
  attachImageText = "Adjuntar imagen",
  isValidFile,
  getErrorMessage,
  ...labelProps
}: InputFileSimpleProps) => {
  const {
    hiddenInputFile,
    topPosition,
    bottomPosition,
    successMessageStyle,
    errorMessageStyle,
    inputFile,
    inputSuccess,
    infoTextStyle,
    fileOptions,
    fileHeader,
    fileContent,
  } = styles;

  // const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | FileData | null>(fileData ?? null);
  const [fileError, setFileError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const hiddenInputRef = useRef<HTMLInputElement>(null);

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
    if (isValidFile(inputFile)) {
      setFileError(false);
      setFile(inputFile);
      onFileUpload && !isLoading && onFileUpload(inputFile);
    } else {
      setFile(inputFile);
      setFileError(true);
      onFileRemove && onFileRemove();
      const errorMessage = getErrorMessage(inputFile);
      setErrorMessage(errorMessage);
    }
  };

  const handleFileDownload = () => {
    const isFileData = file && "id" in file;
    if (isFileData) {
      onFileDownload && onFileDownload(file);
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
    <div>
      <input
        ref={hiddenInputRef}
        className={hiddenInputFile}
        type="file"
        accept={validTypes?.join(",")}
        onChange={handleDropOrInputChange}
        id={`input-file-upload-${name}`}
        multiple={false}
      />
      {!file || fileError || isMobile ? (
        <InputFileDefault
          name={name}
          text={text}
          isMobile={isMobile}
          infoText={infoText}
          infoTextPosition={infoTextPosition}
          infoTextClassName={infoTextClassName}
          replaceImageText={replaceImageText}
          attachImageText={attachImageText}
          isFileUploaded={!!file}
          handleDrag={handleDrag}
          handleDropOrInputChange={handleDropOrInputChange}
          labelProps={{ ...labelProps }}
        />
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
                    <img src={UploadIcon} />
                    <label
                      id={`label-file-upload-${name}`}
                      htmlFor={`input-file-upload-${name}`}
                    >
                      Cargando {file.name}
                    </label>
                  </>
                ) : (
                  <>
                    <img src={SuccessIcon} />
                    <p>{file.name}</p>
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
                        src={DownloadIcon}
                        onClick={() => handleFileDownload()}
                      />
                    )}
                    <img src={TrashIcon} onClick={() => handleFileRemove()} />
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

      {isMobile && file && !fileError && (
        <div className={successMessageStyle}>
          <img src={SuccessIcon} />
          <p>{successMessage}</p>
        </div>
      )}
      {fileError && (
        <div className={errorMessageStyle}>
          <img src={ErrorIcon} />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default InputFileSimple;
