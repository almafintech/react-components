import {
  LegacyRef,
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "./TokenCard.module.scss";
import { TokenCardProps } from "./types";
import { Player } from "@lottiefiles/react-lottie-player";
import lottieJson from "./success-lottie.json";
import errorLottieJson from "./error-lottie.json";
import { ToastMessage } from "../ToastMessage";
import Countdown from "react-countdown-now";
import { Button } from "../Button";
import { Alert } from "../Alert";
import HeaderModal from "./HeaderModal";
import { InputToken } from "../InputToken";
import { useElementDimensions } from "../hooks";
import { Message } from "../Message";
import { isByma } from "../utils";

const TokenCard = forwardRef(
  (
    {
      title,
      subtitle,
      children,
      lastSendToken,
      autoSendToken = false,
      hideResendButton,
      onAuthorize,
      onResend,
      onSuccess,
      onCancel,
      className,
      primaryButtonText,
      secondaryButtonText,
      theme,
      resendText = "Reenviar mail",
      incorrectTokenErrorMessage = "El token es incorrecto.",
      lengthValidationErrorMessage = "Deben ser 7 caracteres.",
    }: TokenCardProps,
    ref
  ) => {
    const {
      countdownContainer,
      loading,
      hide,
      fadeOutDiv,
      childrenAlert,
      toastMessage,
      inputTokenGroup,
      inputToken,
      buttonGroup,
      tokenContainer,
      centerButton,
    } = styles;

    const isBymaTheme = isByma(theme);

    const [status, setStatus] = useState({
      error: true,
      message: "",
      loading: false,
    });
    const [token, setToken] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const playerRef: LegacyRef<Player> | undefined = useRef(null);
    const playerErrorRef: LegacyRef<Player> | undefined = useRef(null);

    const { elementRef, dimensions } = useElementDimensions();

    useEffect(() => {
      if (token) {
        validateToken(token);
      }
    }, []);

    const handleAnimationEnd = () => {
      onSuccess();
    };

    const handleBlur = () => {
      if (token.length < 7) {
        setStatus({
          error: true,
          message: lengthValidationErrorMessage,
          loading: false,
        });
      }
    };

    const validateToken = (value: string) => {
      const isValid = value.toLocaleUpperCase().match(/^([\dA-Z])*$/);
      const isValidLength = value.length === 7;
      setStatus({
        ...status,
        error: !isValid || !isValidLength,
        message: !isValid ? incorrectTokenErrorMessage : "",
      });
    };

    useEffect(() => {
      validateToken(token);
    }, [token]);

    const authorizeToken = async () => {
      setStatus({
        ...status,
        loading: true,
      });

      const { success, message, error } = await onAuthorize(token);

      if (error) {
        setShowError(true);
      }

      if (success) {
        setShowSuccess(true);
        setStatus({
          ...status,
          loading: false,
          error: false,
        });
        setToken("");
      } else {
        setStatus({
          ...status,
          loading: false,
          error: true,
          message: message || "",
        });
      }
    };

    const handleResend = async (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      const { success, message, error } = (await onResend()) as {
        success: boolean;
        error?: boolean;
        message?: string;
      };

      if (success) {
        setStatus({
          ...status,
          loading: false,
          error: false,
        });
      } else if (error) {
        setStatus({
          ...status,
          error: true,
          message: message || "",
        });
      }
    };

    useEffect(() => {
      if (
        !status.error &&
        !status.loading &&
        token &&
        autoSendToken &&
        !showSuccess &&
        !showError
      ) {
        authorizeToken();
      }
    }, [status]);

    useEffect(() => {
      if (showSuccess) {
        setTimeout(() => {
          playerRef.current?.play();
        }, 1000);
      }
    }, [showSuccess]);

    useEffect(() => {
      if (showError) {
        setTimeout(() => {
          playerErrorRef.current?.play();
        }, 1000);
      }
    }, [showError]);

    const styleForError =
      dimensions.width < 576
        ? { left: "0rem", top: dimensions.height }
        : { left: "20rem", top: "0rem" };

    const getTertiaryButtonText = (
      minutes: number,
      seconds: number,
      completed: boolean
    ) => {
      return completed
        ? resendText
        : `${resendText} ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    useImperativeHandle(ref, () => ({
      authorizeToken,
    }));

    return (
      <div
        className={`${isBymaTheme ? "byma" : ""} ${tokenContainer} ${className ?? ""}`}
      >
        <div className={`${loading} ${fadeOutDiv} ${hide}`}>
          {showSuccess && (
            <Player
              onEvent={(event) => {
                if (event === "complete" || event === "error") {
                  setTimeout(() => {
                    handleAnimationEnd();
                  }, 500);
                }
              }}
              ref={playerRef}
              src={lottieJson}
              keepLastFrame
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          )}
        </div>
        <ToastMessage
          theme={theme}
          messageId="tokenModal"
          limit={1}
          closeButton={false}
          closeOnClick={false}
          draggable={false}
          className={toastMessage}
        />

        {showSuccess && (
          <Player
            onEvent={(event) => {
              if (event === "complete" || event === "error") {
                handleAnimationEnd();
              }
            }}
            ref={playerRef}
            src={lottieJson}
            keepLastFrame
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        )}
        {showError && (
          <Player
            onEvent={(event) => {
              if (event === "complete" || event === "error") {
                setTimeout(() => {
                  handleAnimationEnd();
                }, 500);
              }
            }}
            ref={playerErrorRef}
            src={errorLottieJson}
            keepLastFrame
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        )}

        <div
          className={`position-relative ${fadeOutDiv} ${
            showSuccess || showError ? hide : ""
          }`}
        >
          {title && (
            <HeaderModal
              theme={theme}
              className="mb-4"
              title={title}
              subtitle={subtitle}
            />
          )}
          {children && (
            <Alert
              theme={theme}
              className={childrenAlert}
              children={children}
              variant="INFO"
            />
          )}
          <div className={inputTokenGroup}>
            <div className={inputToken} ref={elementRef}>
              <InputToken
                theme={theme}
                charactersAmount={7}
                token={token}
                setToken={setToken}
                handleOnBlur={() => handleBlur()}
              />
              {status.error && status.message && (
                <Message
                  theme={theme}
                  message={status.message}
                  variant="error"
                />
              )}
            </div>
          </div>
          <div
            className={`${buttonGroup} ${primaryButtonText || secondaryButtonText ? "" : centerButton}`}
          >
            {primaryButtonText && (
              <Button
                theme={theme}
                variant="primary"
                type="button"
                text={primaryButtonText}
                disabled={status.error || status.loading}
                onClick={authorizeToken}
                className="w-100"
              />
            )}
            {secondaryButtonText && (
              <Button
                theme={theme}
                variant="secondary"
                type="button"
                text={secondaryButtonText}
                disabled={status.loading}
                onClick={onCancel}
                className="w-100"
              />
            )}
            {!hideResendButton && (
              <Countdown
                date={lastSendToken}
                key={lastSendToken}
                renderer={({ minutes, seconds, completed }) => {
                  return (
                    <div style={styleForError} className={countdownContainer}>
                      <Button
                        theme={theme}
                        variant="tertiary"
                        type="button"
                        text={getTertiaryButtonText(
                          minutes,
                          seconds,
                          completed
                        )}
                        disabled={!completed || status.loading}
                        onClick={handleResend}
                        className={`px-0 ${
                          !completed || status.loading
                            ? ""
                            : "text-decoration-underline"
                        }`}
                      />
                    </div>
                  );
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default TokenCard;
