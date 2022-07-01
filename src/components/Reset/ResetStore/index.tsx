import React, { createContext, useState } from "react";
import { STEPS } from "components/Reset/constants";
import { ResetType } from "types/contextTypes";

export const ResetContext = createContext<ResetType>({
  step: STEPS.ISSUE_CODE,
  setStep: () => {},
  issueToken: "",
  setIssueToken: () => {}
});
interface Props {
  children: JSX.Element | JSX.Element[];
}

const ResetStore = ({ children }: Props) => {
  const [step, setStep] = useState(STEPS.ISSUE_CODE);
  const [issueToken, setIssueToken] = useState("");

  return (
    <ResetContext.Provider value={{ step, setStep, issueToken, setIssueToken }}>
      {children}
    </ResetContext.Provider>
  );
};
export default ResetStore;
