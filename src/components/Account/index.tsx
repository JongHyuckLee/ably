import React, { useEffect, useState } from "react";
import { customAxios } from "../../utils/axiosUtil";
import { getItem } from "../../utils/localStorage";
import { AUTHENTICATION_TOKEN } from "constants/localStorages";
import { API_USER_INFO } from "constants/apis";

const Account = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    (async () => {
      const response = await customAxios(
        getItem(AUTHENTICATION_TOKEN) as string
      ).post(API_USER_INFO);
      console.log(response);
    })();
  }, []);

  return <>aaaaa</>;
};
export default Account;
