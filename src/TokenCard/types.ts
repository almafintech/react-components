import { ReactNode } from "react";

export interface TokenCardProps {
  title: string;
  subtitle?: string | undefined;
  children?: ReactNode;
  lastSendToken: number;
  onAuthorize: (
    token: string
  ) => Promise<{ success: boolean; error?: boolean; message?: string }>;
  onResend: () =>
    | void
    | Promise<void>
    | Promise<boolean>
    | Promise<{
        success: boolean;
        error?: boolean;
        message?: string;
      }>;

  onSuccess: () => void;
  autoSendToken?: boolean;
  hideResendButton?: boolean;
}

export interface HeaderModalProps {
  title: string;
  subtitle?: ReactNode | undefined;
  className?: string;
}
