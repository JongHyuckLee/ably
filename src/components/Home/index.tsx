import React, { useEffect, useState } from "react";
import * as G from "styles";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { validateEmail } from "../../utils/stringManipulations";
import { customAxios } from "../../utils/axiosUtil";
import { API_LOGIN } from "constants/apis";
import { modalStateAtom } from "../../store/modal/atoms";
import { get, debounce } from "lodash/fp";
import { getItem, setItem } from "../../utils/localStorage";
import { AUTHENTICATION_TOKEN } from "constants/localStorages";
import { isLoginAtom } from "../../store/user/atoms";
import { useHistory } from "react-router-dom";
import { PATH_ACCOUNT, PATH_RESET } from "constants/paths";
import { errorFormat } from "../../utils/errorUtil";
import { ErrorType } from "../../types/errorType";
import { useUpdateAtom } from "jotai/utils";
const EMAIL = "email";
const PASSWORD = "password";
const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const history = useHistory();
  const setModal = useUpdateAtom(modalStateAtom);
  const setIsLogin = useUpdateAtom(isLoginAtom);
  const setTypeError = (type: "email" | "password", valid: boolean) =>
    setError((prevState) => ({ ...prevState, [type]: valid }));

  const validateForm = () => {
    let result = true;
    if (!email.trim() || !validateEmail(email.trim())) {
      setTypeError(EMAIL, true);
      result = false;
    } else {
      setTypeError(EMAIL, false);
    }
    if (!password.trim()) {
      setTypeError(PASSWORD, true);
      result = false;
    } else {
      setTypeError(PASSWORD, false);
    }
    return result;
  };
  const onClickSubmit = debounce(300)(async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const response = await customAxios().post(API_LOGIN, {
        email: email.trim(),
        password: password.trim(),
      });
      const accessToken = get("data.accessToken")(response);
      if (accessToken) {
        setItem(AUTHENTICATION_TOKEN, accessToken);
        setIsLogin(true);
        history.push(PATH_ACCOUNT);
      }
    } catch (error) {
      const message = errorFormat(error as ErrorType);
      setModal({ open: true, title: "ERROR!!!", message });
    }
  });

  useEffect(() => {
    if (getItem(AUTHENTICATION_TOKEN)) {
      history.push(PATH_ACCOUNT);
    }
  }, []);

  return (
    <>
      <G.FlexRow>
        <G.FlexColumn style={{ marginRight: "5px" }}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            variant="outlined"
            label="email"
            error={error.email}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginTop: "5px" }}
            type="password"
            variant="outlined"
            label="password"
            error={error.password}
          />
        </G.FlexColumn>
        <G.FlexRow>
          <Button variant="outlined" onClick={onClickSubmit}>
            로그인
          </Button>
          <Button
            style={{ marginLeft: "5px" }}
            variant="contained"
            onClick={() => history.push(PATH_RESET)}
          >
            계정 재설정
          </Button>
        </G.FlexRow>
      </G.FlexRow>
    </>
  );
};
export default Home;
