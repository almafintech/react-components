import { DragEvent, useCallback, useEffect, useRef, useState } from "react";
import saveAs from "file-saver";
import { FileWithDetails, InputFileProps } from "./types";
import InputFileDefault from "./InputFileDefault";

import replaceIcon from "../../assets/images/ui/icons/repeat-icon.svg";
import SuccessIcon from "../../assets/images/ui/icons/ui-icon-success-bg-dark.svg";
import TrashIcon from "../../assets/images/ui/icons/ui-icon-trash.svg";
import DownloadIcon from "../../assets/images/ui/icons/ui-icon-download.svg";
import ErrorIcon from "../../assets/images/ui/icons/ui-icon-error-exclamation-filled.svg";

import styles from "./InputFile.module.scss";

interface InputFileMultipleProps
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

const InputFileMultiple = ({
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
}: InputFileMultipleProps) => {
  const {
    hiddenInputFile,
    fileDetailsContainer,
    fileNameContainer,
    actionsContainer,
    replaceContainer,
  } = styles;

  const [files, setFiles] = useState<FileWithDetails[] | null>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const hiddenInputReplaceRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleDropOrInputChange = (
    e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    // setDragging(false);

    const droppedFiles =
      "dataTransfer" in e
        ? e.dataTransfer.files
        : e.target.files && e.target.files;

    if (droppedFiles) {
      handleFileChange(Array.from(droppedFiles));
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

  const handleFileChange = (inputFiles: File[]) => {
    for (const file of inputFiles) {
      if (isValidFile(file)) {
        setFiles((prevFiles) => [...(prevFiles ? prevFiles : []), { file }]);
        onFileUpload && !isLoading && onFileUpload(file);
      } else {
        const fileWithDetails = {
          file,
          error: true,
          errorMessage: getErrorMessage(file),
        };
        setFiles((prevFiles = []) => [
          ...(prevFiles ? prevFiles : []),
          fileWithDetails,
        ]);
        onFileRemove && onFileRemove(file);
      }
    }
  };

  const handleFileDownload = (file: File) => {
    file?.arrayBuffer().then((arrayBuffer) => {
      const blob = new Blob([new Uint8Array(arrayBuffer)], {
        type: file.type,
      });
      saveAs(blob, `${file.name}`);
    });
  };

  const handleFileReplace = (
    e: React.ChangeEvent<HTMLInputElement>,
    originalFile: File
  ) => {
    const newFile = e.target.files && e.target.files[0];
    const indexToReplace = (files as FileWithDetails[]).findIndex(
      (f) => f.file === originalFile
    );

    if (newFile) {
      if (isValidFile(newFile)) {
        setFiles(
          (prevFiles) =>
            prevFiles?.map((file, i) =>
              i === indexToReplace ? { file: newFile } : file
            ) as FileWithDetails[]
        );
        onFileUpload && !isLoading && onFileUpload(newFile);
      } else {
        const fileWithDetails = {
          file: newFile,
          error: true,
          errorMessage: getErrorMessage(newFile),
        };
        setFiles(
          (prevFiles) =>
            prevFiles?.map((file, i) =>
              i === indexToReplace ? fileWithDetails : file
            ) as FileWithDetails[]
        );
        onFileRemove && onFileRemove(originalFile);
      }
    }
  };

  const handleFileRemove = useCallback((fileToRemove: File) => {
    setFiles((prevFiles) =>
      (prevFiles as FileWithDetails[]).filter((f) => f.file !== fileToRemove)
    );
    onFileRemove && onFileRemove(fileToRemove);
  }, []);

  useEffect(() => {
    if (initialValue && Array.isArray(initialValue)) {
      handleFileChange(initialValue);
    } else {
      setFiles(null);
    }
  }, [initialValue]);

  return (
    <div>
      <input
        ref={hiddenInputRef}
        className={hiddenInputFile}
        type="file"
        accept={validTypes?.join(",")}
        onChange={handleDropOrInputChange}
        id={`input-file-upload-${name}`}
        multiple={true}
      />
      <InputFileDefault
        name={name}
        text={text}
        handleDrag={handleDrag}
        handleDropOrInputChange={handleDropOrInputChange}
        infoTextPosition={infoTextPosition}
        labelProps={{ ...labelProps }}
      />
      <div className="flex flex-col mt-4 px-6 gap-4">
        {files?.map(({ file, error, errorMessage }, index) =>
          error ? (
            <div className={fileDetailsContainer}>
              <div className={fileNameContainer}>
                <img src={ErrorIcon} width={16} height={16} />
                <div>
                  <p>{file.name}</p>
                  <span>{errorMessage}</span>
                </div>
              </div>
              <div className={actionsContainer}>
                <div className={replaceContainer}>
                  <input
                    ref={(el) => (hiddenInputReplaceRefs.current[index] = el)}
                    className={hiddenInputFile}
                    type="file"
                    accept={validTypes?.join(",")}
                    onChange={(e) => handleFileReplace(e, file)}
                    id={`input-file-replace-${name}-${index}`}
                  />
                  <img src={replaceIcon} width={18} height={18} />
                </div>
                <img src={TrashIcon} onClick={() => handleFileRemove(file)} />
              </div>
            </div>
          ) : (
            <div className={fileDetailsContainer}>
              <div className={fileNameContainer}>
                <img src={SuccessIcon} width={16} height={16} />
                <p>{file.name}</p>
              </div>
              <div className={actionsContainer}>
                <img
                  src={DownloadIcon}
                  onClick={() => handleFileDownload(file)}
                />
                <img src={TrashIcon} onClick={() => handleFileRemove(file)} />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default InputFileMultiple;
