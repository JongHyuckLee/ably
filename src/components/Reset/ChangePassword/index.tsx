import React, { useContext, useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import * as G from "styles";
import { ResetContext } from "components/Reset/ResetStore";
import { customAxios } from "../../../utils/axiosUtil";
import { API_RESET_PASSWORD } from "constants/apis";
import { errorFormat } from "../../../utils/errorUtil";
import { ErrorType } from "../../../types/errorType";
import { useUpdateAtom } from "jotai/utils";
import { modalStateAtom } from "../../../store/modal/atoms";
import { useHistory } from "react-router-dom";
import { PATH_HOME } from "constants/paths";

const PASSWORD = "password";
const NEW_PASSWORD = "newPassword";
const ChangePassword = () => {
  const history = useHistory();
  const setModal = useUpdateAtom(modalStateAtom);
  const context = useContext(ResetContext);
  const { email, confirmToken } = context;
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState({
    password: false,
    newPassword: false,
  });
  const setTypedError = (type: string, isError: boolean) =>
    setError((prevState) => ({ ...prevState, [type]: isError }));
  const isValid = () => {
    let result = true;

    if (!password) {
      setTypedError(PASSWORD, true);
      result = false;
    } else {
      setTypedError(PASSWORD, false);
    }

    if (!newPassword) {
      setTypedError(NEW_PASSWORD, true);
      result = false;
    } else {
      setTypedError(NEW_PASSWORD, false);
    }

    if (password !== newPassword) {
      setTypedError(PASSWORD, true);
      setTypedError(NEW_PASSWORD, true);
      result = false;
    }

    return result;
  };

  const onClickSubmit = async () => {
    if (!isValid()) {
      return;
    }

    try {
      await customAxios().patch(API_RESET_PASSWORD, {
        email,
        confirmToken,
        newPassword: password,
        newPasswordConfirm: newPassword,
      });

      await history.push(PATH_HOME);
    } catch (error) {
      const message = errorFormat(error as ErrorType);
      setModal({ open: true, title: "ERROR!!!", message });
    }
  };
  return (
    <>
      <G.FlexColumn>
        <h1> 비밀번호 변경 페이지</h1>
        <G.FlexRow>
          <G.FlexColumn>
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              variant="outlined"
              label="비밀번호"
              error={error.password}
            />
            <TextField
              style={{ marginTop: "5px" }}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              variant="outlined"
              label="비밀번호 확인"
              error={error.newPassword}
            />
          </G.FlexColumn>
          <Button
            style={{ marginLeft: "5px" }}
            variant="outlined"
            onClick={onClickSubmit}
          >
            비밀번호 변경
          </Button>
        </G.FlexRow>
      </G.FlexColumn>
    </>
  );
};
export default ChangePassword;
