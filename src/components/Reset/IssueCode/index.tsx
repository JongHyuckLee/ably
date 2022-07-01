import React, { useContext, useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import * as G from "styles";
import { validateEmail } from "../../../utils/stringManipulations";
import { debounce, get } from "lodash/fp";
import { customAxios } from "../../../utils/axiosUtil";
import { API_RESET_PASSWORD } from "constants/apis";
import { errorFormat } from "../../../utils/errorUtil";
import { ErrorType } from "../../../types/errorType";
import { useUpdateAtom } from "jotai/utils";
import { modalStateAtom } from "../../../store/modal/atoms";
import { ResetContext } from "components/Reset/ResetStore";
import { millisToMinutesAndSeconds } from "../../../utils/timeUtil";
import { STEPS } from "components/Reset/constants";

const IssueCode = () => {
  const context = useContext(ResetContext);
  const { setStep, setIssueToken, email, setEmail, setMinutes, setSeconds } =
    context;
  const setModal = useUpdateAtom(modalStateAtom);

  const [isError, setIsError] = useState(false);
  const validateForm = () => {
    if (!email.trim() || !validateEmail(email.trim())) {
      setIsError(true);
      return false;
    } else {
      setIsError(false);
      return true;
    }
  };
  const onClickSubmit = debounce(300)(async () => {
    if (!validateForm()) {
      return;
    }
    try {
      const response = await customAxios().get(API_RESET_PASSWORD, {
        params: {
          email,
        },
      });
      const [minutes, seconds] = millisToMinutesAndSeconds(
        get("data.remainMillisecond")(response)
      );
      setIssueToken(get("data.issueToken")(response));
      setMinutes(minutes as number);
      setSeconds(seconds as number);
      setStep(STEPS.VALIDATE_CODE);
    } catch (error) {
      const message = errorFormat(error as ErrorType);
      setModal({ open: true, title: "ERROR!!!", message });
    }
  });

  return (
    <>
      <G.FlexColumn>
        <h1>인증 코드 발급 요청 페이지</h1>
        <G.FlexRow>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            variant="outlined"
            label="email"
            error={isError}
          />
          <Button
            style={{ marginLeft: "5px" }}
            variant="outlined"
            onClick={onClickSubmit}
          >
            인증 코드 발송
          </Button>
        </G.FlexRow>
      </G.FlexColumn>
    </>
  );
};
export default IssueCode;
