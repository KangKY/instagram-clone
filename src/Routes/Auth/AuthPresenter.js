import React from "react";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import logo from "../../Components/logo.png";
import { Helmet } from "react-helmet";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius:1px;
  width: 100%;
  max-width: 350px;
  text-align: center;
`;

const Logo = styled.img`
  max-width: 175px;
  margin-bottom: 12px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.a`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

export default ({
  setAction,
  action,
  username,
  firstName,
  lastName,
  email,
  secret,
  onSubmit
}) => {
  return (
    <Wrapper>
      <Form>
        <Logo src={logo} alt="logo_img" />
        {action === "logIn" && (
          <>
            <Helmet>
              <title>Log In | Prismagram</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <Input placeholder={"이메일 주소"} {...email} />
              <Button text={"로그인"} />
            </form>
          </>
        )}
        {action === "signUp" && (
          <>
            <Helmet>
              <title>Sign Up | Prismagram</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <Input placeholder={"이메일 주소"} {...email} />
              <Input placeholder={"성"} {...firstName} />
              <Input placeholder={"이름"} {...lastName} />
              <Input placeholder={"사용자 이름"} {...username} />
              <Button text={"가입"} />
            </form>
          </>
        )}
        {action === "confirm" && (
          <>
            <Helmet>
              <title>comfirm | Prismagram</title>
            </Helmet>
            <form onSubmit={onSubmit}>
              <Input placeholder={"키 값을 복사하세요"} {...secret} />
              <Button text={"확인"} />
            </form>
          </>
        )}
      </Form>
      {action !== "confirm" && (
        <StateChanger>
          {action === "logIn" ? (
            <>
              계정이 없으신가요?
              <Link onClick={() => setAction("signUp")}> 가입하기</Link>
            </>
          ) : (
            <>
              계정이 있으신가요?
              <Link onClick={() => setAction("logIn")}> 로그인</Link>
            </>
          )}
        </StateChanger>
      )}
    </Wrapper>
  );
};
