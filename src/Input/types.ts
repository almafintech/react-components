import { InputProps as HeroUIInputProps } from "@heroui/react";
import { ReactNode } from "react";
import { WithTheme } from "..";

/**
 * Extension to `InputProps`. See HeroUI's `Input` documentation.
 * @prop {number} balance Number to show as remaining balance label on top-right edge.
 * @prop {string} [balanceCurrency="ARS"] Name of currency symbol which prefixes balance.
 * @prop {string} [currency="ARS"] Name of currency symbol which prefixes value when `type` is `money`.
 * @prop {ReactNode}[customInfo Element placed on top-right of input when `info` is set to `"CUSTOM"`.
 * @prop {ReactNode} errorMessage Element shown besides alert icon below input when `isInvalid` is set.
 * @prop {string} initialValue Initial value.
 * @prop {boolean} isFormField Uses form-style label if set.
 * @prop {boolean} isNumberPercentage Appends a percentage sign if set (`number` type only).
 * @prop {number} maxLength Length limit in characters.
 * @prop {"BALANCE" | "CUSTOM" } info Determines what to display on top-right section of input.
 * @prop {ReactNode} tooltip Unimplemented.
 * @prop {boolean} touched Whether input was touched or not. Set on `onChanged` calls.
 * @prop {"text" | "number" | "search" | "password" | "money"} [type="text"] Input type. `number` forces value to be a
 * 	valid float, `search` prepends a magnifying glass icon, `password` obfuscates value (user-toggelable) and `money`
 * 	prepends a currency symbol.
 */

export type InputType =
  | "text"
  | "number"
  | "search"
  | "password"
  | "money"
  | "cuit"
  | "dni";

export interface InputProps extends HeroUIInputProps, WithTheme {
  balance?: number;
  balanceCurrency?: string;
  currency?: string;
  customInfo?: ReactNode;
  errorMessage?: ReactNode;
  infoMessage?: ReactNode;
  initialValue?: string;
  isFormField?: boolean;
  isNumberPercentage?: boolean;
  maxLength?: number;
  info?: "BALANCE" | "CUSTOM";
  tooltip?: ReactNode;
  touched?: boolean;
  type?: InputType;
  hasLabel?: boolean;
  isLoading?: boolean;
}
