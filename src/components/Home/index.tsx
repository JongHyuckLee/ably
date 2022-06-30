import React, { useState } from "react";
import * as S from "./styled";
import * as G from "styles";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <S.Wrapper>
      <G.FlexRow>
        <G.FlexColumn style={{ marginRight: "5px" }}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            variant="outlined"
            label="email"
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginTop: "5px" }}
            type="password"
            variant="outlined"
            label="password"
          />
        </G.FlexColumn>

        <Button variant="outlined">로그인</Button>
      </G.FlexRow>
    </S.Wrapper>
  );
};
export default Home;
