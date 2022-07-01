import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import * as G from "styles";
import { ResetContext } from "components/Reset/ResetStore";
import { useUpdateAtom } from "jotai/utils";
import { modalStateAtom } from "../../../store/modal/atoms";
import { customAxios } from "../../../utils/axiosUtil";
import { API_RESET_PASSWORD } from "constants/apis";
import { errorFormat } from "../../../utils/errorUtil";
import { ErrorType } from "../../../types/errorType";
import issueCode from "components/Reset/IssueCode";
import { STEPS } from "components/Reset/constants";
import { get } from "lodash/fp";

const ValidateCode = () => {
  const context = useContext(ResetContext);
  const {
    email,
    setStep,
    issueToken,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
    setConfirmToken,
  } = context;
  const [authCode, setAuthCode] = useState("");
  const setModal = useUpdateAtom(modalStateAtom);
  const [isError, setIsError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
          setIsDisabled(true);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds, setMinutes, setSeconds]);

  const onClickSubmit = async () => {
    if (!authCode) {
      setIsError(true);
      return;
    }

    try {
      const response = await customAxios().post(API_RESET_PASSWORD, {
        email,
        issueToken,
        authCode,
      });
      setConfirmToken(get("data.confirmToken")(response));
      setStep(STEPS.CHANGE_PASSWORD);
    } catch (error) {
      const message = errorFormat(error as ErrorType);
      setModal({ open: true, title: "ERROR!!!", message });
    }
  };

  useEffect(() => {
    if (!issueToken) {
      setStep(STEPS.ISSUE_CODE);
    }
  }, [issueCode]);
  return (
    <>
      <G.FlexColumn>
        <h1> 인증 코드 검증 페이지</h1>

        <G.FlexRow>
          <TextField
            onChange={(e) => setAuthCode(e.target.value)}
            type="password"
            variant="outlined"
            label="code"
            error={isError}
          />
          <Button
            style={{ marginLeft: "5px" }}
            variant="outlined"
            onClick={onClickSubmit}
            disabled={isDisabled}
          >
            인증 코드 검증
          </Button>
        </G.FlexRow>
        <G.FlexRow
          style={{
            marginTop: "20px",
            justifyContent: "flex-end",
          }}
        >
          {minutes} :
          {String(seconds).length === 1
            ? String(seconds).padStart(2, "0")
            : seconds}
        </G.FlexRow>
      </G.FlexColumn>
    </>
  );
};
export default ValidateCode;
