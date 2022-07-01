import React, { useState } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

const ValidateCode = () => {
  const [code, setCode] = useState("");
  const [isError, setIsError] = useState(false);
  const onClickSubmit = () => {};
  return (
    <>
      <TextField
        onChange={(e) => setCode(e.target.value)}
        type="password"
        variant="outlined"
        label="code"
        error={isError}
      />
      <Button variant="outlined" onClick={onClickSubmit}>
        인증 코드 검증
      </Button>
    </>
  );
};
export default ValidateCode;
