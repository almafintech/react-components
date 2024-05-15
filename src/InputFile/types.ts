import { ReactNode } from "react";

export type InputFileErrorsTypes =
  | "format_error"
  | "size_error"
  | "length_error"
  | "selfie_error";

export type FileData = {
  id: number;
  name: string;
};

export interface InputFileProps {
  className?: string;
  error?: boolean;
  fileData?: FileData;
  infoText?: string;
  initialValue?: File | null;
  isLoading?: boolean;
  maxSize: number; // In megabytes
  name: string;
  onFileDownload?: (file: FileData) => void;
  onFileRemove?: () => void;
  onFileUpload?: (file: File) => void;
  selectedFile?: File | null;
  setError?: (error: InputFileErrorsTypes | null) => void;
  text?: string | ReactNode;
  validTypes: string[];
}
