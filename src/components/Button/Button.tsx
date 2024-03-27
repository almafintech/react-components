import { forwardRef } from "react";
import styles from "./Button.module.scss";
import { Button as NextUiButton } from "@nextui-org/button";
import LoadingDots from "../LoadingDots/LoadingDots";
import { ButtonProps } from "./Button.types";
import { colors } from "../../styles/variables";

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
      ...rest
    },
    ref
  ) => {
    const { primary, secondary, tertiary, loadingButton, mobileButton } =
      styles;
    const { white, primary300 } = colors;

    const variantsStyles = {
      primary,
      secondary,
      tertiary,
    };

    const variantsLoadingStyles = {
      primary: white,
      secondary: primary300,
      tertiary: primary300,
    };

    return (
      <NextUiButton
        {...rest}
        ref={ref} // Forward the ref to the NextUiButton component
        aria-expanded="false"
        disableAnimation={disableAnimation}
        disableRipple={disableRipple}
        className={`${variantsStyles[variant]} 
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
