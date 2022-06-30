import React, { useState } from "react";
import * as S from "./styled";
import * as G from "styles";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { validateEmail } from "../../utils/stringManipulations";
import { customAxios } from "../../utils/axiosUtil";
import { API_LOGIN } from "constants/apis";
import { useAtom } from "jotai";
import { modalStateAtom } from "../../store/modal/atoms";
import { flow, get, defaultTo, debounce } from "lodash/fp";
const EMAIL = "email";
const PASSWORD = "password";
const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const [modal, setModal] = useAtom(modalStateAtom);
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
      console.log(response);
    } catch (error) {
      const message = flow(
        get("response.data.error.message"),
        defaultTo(get("message"))
      )(error);
      setModal({ open: true, title: "ERROR!!!", message });
    }
  });

  return (
    <S.Wrapper>
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

        <Button variant="outlined" onClick={onClickSubmit}>
          로그인
        </Button>
      </G.FlexRow>
    </S.Wrapper>
  );
};
export default Home;
