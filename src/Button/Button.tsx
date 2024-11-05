import { forwardRef } from "react";
import styles from "./Button.module.scss";
import { Button as NextUiButton } from "@nextui-org/button";
import { LoadingDots } from "../LoadingDots";
import { ButtonProps } from "./types";
import { colors } from "../styles/variables";
import { isByma } from "../utils";

/**
 * Allow users to perform an action with a single click
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      isLoading,
      className,
      variant = "primary",
      size = "desktop",
      disableRipple = true,
      disableAnimation = true,
      theme,
      ...rest
    },
    ref
  ) => {
    const isBymaTheme = isByma(theme);

    const { primary, secondary, tertiary, loadingButton, mobileButton } =
      styles;
    const { white, primary300, bymaPrimaryDefault } = colors;

    const variantsStyles = {
      primary,
      secondary,
      tertiary,
    };

    const variantsLoadingStyles = {
      primary: white,
      secondary: isBymaTheme ? bymaPrimaryDefault : primary300,
      tertiary: isBymaTheme ? bymaPrimaryDefault : primary300,
    };

    return (
      <NextUiButton
        {...rest}
        ref={ref} // Forward the ref to the NextUiButton component
        aria-expanded="false"
        disableAnimation={disableAnimation}
        disableRipple={disableRipple}
        className={`${isBymaTheme ? "byma" : ""} ${variantsStyles[variant]} 
        ${isLoading ? loadingButton : ""} 
        ${size === "mobile" ? mobileButton : ""} 
        ${className || ""}`}
      >
        {isLoading ? (
          <LoadingDots color={variantsLoadingStyles[variant]} />
        ) : (
          text
        )}
      </NextUiButton>
    );
  }
);

export default Button;
