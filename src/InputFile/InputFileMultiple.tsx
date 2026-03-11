import { DragEvent, useCallback, useEffect, useRef, useState } from "react";
import saveAs from "file-saver";
import { FileData, FileWithDetails, InputFileProps } from "./types";
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
    | "initialValue"
  > {
  isValidFile: (file: File) => boolean;
  getErrorMessage: (file: File) => string;
  value?: File | File[] | null;
}

// Generate a unique ID for each file based on its properties
const getUniqueFileId = (file: File) => {
  return `${file.name}-${file.size}-${file.lastModified}`;
};

const InputFileMultiple = ({
  name,
  text,
  validTypes,
  onFileDownload,
  onFileUpload,
  onFileRemove,
  value,
  selectedFile,
  fileData,
  error,
  maxFiles,
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

  const [files, setFiles] = useState<FileWithDetails[] | FileData[] | null>(
    null
  );
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const hiddenInputReplaceRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isFileData = files && files.length > 0 && "id" in files[0];

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
    const isAlreadyUploaded = (file: File) => {
      if (!files || files.length === 0) return false;

      return (files as FileWithDetails[])?.some(
        (f) =>
          f.file.name === file.name &&
          f.file.size === file.size &&
          f.file.lastModified === file.lastModified
      );
    };

    if (isFileData) {
      setFiles(null);
    }

    // Reset file input to ensure we can upload the same file again
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = "";
    }

    // Create a collection of new files to update
    const newFilesToAdd: FileWithDetails[] = [];

    for (const file of inputFiles) {
      if (
        !files ||
        (!isAlreadyUploaded(file) && (!maxFiles || files.length < maxFiles))
      ) {
        if (isValidFile(file)) {
          // Add to new files collection
          newFilesToAdd.push({ file });

          // Check if this file is already part of value
          const fileId = getUniqueFileId(file);
          const isInControlledValue =
            value &&
            Array.isArray(value) &&
            value.some((f) => getUniqueFileId(f) === fileId);

          // Only execute onFileUpload if this is a new file not in value
          if (!isInControlledValue && onFileUpload && !isLoading) {
            onFileUpload(file);
          }
        } else {
          // Add error file
          newFilesToAdd.push({
            file,
            error: true,
            errorMessage: getErrorMessage(file),
          });
        }
      }
    }

    // Update state once with all new files
    if (newFilesToAdd.length > 0) {
      setFiles((prevFiles) => {
        if (!prevFiles) return newFilesToAdd;
        return [...(prevFiles as FileWithDetails[]), ...newFilesToAdd];
      });
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
      (f) => getUniqueFileId(f.file) === getUniqueFileId(originalFile)
    );

    // Early return if no file selected
    if (!newFile) return;

    // Check if the new file is already uploaded elsewhere (except in the position we're replacing)
    const isDuplicate = (files as FileWithDetails[])?.some(
      (f, index) =>
        index !== indexToReplace &&
        getUniqueFileId(f.file) === getUniqueFileId(newFile)
    );

    // Don't allow replacement with a duplicate file
    if (isDuplicate) {
      // Reset the replacement input so the same file can be selected again later if needed
      const index = (files as FileWithDetails[])?.findIndex(
        (f) => getUniqueFileId(f.file) === getUniqueFileId(originalFile)
      );

      // Reset the input value to allow re-uploading the same file
      if (index !== -1 && hiddenInputReplaceRefs.current[index]) {
        const inputRef = hiddenInputReplaceRefs.current[index];
        if (inputRef) {
          inputRef.value = "";
        }
      }

      return;
    }

    // Continue with regular replacement logic
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
  };

  const handleFileRemove = useCallback((fileToRemove: File | FileData) => {
    if ("id" in fileToRemove) {
      setFiles((prevFiles) =>
        (prevFiles as FileData[]).filter((f) => f.id !== fileToRemove.id)
      );
    } else {
      setFiles((prevFiles) => {
        return (prevFiles as FileWithDetails[]).filter((f) => {
          const shouldKeep =
            getUniqueFileId(f.file) !== getUniqueFileId(fileToRemove as File);
          return shouldKeep;
        });
      });
    }

    // Reset the file input to ensure we can re-upload the same file
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = "";
    }

    onFileRemove && onFileRemove(fileToRemove);
  }, []);

  // Handle value prop for controlled cases
  // This effect will run when the component mounts or when value changes
  // It will set the initial files state based on the value prop
  useEffect(() => {
    if (value && Array.isArray(value)) {
      // Filter out non-File objects from value
      const validFiles = value.filter((item) => {
        // Check if it's actually a File object
        const isValidFileObject = item instanceof File;

        if (!isValidFileObject) {
          console.warn(
            `InputFileMultiple: Item in value is not a File object:`,
            item
          );
        }

        return isValidFileObject;
      });

      const currentFiles =
        files && Array.isArray(files) && !isFileData
          ? (files as FileWithDetails[])
          : [];

      const errorFiles = currentFiles.filter((f) => f.error);
      const errorFileIds = errorFiles.map((f) => getUniqueFileId(f.file));

      // Process valid files
      const valueFilesWithDetails: FileWithDetails[] = validFiles.map(
        (file) => {
          if (isValidFile(file)) {
            return { file };
          } else {
            return {
              file,
              error: true,
              errorMessage: getErrorMessage(file),
            };
          }
        }
      );

      // Keep value files that don't overlap with error files
      const filesToKeep = valueFilesWithDetails.filter(
        (f) => !errorFileIds.includes(getUniqueFileId(f.file))
      );

      // Combine preserved error files + new value files
      const newFiles = [...errorFiles, ...filesToKeep];

      // Only update if the files actually changed
      const currentFileIds = currentFiles.map((f) => getUniqueFileId(f.file));
      const newFileIds = newFiles.map((f) => getUniqueFileId(f.file));

      if (
        currentFileIds.length !== newFileIds.length ||
        !currentFileIds.every((id) => newFileIds.includes(id)) ||
        !newFileIds.every((id) => currentFileIds.includes(id))
      ) {
        setFiles(newFiles);
      }
    }
  }, [value, isValidFile, getErrorMessage, files, isFileData, getUniqueFileId]);

  useEffect(() => {
    if (fileData && Array.isArray(fileData)) setFiles(fileData);
  }, [fileData]);

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
        isMobile={isMobile}
        handleDrag={handleDrag}
        handleDropOrInputChange={handleDropOrInputChange}
        labelProps={{ ...labelProps }}
        infoText={infoText}
        infoTextClassName={infoTextClassName}
        infoTextPosition={infoTextPosition}
        replaceImageText={replaceImageText}
        attachImageText={attachImageText}
        isFileUploaded={!!files}
      />
      <div className="flex flex-col mt-4 px-6 gap-4">
        {isFileData &&
          (files as FileData[]).map((file) => (
            <div key={file.id} className={fileDetailsContainer}>
              <div className={fileNameContainer}>
                <img src={SuccessIcon} width={16} height={16} />
                <p>{file.name}</p>
              </div>
              <div className={actionsContainer}>
                <img src={TrashIcon} onClick={() => handleFileRemove(file)} />
              </div>
            </div>
          ))}
        {!isFileData &&
          (files as FileWithDetails[])?.map(({ file, error, errorMessage }) =>
            error ? (
              <div
                key={`error-${getUniqueFileId(file)}`}
                id={`file-${getUniqueFileId(file)}`}
                className={fileDetailsContainer}
              >
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
                      ref={(el) => {
                        const index = (files as FileWithDetails[])?.findIndex(
                          (f) => f.file === file
                        );
                        if (index !== -1) {
                          hiddenInputReplaceRefs.current[index] = el;
                        }
                      }}
                      className={hiddenInputFile}
                      type="file"
                      accept={validTypes?.join(",")}
                      onChange={(e) => handleFileReplace(e, file)}
                      id={`input-file-replace-${name}-${getUniqueFileId(file)}`}
                    />
                    <img src={replaceIcon} width={18} height={18} />
                  </div>
                  <img src={TrashIcon} onClick={() => handleFileRemove(file)} />
                </div>
              </div>
            ) : (
              <div
                key={`file-${getUniqueFileId(file)}`}
                id={`file-${getUniqueFileId(file)}`}
                className={fileDetailsContainer}
              >
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
