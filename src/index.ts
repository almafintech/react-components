import "./styles/global.scss";

export * from "./Alert";
export * from "./Button";
export * from "./Checkbox";
export * from "./ControlledRadio";
export * from "./DatePicker";
export * from "./Dropdown";
export * from "./Input";
export * from "./InputFile";
export * from "./InputPhone";
export * from "./InputSelect";
export * from "./LoadingDots";
export * from "./LoadingCircle";
export * from "./Modal";
export * from "./RoundedButton";
export * from "./Skeleton";
export * from "./Table";
export * from "./ToastMessage";
export * from "./InputAddress";
export * from "./TokenCard";
export * from "./Tooltip";
export * from "./InputTextArea";
export * from "./RadioGroup";
export * from "./Message";
export * from "./Switch";
export * from "./Tabs";

export type Theme = "byma";

export interface WithTheme {
  /**
   * Apply theme colors to the component
   */
  theme?: Theme;
}
