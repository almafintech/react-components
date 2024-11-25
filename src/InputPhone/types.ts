import { ReactNode } from "react";
import { PhoneInputProps } from "react-phone-input-2";
import { WithTheme } from "..";

export interface InputPhoneProps extends PhoneInputProps, WithTheme {
  label?: string;
  description?: string;
  infoMessage?: string;
  errorMessage?: ReactNode;
  isFormField?: boolean;
  touched?: boolean;
  name: string;
}
