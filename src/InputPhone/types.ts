import { ReactNode } from "react";
import { PhoneInputProps } from "react-phone-input-2";

export interface InputPhoneProps extends PhoneInputProps {
  description?: string;
  infoMessage?: string;
  errorMessage?: ReactNode;
  isFormField?: boolean;
  touched?: boolean;
  name: string;
}
