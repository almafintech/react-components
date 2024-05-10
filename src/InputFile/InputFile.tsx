import { DragEvent, useCallback, useEffect, useState } from "react";
import { saveAs } from "file-saver";
import styles from "./InputFile.module.scss";
import UploadIcon from "../../assets/images/ui/icons/ui-icon-file_upload.svg";
import ErrorIcon from "../../assets/images/ui/icons/ui-icon-error-exclamation-filled.svg";
import SuccessIcon from "../../assets/images/ui/icons/ui-icon-success-bg-dark.svg";
import TrashIcon from "../../assets/images/ui/icons/ui-icon-trash.svg";
import DownloadIcon from "../../assets/images/ui/icons/ui-icon-download.svg";
import LoadingDots from "../LoadingDots/LoadingDots";
import { InputFileProps } from "./types";

const InputFile = ({
  name,
  text,
  infoText,
  onFileUpload,
  onFileRemove,
  onFileDownload,
  maxSize,
  validTypes,
  initialValue,
  className,
  selectedFile,
  fileData,
  error,
  isLoading,
}: InputFileProps) => {
  const {
    inputFile,
    fileContent,
    errorMessageStyle,
    fileHeader,
    fileOptions,
    inputError,
    inputSuccess,
    container,
    infoTextStyle,
  } = styles;

  // const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>();
  const [fileError, setFileError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();

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

    if (allowedTypes.has(inputFile.type) && inputFile.size <= maxFileSize) {
      setFileError(false);
      setFile(inputFile);
      onFileUpload && !isLoading && onFileUpload(inputFile);
    } else {
      setFile(inputFile);
      setFileError(true);
      onFileRemove && onFileRemove();
      !allowedTypes.has(inputFile.type)
        ? setErrorMessage("Formato de archivo inválido.")
        : setErrorMessage(
            `El archivo adjunto excede el peso máximo permitido de ${maxSize}mb.`
          );
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
    onFileRemove && onFileRemove();
  }, []);

  useEffect(() => {
    if (selectedFile) {
      handleFileChange(selectedFile);
    } else if (!fileError && !fileData) {
      handleFileRemove();
    }
  }, [selectedFile]);

  useEffect(() => {
    if (initialValue) {
      handleFileChange(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (error) {
      setFileError(true);
      onFileRemove && onFileRemove();
    }
  }, [error]);

  return (
    <div className={`${container} ${className ?? ""}`}>
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDropOrInputChange}
        className={`
      ${inputFile}
      ${
        (file || fileData) && !fileError && !isLoading
          ? inputSuccess
          : inputError
      }`}
      >
        {(!file && !fileData) || (file && fileError) ? (
          <div className={fileHeader}>
            <img src={UploadIcon} />
            <label
              id={`label-file-upload-${name}`}
              htmlFor={`input-file-upload-${name}`}
            >
              {text}
            </label>
          </div>
        ) : (
          <div className={fileContent}>
            <div className={fileHeader}>
              {isLoading ? (
                <>
                  <UploadIcon />
                  <label
                    id={`label-file-upload-${name}`}
                    htmlFor={`input-file-upload-${name}`}
                  >
                    Cargando {file?.name}
                  </label>
                </>
              ) : (
                <>
                  <SuccessIcon />
                  <p>{fileData ? fileData.name : file?.name}</p>
                </>
              )}
            </div>
            <div className={fileOptions}>
              {isLoading ? (
                <LoadingDots color="#acb3bf" />
              ) : (
                <>
                  <img src={DownloadIcon} onClick={handleFileDownload} />
                  <img src={TrashIcon} onClick={handleFileRemove} />
                </>
              )}
            </div>
          </div>
        )}
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .pdf"
          onChange={handleDropOrInputChange}
          id={`input-file-upload-${name}`}
          multiple={false}
        />
      </div>
      {infoText && <p className={infoTextStyle}>{infoText}</p>}
      {file && fileError && (
        <div className={errorMessageStyle}>
          <ErrorIcon />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default InputFile;
