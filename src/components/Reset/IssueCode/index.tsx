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

const IssueCode = () => {
  const context = useContext(ResetContext);
  const { setStep, setIssueToken } = context;
  const setModal = useUpdateAtom(modalStateAtom);
  const [email, setEmail] = useState("");
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
      console.log(response);
    } catch (error) {
      const message = errorFormat(error as ErrorType);
      setModal({ open: true, title: "ERROR!!!", message });
    }
  });

  return (
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
  );
};
export default IssueCode;
