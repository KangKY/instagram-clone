import React, {useEffect} from "react";
import styled from "styled-components";
import Input from "../../Components/Input";
import Button from "../../Components/Button";
import Avatar from "../../Components/Avatar";
import SettingList from "../../Components/SettingList";
import Loader from "../../Components/Loader";
import TextareaAutosize from "react-autosize-textarea";

const Container = styled.div`
  ${props => props.theme.whiteBox};
  display: flex;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  flex-grow: 5;
  padding:20px 10px;
`;

const ArticleHeader = styled.div`
  display: flex;
  align-items:center;
  margin-bottom:30px;
`;

const HeaderColumn = styled.div`
   
    &:first-child {
      margin-right: auto;
      flex:0 0 196px;
    

     div {
       margin : 0 auto;
     }
      a {
        display: flex;
      }
    }
    &:last-child {
      margin-left: auto;
      flex-grow:5;
      font-size:20px;
      font-weight:900;
    }
`;

const ArticleForm = styled.form`
  button {
    max-width:250px;
    margin-top:50px;
  }
  text-align:center;
`;

const ArticleList = styled.div`
  display: flex;
  margin-bottom:15px;
`;

const InfoTitle = styled.aside`
  flex: 0 0 196px;
  font-size: 16px;
  font-weight: 600;
  padding: 10px;
  text-align: center;
  @media (max-width:435px){
    flex:0 0 110px;
  }
`;

const InfoInput = styled(Input)`
  width: 100%;
`;

const TextArea = styled(TextareaAutosize)`
  background-color: ${props => props.theme.bgColor};
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};

  width: 100%;
  resize: none;
  min-height: 56px;
  color: ${props => props.theme.blackColor};
  line-height: 18px;
  &:focus {
    outline: none;
  }
  padding: 20px 16px;
`;

export default ({
  usernameInput,
  firstNameInput,
  lastNameInput,
  emailInput,
  bioInput,
  data,
  loading,
  onSubmit
}) => {
  if (loading) {
    return <Loader />;
  } else if (!loading && data && data.me) {
    const { username, email, firstName, lastName, bio, avatar } = data.me;

    useEffect(() => {
      usernameInput.setValue(username);
      emailInput.setValue(email);
      firstNameInput.setValue(firstName);
      lastNameInput.setValue(lastName);
      bioInput.setValue(bio);
      
      return () => {
        
      };
    }, [])

    console.log();
    return (
      <Container>
        <SettingList active={"edit"} />
        <Article>
          <ArticleHeader>
            <HeaderColumn>
              <Avatar url={avatar} size={"md"} />
              <input type="file" />
            </HeaderColumn>
            <HeaderColumn>
              {username}
              
            </HeaderColumn>
            
          </ArticleHeader>
          <ArticleForm onSubmit={onSubmit}>
            <ArticleList>
              <InfoTitle>성</InfoTitle>
              <InfoInput
                value={lastNameInput.value}
                placeholder={"성을 입력해주세요."}
                onChange={lastNameInput.onChange}
              />
            </ArticleList>
            <ArticleList>
              <InfoTitle>이름</InfoTitle>
              <InfoInput
                value={firstNameInput.value}
                placeholder={"이름을 입력해주세요."}
                onChange={firstNameInput.onChange}
              />
            </ArticleList>
            <ArticleList>
              <InfoTitle>사용자 이름</InfoTitle>
              <InfoInput
                value={usernameInput.value}
                placeholder={"사용자 이름을 입력해주세요."}
                onChange={usernameInput.onChange}
              />
            </ArticleList>
            <ArticleList>
              <InfoTitle>소개</InfoTitle>
              <TextArea
                value={bioInput.value}
                onChange={bioInput.onChange}
                placeholder={"자기소개를 입력해주세요."}
              />
            </ArticleList>
            <ArticleList>
              <InfoTitle>이메일</InfoTitle>
              <InfoInput
                value={emailInput.value}
                placeholder={"이메일을 입력해주세요."}
                onChange={emailInput.onChange}
              />
            </ArticleList>
            <Button text={"제출"} />
          </ArticleForm>
        </Article>
      </Container>
    );
  }
};
