import { ReactNode } from "react";
import { TextAreaProps as HeroUITextAreaProps } from "@heroui/react";
import { WithTheme } from "..";

/*
 * Extension to `TextAreaProps`. See HeroUI's `Textarea` documentation.
 * @prop {ReactNode} errorMessage Element shown besides alert icon below input when `isInvalid` is set.
 * @prop {string} initialValue Initial value.
 * @prop {boolean} isFormField Uses form-style label if set.
 * @prop {number} maxLength Length limit in characters.
 * @prop {boolean} touched Whether input was touched or not. Set on `onChanged` calls.
 */

export interface InputTextAreaProps extends HeroUITextAreaProps, WithTheme {
  errorMessage?: ReactNode;
  initialValue?: string;
  isFormField?: boolean;
  maxLength?: number;
  touched?: boolean;
}
