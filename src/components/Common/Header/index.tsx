import React, { useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useAtom } from "jotai";
import { isLoginAtom } from "../../../store/user/atoms";
import { useHistory } from "react-router-dom";
import { PATH_ACCOUNT, PATH_HOME } from "constants/paths";
import { removeItem } from "../../../utils/localStorage";
import { AUTHENTICATION_TOKEN } from "constants/localStorages";

const Header = () => {
  const [isLogin, setIsLogin] = useAtom(isLoginAtom);
  const history = useHistory();
  const onClickLogo = useCallback(
    () => (isLogin ? history.push(PATH_ACCOUNT) : history.push(PATH_HOME)),
    [isLogin]
  );
  const onClickHandler = useCallback(() => {
    if (isLogin) {
      removeItem(AUTHENTICATION_TOKEN);
      setIsLogin(false);
      history.push(PATH_HOME);
      return;
    }
  }, [isLogin]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography
            style={{ cursor: "pointer" }}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={onClickLogo}
          >
            Ably
          </Typography>
          <Button onClick={onClickHandler} color="inherit">
            {isLogin ? "LOGOUT" : "LOGIN"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
