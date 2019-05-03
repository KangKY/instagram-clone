import React from "react";
import styled from "styled-components";
import BoldText from "../BoldText";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import Comment from "../Comment";
import moment from 'moment';
import { HeartFull, HeartEmpty, CommentEmpty } from "../Icons";
import TextareaAutosize from "react-autosize-textarea";

const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
 
  /* margin-right: 28px; */
  margin-bottom: 25px;
  
  a {
    color: inherit;
  }
  display:flex;
  @media (max-width:768px) {
    flex-direction:column;
  }
`;

const PostHeader = styled.header`
  display: flex;
  padding: 15px;
  align-items: center;
  border-bottom: 1px solid #efefef;
`;

const PostWrap = styled.div`
   width: 100%;
`;



const UserColumn = styled.div`
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  /* padding-bottom: 100%; */
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
  flex-basis:60%;
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
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  font-size: 12px;
  display: block;
  margin: 5px 0px;
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
    color: black;
    outline: none;
  }
  padding: 20px 16px;
`;

const CommentUl = styled.ul`
  ${props => props.theme.paddingAlign};
  margin-top: 10px;
  max-height: 360px;
  overflow-y: scroll;
`;
const Caption = styled.div`
  ${props => props.theme.paddingAlign};
  margin: 10px 0px;
  padding-bottom: 15px;
  border-bottom: ${props => props.theme.boxBorder};
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
  selfComments,
  onReplyClick,
  textAreaRef
}) => {
  return (
    <Post>
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
      <PostWrap>
        <PostHeader>
          <Link to={`/${username}`}>
            <Avatar size={"sm"} url={avatar} />
          </Link>
          <UserColumn>
            <Link to={`/${username}`}>
              <BoldText text={username} />
            </Link>
            <Location>{location}</Location>
            <Timestamp>{moment(createdAt).fromNow()}</Timestamp>
          </UserColumn>
        </PostHeader>
        <Meta>
          <Buttons>
            <Button onClick={toggleLike}>
              {isLiked ? <HeartFull /> : <HeartEmpty />}
            </Button>
            <Button>
              <CommentEmpty />
            </Button>
          </Buttons>
          <LikeSection>
            <BoldText text={`${likeCount} likes`} />
          </LikeSection>
          <Caption>
            <BoldText text={username} /> {caption}
          </Caption>
          <CommentUl>
            {comments &&
              comments.map(comment => 
                <Comment key={comment.id} detail={true} comment={comment} onReplyClick={() => {
                  onReplyClick(comment.user.username, comment.id);
                }}/>


              )
            }
            {selfComments &&
              selfComments.map(comment => (
                <Comment key={comment.id} detail={true} comment={comment} onReplyClick={() => {
                  onReplyClick(comment.user.username, comment.id);
                }}/>
              ))}
          </CommentUl>

          <TextArea
            onKeyPress={onKeyPress}
            placeholder={"댓글 달기..."}
            value={newComment.value}
            onChange={newComment.onChange}
            ref={textAreaRef}
          />
        </Meta>
      </PostWrap>
      
    </Post>
  );
};
