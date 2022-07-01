import React, { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import * as G from "styles";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [error, setError] = useState({
    password: false,
    repassword: false,
  });
  const onClickSubmit = () => {};
  return (
    <>
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
            onChange={(e) => setRePassword(e.target.value)}
            type="password"
            variant="outlined"
            label="비밀번호 확인"
            error={error.repassword}
          />
        </G.FlexColumn>
        <Button variant="outlined" onClick={onClickSubmit}>
          비밀번호 변경
        </Button>
      </G.FlexRow>
    </>
  );
};
export default ChangePassword