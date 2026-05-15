import { CSSProperties, ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as RadixToast from "@radix-ui/react-toast";
import styles from "./ToastMessage.module.scss";
import {
  ShowToastOptions,
  ToastEntry,
  ToastMessageProps,
  ToastType,
} from "./types";
import { ReactComponent as SuccessIcon } from "@icons/successIcon.svg";
import { ReactComponent as InfoIcon } from "@icons/infoIcon.svg";
import { ReactComponent as WarnIcon } from "@icons/warningIcon.svg";
import { ReactComponent as ErrorIcon } from "@icons/errorIcon.svg";
import { ReactComponent as CloseIcon } from "@icons/close.svg";
import { Button } from "../Button";

// ─── Module-level store ──────────────────────────────────────────────────────

type Listener = (toasts: ToastEntry[]) => void;
const _listeners: Record<string, Listener[]> = {};
const _toasts: Record<string, ToastEntry[]> = {};

const subscribeContainer = (containerId: string, cb: Listener) => {
  if (!_listeners[containerId]) _listeners[containerId] = [];
  _listeners[containerId].push(cb);
  return () => {
    _listeners[containerId] = _listeners[containerId].filter((l) => l !== cb);
  };
};

const notifyListeners = (containerId: string) => {
  _listeners[containerId]?.forEach((l) => l(_toasts[containerId] ?? []));
};

const addToast = (containerId: string, entry: ToastEntry) => {
  _toasts[containerId] = [entry]; // limit: 1 per container
  notifyListeners(containerId);
};

const removeToast = (containerId: string, id: string) => {
  _toasts[containerId] = (_toasts[containerId] ?? []).filter(
    (t) => t.id !== id,
  );
  notifyListeners(containerId);
};

// ─── Icons ───────────────────────────────────────────────────────────────────

const TYPE_ICONS: Record<Exclude<ToastType, "CUSTOM">, ReactNode> = {
  SUCCESS: <SuccessIcon />,
  INFO: <InfoIcon />,
  WARNING: <WarnIcon />,
  ERROR: <ErrorIcon />,
};

// ─── ToastItem ───────────────────────────────────────────────────────────────

interface ToastItemProps {
  entry: ToastEntry;
  onRemove: () => void;
}

const ToastItem = ({ entry, onRemove }: ToastItemProps) => {
  const { content, options } = entry;
  const {
    type = "CUSTOM",
    title,
    timer = true,
    icon,
    showIcon = true,
    action,
    hideCloseIcon = false,
    duration,
  } = options;

  const {
    root,
    container,
    neutral,
    innerContent,
    iconContainer,
    textContent,
    title: titleClass,
    description: descriptionClass,
    spacer,
    closeButton,
    ripple: rippleClass,
    timer: timerClass,
    timerPaused,
    timerSuccess,
    timerInfo,
    timerWarning,
    timerError,
  } = styles;

  const TYPE_TIMER_CLASS: Record<Exclude<ToastType, "CUSTOM">, string> = {
    SUCCESS: timerSuccess,
    INFO: timerInfo,
    WARNING: timerWarning,
    ERROR: timerError,
  };

  const descRef = useRef<HTMLDivElement>(null);
  const onRemoveRef = useRef(onRemove);
  onRemoveRef.current = onRemove;

  const [computedDuration, setComputedDuration] = useState<number | null>(
    duration ?? null,
  );

  useLayoutEffect(() => {
    if (duration !== undefined) return;
    const el = descRef.current;
    if (!el) { setComputedDuration(4000); return; }
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 22;
    const isMultiLine = el.scrollHeight > lineHeight * 1.5;
    const hasLink = el.querySelector("a") !== null;
    setComputedDuration(isMultiLine || hasLink ? 8000 : 4000);
  }, [duration]);

  const [open, setOpen] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (computedDuration === null) return;
    remainingRef.current = computedDuration;
    startTimeRef.current = Date.now();
    timeoutRef.current = setTimeout(() => setOpen(false), computedDuration);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [computedDuration]);

  const [hovered, setHovered] = useState(false);
  const [rippling, setRippling] = useState(false);

  const pauseTimer = () => {
    if (timeoutRef.current === null) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    remainingRef.current = (remainingRef.current ?? 0) - (Date.now() - startTimeRef.current);
    setHovered(true);
  };

  const resumeTimer = () => {
    const remaining = remainingRef.current;
    if (timeoutRef.current !== null || remaining === null || remaining <= 0) return;
    startTimeRef.current = Date.now();
    timeoutRef.current = setTimeout(() => setOpen(false), remaining);
    setHovered(false);
  };

  // Remove from store after fade-out animation completes
  useEffect(() => {
    if (open) return;
    const cleanup = setTimeout(() => onRemoveRef.current(), 300);
    return () => clearTimeout(cleanup);
  }, [open]);

  const isTyped = type !== "CUSTOM";

  return (
    <RadixToast.Root
      className={root}
      open={open}
      duration={Infinity}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
      onClick={() => setOpen(false)}
      onOpenChange={(next) => { if (!next) setOpen(false); }}
    >
      <div className={`${container}${!isTyped ? ` ${neutral}` : ""}`}>
        <div className={innerContent}>
          {isTyped && showIcon && (
            <div className={iconContainer}>
              {TYPE_ICONS[type as Exclude<ToastType, "CUSTOM">]}
            </div>
          )}
          {!isTyped && showIcon && icon && (
            <div className={iconContainer}>{icon}</div>
          )}
          <div className={textContent}>
            {title && (
              <RadixToast.Title className={titleClass}>
                {title}
              </RadixToast.Title>
            )}
            <RadixToast.Description className={descriptionClass} ref={descRef}>
              {content}
            </RadixToast.Description>
          </div>
        </div>

        {action && (
          <div className={spacer}>
            <Button {...action} variant="tertiary" />
          </div>
        )}
      </div>

      {isTyped && timer && computedDuration !== null && (
        <div
          className={`${timerClass} ${TYPE_TIMER_CLASS[type as Exclude<ToastType, "CUSTOM">]}${hovered ? ` ${timerPaused}` : ""}`}
          style={{ "--toast-duration": `${computedDuration}ms` } as CSSProperties}
        />
      )}

      {!hideCloseIcon && (
        <button
          className={closeButton}
          aria-label="Cerrar"
          onClick={(e) => {
            e.stopPropagation();
            setRippling(true);
            setTimeout(() => setOpen(false), 200);
          }}
        >
          <AnimatePresence>
            {rippling && (
              <motion.span
                className={rippleClass}
                initial={{ scale: 0, opacity: 0.4 }}
                animate={{ scale: 1, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onAnimationComplete={() => setRippling(false)}
              />
            )}
          </AnimatePresence>
          <CloseIcon />
        </button>
      )}
    </RadixToast.Root>
  );
};

// ─── ToastMessage (viewport) ─────────────────────────────────────────────────

export const ToastMessage = (props: ToastMessageProps) => {
  const {
    messageId,
    width,
    showOverPage = true,
    position = "TOP",
    className,
  } = props;

  const { viewport, viewportBottom } = styles;

  const containerId = showOverPage ? `${messageId}-overPage` : messageId;

  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  useEffect(() => {
    return subscribeContainer(containerId, setToasts);
  }, [containerId]);

  return (
    <RadixToast.Provider swipeDirection="right">
      {toasts.map((entry) => (
        <ToastItem
          key={entry.id}
          entry={entry}
          onRemove={() => removeToast(containerId, entry.id)}
        />
      ))}
      <RadixToast.Viewport
        className={`${viewport} ${position === "BOTTOM" ? viewportBottom : ""} ${className ?? ""}`}
        style={{ width: width ?? undefined }}
      />
    </RadixToast.Provider>
  );
};

// ─── showToastMessage ─────────────────────────────────────────────────────────

export const showToastMessage = (
  content: ReactNode,
  options: ShowToastOptions,
) => {
  const { showOverPage = true, containerId: rawContainerId } = options;
  const containerId = showOverPage
    ? `${rawContainerId}-overPage`
    : rawContainerId;

  const id = `${containerId}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  addToast(containerId, { id, content, options });
};
