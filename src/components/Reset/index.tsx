import React, { useContext, useMemo } from "react";
import { ResetContext } from "components/Reset/ResetStore";
import { STEPS } from "components/Reset/constants";
import IssueCode from "components/Reset/IssueCode";
import ValidateCode from "components/Reset/ValidateCode";
import ChangePassword from "components/Reset/ChangePassword";
const Reset = () => {
  const context = useContext(ResetContext);
  const { step } = context;

  const component = useMemo(
    () =>
      ({
        [STEPS.ISSUE_CODE]: <IssueCode />,
        [STEPS.VALIDATE_CODE]: <ValidateCode/>,
        [STEPS.CHANGE_PASSWORD]: <ChangePassword/>
      }[step] || null),
    [step]
  );
  return <>{component}</>;
};
export default Reset;
