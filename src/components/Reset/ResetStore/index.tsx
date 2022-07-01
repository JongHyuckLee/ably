import React, { createContext, useState } from "react";
import { STEPS } from "components/Reset/constants";
import { ResetType } from "types/contextTypes";

export const ResetContext = createContext<ResetType>({
  step: STEPS.ISSUE_CODE,
  setStep: () => {},
  email: "",
  setEmail: () => {},
  issueToken: "",
  setIssueToken: () => {},
  minutes: 0,
  setMinutes: () => {},
  seconds: 0,
  setSeconds: () => {},
  confirmToken: "",
  setConfirmToken: () => {},
});
interface Props {
  children: JSX.Element | JSX.Element[];
}

const ResetStore = ({ children }: Props) => {
  const [step, setStep] = useState(STEPS.ISSUE_CODE);
  const [email, setEmail] = useState("");
  const [issueToken, setIssueToken] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [confirmToken, setConfirmToken] = useState("");

  return (
    <ResetContext.Provider
      value={{
        step,
        setStep,
        email,
        setEmail,
        issueToken,
        setIssueToken,
        seconds,
        setSeconds,
        minutes,
        setMinutes,
        confirmToken,
        setConfirmToken,
      }}
    >
      {children}
    </ResetContext.Provider>
  );
};
export default ResetStore;
