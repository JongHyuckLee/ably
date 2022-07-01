import React, { useEffect, useState } from "react";
import { customAxios } from "../../utils/axiosUtil";
import { getItem } from "../../utils/localStorage";
import { AUTHENTICATION_TOKEN } from "constants/localStorages";
import { API_USER_INFO } from "constants/apis";
import { UserInfoType } from "../../types/userInfoType";
import { errorFormat } from "../../utils/errorUtil";
import { ErrorType } from "../../types/errorType";
import { modalStateAtom } from "../../store/modal/atoms";
import UserCard from "components/Common/UserCard";
import { useUpdateAtom } from "jotai/utils";

const Account = () => {
  const setModal = useUpdateAtom(modalStateAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    email: "",
    lastConnectedAt: 0,
    name: "",
    password: "",
    profileImage: "",
  });

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const { data } = (await customAxios(
          getItem(AUTHENTICATION_TOKEN) as string
        ).get(API_USER_INFO)) as { data: UserInfoType };
        setUserInfo({ ...data });
      } catch (error) {
        const message = errorFormat(error as ErrorType);
        setModal({ open: true, title: "ERROR!!!", message });
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    })();
  }, []);

  return <>{isLoading ? <>Loading...</> : <UserCard {...userInfo} />}</>;
};
export default Account;
