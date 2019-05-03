import React from "react";
import styled from "styled-components";
import BoldText from "../BoldText";
import Avatar from "../Avatar";
import {Link} from "react-router-dom";
import Comment from "../Comment";
import moment from 'moment';
import { HeartFull, HeartEmpty, CommentEmpty } from "../Icons";
import TextareaAutosize from "react-autosize-textarea";
import Slider from "react-slick";
import "./carousel.css";


const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 614px;
  /* margin-right: 28px; */
  margin-bottom: 25px;
  user-select: none;
  a {
    color: inherit;
  }
`;

const PostHeader = styled.header`
  display: flex;
  padding: 15px;
  align-items: center;
  border-bottom: 1px solid #efefef;
`;

const UserColumn = styled.div`
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

// const Files = styled.div`
//   position: relative;
//   padding-bottom: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: stretch;
//   flex-shrink: 0;
// `;



const File = styled.img`
  max-width: 100%;
  height: 100%;
  width: 100%;
  object-fit: cover;
  user-select: none;
  margin: auto;
  border: 5px solid #fff;
  display: block;
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
    color: black;
    outline: none;
  }
  padding: 20px 16px;
`;

const Comments = styled.ul`
  ${props => props.theme.paddingAlign};
  margin-top: 10px;
`;

const Caption = styled.div`
  ${props => props.theme.paddingAlign};
  margin: 10px 0px;
  padding-bottom: 15px;
  border-bottom: ${props => props.theme.boxBorder};
`;

const MoreComment = styled.div`

`;


export default ({
  id,
  user: { avatar, username },
  location,
  caption,
  files,
  comments,
  commentCount,
  likeCount,
  isLiked,
  createdAt,
  newComment,
  currentItem,
  toggleLike,
  onKeyPress,
  selfComments
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Post>
      <PostHeader>
        <Link to={`/${username}`}>
          <Avatar size={"sm"} url={avatar} />
        </Link>
        <UserColumn>
          <Link to={`/${username}`}>
            <BoldText text={username} />
          </Link>
          <Location>{location}</Location>
        </UserColumn>
      </PostHeader>
      <Slider {...settings}>
      {files &&
        files.map((file, index) => (
            <File
              key={file.id}
              id={file.id}
              src={file.url}
              showing={index === currentItem}
            />
        ))}
      </Slider>
      <Meta>
        <Buttons>
          <Button onClick={toggleLike}>
            {isLiked ? <HeartFull /> : <HeartEmpty />}
          </Button>
          <Button>
            <CommentEmpty />{" "}
          </Button>
        </Buttons>
        <LikeSection>
          <BoldText text={`${likeCount} likes`} />
        </LikeSection>
        <Caption>
          <BoldText text={username} /> {caption}
        </Caption>
        <Comments>
          <Link to={`/p/${id}`}>
            <MoreComment>댓글 {commentCount}개 모두 보기</MoreComment>
          </Link>
          {comments &&
            comments.map(comment => 
              <Comment key={comment.id} detail={false} comment={comment} />
            )
          }
          {selfComments &&
            selfComments.map(comment => (
              <Comment key={comment.id} detail={false} comment={comment} />
            ))}
        </Comments>
        <Timestamp>{moment(createdAt).fromNow()}</Timestamp>
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
