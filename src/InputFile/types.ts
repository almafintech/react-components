import { ReactNode } from "react";
import { WithTheme } from "..";

export type InputFileErrorsTypes =
  | "format_error"
  | "size_error"
  | "length_error"
  | "selfie_error";

export type FileData = {
  id: number;
  name: string;
};

export type FileWithDetails = {
  file: File;
  error?: boolean;
  errorMessage?: string;
};

export interface InputFileProps extends WithTheme {
  className?: string;
  error?: boolean;
  fileData?: FileData | FileData[];
  infoText?: string;
  infoTextPosition?: "bottom" | "top";
  infoTextClassName?: string;
  value?: File | null | File[];
  isLoading?: boolean;
  hideDownloadIcon?: boolean;
  /** maxSize in MB */
  maxSize: number; // In megabytes
  name: string;
  label?: string | ReactNode;
  isMobile?: boolean;
  isOptional?: boolean;
  multiple?: boolean;
  maxFiles?: number;
  anchor?: ReactNode;
  tooltip?: ReactNode;
  onFileDownload?: (file: FileData) => void;
  onFileRemove?: (file?: File | FileData) => void;
  onFileUpload?: (file: File) => void;
  selectedFile?: File | null;
  setError?: (error: InputFileErrorsTypes | null) => void;
  text?: string | ReactNode;
  successMessage?: string;
  validTypes: string[];
  formatErrorMessage?: string;
  sizeErrorMessage?: string;
  replaceImageText?: string;
  attachImageText?: string;
}
