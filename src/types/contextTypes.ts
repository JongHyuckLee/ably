export type ResetType = {
  step: string;
  setStep: (step: string) => void;
  email: string;
  setEmail: (email: string) => void;
  issueToken: string;
  setIssueToken: (token: string) => void;
  minutes: number;
  setMinutes: (minutes: number) => void;
  seconds: number;
  setSeconds: (seconds: number) => void;
  confirmToken: string;
  setConfirmToken: (token: string) => void;
};
