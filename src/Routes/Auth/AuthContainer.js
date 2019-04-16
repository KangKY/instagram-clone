import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN
} from "./AuthQueries";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default () => {
  const [action, setAction] = useState("logIn");

  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("ruddlf4933@trizcorp.com");
  const secret = useInput("");

  const secretMutation = useMutation(LOG_IN, {
    variables: { email: email.value }
  });

  const createAccountMutation = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });

  const confirmSecretMutation = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value
    }
  });

  const localLogInMutation = useMutation(LOCAL_LOG_IN);

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const {
            data: { requestSecret }
          } = await secretMutation();
          console.log(requestSecret);
          if (requestSecret) {
            toast.success("메일함에서 키값을 확인해주세요.", {
              position: toast.POSITION.TOP_RIGHT,
              className: "foo-bar"
            });
            setTimeout(() => setAction("confirm"), 100);
          } else {
            toast.error("등록된 계정이 없습니다. 계정을 생성해주세요.");
            setTimeout(() => setAction("signUp"), 3000);
          }
        } catch {
          toast.error("다시 시도해주세요.");
        }
      } else {
        toast.error("이메일 주소를 입력해주세요.");
      }
    } else if (action === "signUp") {
      if (
        email.value !== "" &&
        username.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation();
          if (createAccount) {
            toast.success("가입되었습니다. 로그인해주세요.", {
              position: toast.POSITION.TOP_RIGHT,
              className: "foo-bar"
            });
            setTimeout(() => setAction("logIn"), 1000);
          } else {
            toast.error("가입에 실패하였습니다. 다시 시도해주세요.");
          }
        } catch (e) {
          if (e.message === "GraphQL error: This email is already taken.")
            toast.error("이메일 주소가 등록되어 있습니다.");
          else if (
            e.message === "GraphQL error: This username is already taken."
          )
            toast.error("사용자 이름이 이미 존재합니다.");
          else toast.error("가입에 실패하였습니다. 다시 시도해주세요.");
        }
      } else {
        toast.error("모든 필드를 입력해주세요.");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret: token }
          } = await confirmSecretMutation();
          
          if (token !== "" && token !== undefined) {
            localLogInMutation({ 
                variables: { token } 
            });
          } else {
              throw Error();
          }
        } catch {
          toast.error("키 인증에 실패하였습니다.");
        }
      }
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};
