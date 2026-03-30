import { CSSProperties } from "react";
import { ThemeProviderProps, Theme } from "./types";

const parsedVariables: Record<string, string> = {
  // Primary scale
  primary50: "--primary-light-50",
  primary100: "--primary-light-100",
  primary200: "--primary-light-200",
  primary300: "--primary-normal-300",
  primary400: "--primary-normal-400",
  primary500: "--primary-normal-500",
  primary600: "--primary-dark-600",
  primary700: "--primary-dark-700",
  primary800: "--primary-dark-800",
  primary900: "--primary-dark-900",
  // Secondary scale
  secondary50: "--secondary-light-50",
  secondary100: "--secondary-light-100",
  secondary200: "--secondary-light-200",
  secondary300: "--secondary-normal-300",
  secondary400: "--secondary-normal-400",
  secondary500: "--secondary-normal-500",
  secondary600: "--secondary-dark-600",
  secondary700: "--secondary-dark-700",
  secondary800: "--secondary-dark-800",
  secondary900: "--secondary-dark-900",
  // Accent scale
  accent50: "--accent-light-50",
  accent100: "--accent-light-100",
  accent200: "--accent-light-200",
  accent300: "--accent-normal-300",
  accent400: "--accent-normal-400",
  accent500: "--accent-normal-500",
  accent600: "--accent-dark-600",
  accent700: "--accent-dark-700",
  accent800: "--accent-dark-800",
  accent900: "--accent-dark-900",
  // Grey scale
  white: "--white",
  greyscale50: "--greyscale-50",
  greyscale100: "--greyscale-100",
  greyscale200: "--greyscale-200",
  greyscale300: "--greyscale-300",
  greyscale400: "--greyscale-400",
  greyscale500: "--greyscale-500",
  greyscale600: "--greyscale-600",
  greyscale700: "--greyscale-700",
  greyscale800: "--greyscale-800",
  greyscale900: "--greyscale-900",
  greyscale950: "--greyscale-950",
  black: "--black",
  // Error scale
  e50: "--e50",
  e75: "--e75",
  e100: "--e100",
  e200: "--e200",
  e300: "--e300",
  e400: "--e400",
  e500: "--e500",
  // Warning scale
  w50: "--w50",
  w75: "--w75",
  w100: "--w100",
  w200: "--w200",
  w300: "--w300",
  w400: "--w400",
  w500: "--w500",
  // Success scale
  s50: "--s50",
  s75: "--s75",
  s100: "--s100",
  s200: "--s200",
  s300: "--s300",
  s400: "--s400",
  s500: "--s500",
  // Info scale
  i50: "--i50",
  i75: "--i75",
  i100: "--i100",
  i200: "--i200",
  i300: "--i300",
  i400: "--i400",
  i500: "--i500",

  fontFamily: "--font-family",
};

const ThemeProvider = ({ theme, children }: ThemeProviderProps) => {
  const variables = Object.entries(theme).reduce<CSSProperties>(
    (acc, [key, value]) => {
      const cssVar = parsedVariables[key as keyof Theme];
      if (cssVar && value) {
        (acc as Record<string, string>)[cssVar] = value;
      }
      return acc;
    },
    {},
  );

  return <div style={variables}>{children}</div>;
};

export default ThemeProvider;
