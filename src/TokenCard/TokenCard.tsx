import { LegacyRef, useEffect, useRef, useState } from "react";
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
import ErrorIcon from "../../assets/images/ui/icons/ui-icon-error-exclamation-filled.svg";
import { InputToken } from "../InputToken";
import { useElementDimensions } from "../hooks";

const TokenCard = ({
  title,
  subtitle,
  children,
  lastSendToken,
  autoSendToken = false,
  hideResendButton,
  onAuthorize,
  onResend,
  onSuccess,
}: TokenCardProps) => {
  const {
    countdownContainer,
    errorMessage,
    loading,
    hide,
    fadeOutDiv,
    childrenAlert,
    toastMessage,
    inputTokenGroup,
    inputToken,
  } = styles;

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
  console.log(dimensions);

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
        message: "Deben ser 7 caracteres.",
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
      message: !isValid ? "El token es incorrecto." : "",
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
    // windowWidth < 576
    //   ? { left: "0rem", top: dimensions.height }
    // :
    { left: "20rem", top: "0rem" };

  const getTertiaryButtonText = (
    minutes: number,
    seconds: number,
    completed: boolean
  ) => {
    const text = "Reenviar mail";

    return completed
      ? text
      : `${text} ${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const ErrorMessage = ({ message }: { message: string }) => {
    return (
      <div className={errorMessage}>
        <img src={ErrorIcon} />
        <span>{message}</span>
      </div>
    );
  };

  return (
    <>
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
          <HeaderModal className="mb-4" title={title} subtitle={subtitle} />
        )}
        {children && (
          <Alert className={childrenAlert} children={children} variant="INFO" />
        )}
        <div className={inputTokenGroup}>
          <div className={inputToken} ref={elementRef}>
            <InputToken
              charactersAmount={7}
              token={token}
              setToken={setToken}
              handleOnBlur={() => handleBlur()}
            />
            {status.error && status.message && (
              <ErrorMessage message={status.message} />
            )}
          </div>
        </div>

        {!hideResendButton && (
          <Countdown
            date={lastSendToken}
            key={lastSendToken}
            renderer={({ minutes, seconds, completed }) => {
              return (
                <div style={styleForError} className={countdownContainer}>
                  <Button
                    variant="tertiary"
                    type="button"
                    text={getTertiaryButtonText(minutes, seconds, completed)}
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
    </>
  );
};

export default TokenCard;
