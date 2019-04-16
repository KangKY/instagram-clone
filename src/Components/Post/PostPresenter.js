import React from "react";
import styled from "styled-components";
import BoldText from "../BoldText";
import Avatar from "../Avatar";
import { HeartFull, HeartEmpty, Comment } from "../Icons";
import TextareaAutosize from "react-autosize-textarea";

const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 614px;
  margin-right: 28px;
  margin-bottom: 25px;
  user-select: none;
`;

const PostHeader = styled.header`
  display: flex;
  padding: 15px;
  align-items: center;
  border-bottom: 1px solid #efefef;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.img`
  max-width: 100%;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  user-select: none;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const Button = styled.span`
  cursor: pointer;
  padding: 0px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  ${props => props.theme.paddingAlign};
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Meta = styled.div`
  padding: 0px;
`;

const LikeSection = styled.div`
  ${props => props.theme.paddingAlign};
`;

const Timestamp = styled.span`
  ${props => props.theme.paddingAlign};
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  font-size: 12px;
  display: block;
  margin: 10px 0px;
`;

const TextArea = styled(TextareaAutosize)`
  border: 0;
  border-top: 1px solid #efefef;
  min-width: 100%;
  resize: none;
  min-height: 56px;
  color: #999;
  line-height: 18px;
  &:focus {
    outline: none;
  }
  padding: 20px 16px;
`;

const Comments = styled.ul`
  ${props => props.theme.paddingAlign};
  margin-top: 10px;
`;

const CommentList = styled.li`
  padding-bottom: 7px;
  display: flex;
  span {
    margin-right: 5px;
  }
`;

const CommentDiv = styled.div`
  display: flex;
  width: calc(100% - 28px);
  ${Button} {
    svg {
      vertical-align: middle;
    }
  }
`;

export default ({
  user: { avatar, username },
  location,
  caption,
  files,
  comments,
  likeCount,
  isLiked,
  createdAt,
  newComment,
  currentItem,
  toggleLike,
  onKeyPress,
  selfComments
}) => {
  return (
    <Post>
      <PostHeader>
        <Avatar size={"sm"} url={avatar} />
        <UserColumn>
          <BoldText text={username} />
          <Location>{location}</Location>
        </UserColumn>
      </PostHeader>
      <Files>
        {files &&
          files.map((file, index) => (
            <File
              key={file.id}
              id={file.id}
              src={file.url}
              showing={index === currentItem}
            />
          ))}
      </Files>
      <Meta>
        <Buttons>
          <Button onClick={toggleLike}>
            {isLiked ? <HeartFull /> : <HeartEmpty />}
          </Button>
          <Button>
            <Comment />{" "}
          </Button>
        </Buttons>
        <LikeSection>
          <BoldText text={`${likeCount} likes`} />
        </LikeSection>
        <Comments>
          {comments &&
            comments.map(comment => (
              <CommentList key={comment.id}>
                <CommentDiv>
                  <BoldText text={comment.user.username} />
                  {comment.text}
                </CommentDiv>
                <Button>
                  <HeartEmpty size={13} />
                </Button>
              </CommentList>
            ))}
            {selfComments &&
            selfComments.map(comment => (
              <CommentList key={comment.id}>
                <CommentDiv>
                  <BoldText text={comment.user.username} />
                  {comment.text}
                </CommentDiv>
                <Button>
                  <HeartEmpty size={13} />
                </Button>
              </CommentList>
            ))}
        </Comments>
        <Timestamp>{createdAt}</Timestamp>
        <TextArea
          onKeyPress={onKeyPress}
          placeholder={"댓글 달기..."}
          value={newComment.value}
          onChange={newComment.onChange}
        />
      </Meta>
    </Post>
  );
};
