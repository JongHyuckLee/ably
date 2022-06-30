import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useAtom } from "jotai";
import { isLoginAtom } from "../../../store/user/atoms";
import { useHistory } from "react-router-dom";

const Header = () => {
  const [isLogin] = useAtom(isLoginAtom);
  const history = useHistory();
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ably
          </Typography>
          <Button color="inherit">{isLogin ? "LOGOUT" : "LOGIN"}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
