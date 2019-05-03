import React from "react";
import styled from "styled-components";

import BoldText from "../BoldText";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import { HeartFull, HeartEmpty } from "../Icons";

const Button = styled.span`
  cursor: pointer;
  padding: 0px;
`;

const CommentList = styled.li`
  padding-top: 10px;
  display: flex;
  span {
    margin-right: 5px;
  }
`;

const Recomments = styled.ul`
  margin: 4px 0 0 48px;
`;

const RecommentList = styled.li`
  &:first-child {
    font-size: 12px;
    margin: 5px 0px;
  }
  display: flex;
`;

const StateChange = styled.span`
  cursor: pointer;
  padding: 5px 0px;
`;

const CommentWrap = styled.div`
  display: flex;
  width: calc(100% - 28px);
  align-items: flex-start;
`;

const CommentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
`;

const UserWrap = styled.div`
  display: flex;
`;

const ReplyDiv = styled.div`
  margin-top: 7px;
  color: ${props => props.theme.darkGreyColor};
  font-size: 12px;
`;

const MetaSpan = styled.span``;

export default ({
  comment,
  recomments,
  onReplyClick,
  collapse,
  onStateChange,
  isLiked,
  toggleLike,
  likeCount,
  moment,
  detail
}) => {
  if (!detail) {
    console.log(comment);
    return (
      <CommentList key={comment.id}>
        <CommentWrap>
          <CommentDiv>
            <UserWrap>
              <Link to={`/${comment.user.username}`}>
                <BoldText text={comment.user.username} />
              </Link>
              <span>{comment.text}</span>
            </UserWrap>
          </CommentDiv>
        </CommentWrap>
        <Button onClick={toggleLike}>
          {isLiked ? <HeartFull size={13} /> : <HeartEmpty size={13} />}
        </Button>
      </CommentList>
    );
  } else {
    //console.log(comment);
    return (
      <>
        <CommentList key={comment.id}>
          <CommentWrap>
            <Link to={`/${comment.user.username}`}>
              <Avatar size={"sm"} url={comment.user.avatar} />
            </Link>
            <CommentDiv>
              <UserWrap>
                <Link to={`/${comment.user.username}`}>
                  <BoldText text={comment.user.username} />
                </Link>
                <span>{comment.text}</span>
              </UserWrap>
              <ReplyDiv>
                <MetaSpan>{moment(comment.createdAt).fromNow()}</MetaSpan>
                <MetaSpan>좋아요 {likeCount}개</MetaSpan>
              </ReplyDiv>
              <ReplyDiv>
                <Button onClick={onReplyClick}>답글 달기</Button>
              </ReplyDiv>
            </CommentDiv>
          </CommentWrap>
          <Button onClick={toggleLike}>
            {isLiked ? <HeartFull size={13} /> : <HeartEmpty size={13} />}
          </Button>
        </CommentList>
        {comment.recommentCount > 0 && (
          <Recomments>
            <RecommentList>
              {collapse ? (
                <StateChange onClick={onStateChange}>
                  --댓글 보기({comment.recommentCount}개)--
                </StateChange>
              ) : (
                <StateChange onClick={onStateChange}>--댓글 접기--</StateChange>
              )}
            </RecommentList>

            {!collapse &&
              recomments.map(recomment => (
                <RecommentList key={recomment.id}>
                  <CommentWrap>
                    <Link to={`/${recomment.user.username}`}>
                      <Avatar size={"sm"} url={recomment.user.avatar} />
                    </Link>
                    <CommentDiv>
                      <UserWrap>
                        <Link to={`/${comment.user.username}`}>
                          <BoldText text={recomment.user.username} />
                        </Link>
                        <span>{recomment.text}</span>
                      </UserWrap>
                      <ReplyDiv>
                        {moment(recomment.createdAt).fromNow()}
                      </ReplyDiv>
                      <ReplyDiv>
                        <Button onClick={onReplyClick}>답글 달기</Button>
                      </ReplyDiv>
                    </CommentDiv>
                  </CommentWrap>
                  <Button onClick={toggleLike}>
                    {isLiked ? (
                      <HeartFull size={13} />
                    ) : (
                      <HeartEmpty size={13} />
                    )}
                  </Button>
                </RecommentList>
              ))}
          </Recomments>
        )}
      </>
    );
  }
};
