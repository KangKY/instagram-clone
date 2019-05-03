import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import CommentPresenter from "./CommentPresenter";
import { TOGGLE_COMMENTLIKE } from "./CommentQueries";
import moment from "moment";

const CommentContainer = ({ comment, onReplyClick, detail }) => {
  const [collapse, setCollapse] = useState(true);
  const [isLiked, setIsLiked] = useState(comment.isLiked);
  const [likeCount, setLikeCount] = useState(0);

  const toggleCommentLikeMutation = useMutation(TOGGLE_COMMENTLIKE, {
    variables: {
      commentId: comment.id
    }
  });

  useEffect(()=> {
    moment.locale('ko');

    if(comment.likeCount && comment.likeCount > 0)
      setLikeCount(comment.likeCount);

  }, []);

  const onStateChange = () => {
    setCollapse(!collapse);
  };

  const toggleLike = async () => {
    if (isLiked === true) {
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    }

    try {
      const {
        data: { toggleCommentLike }
      } = await toggleCommentLikeMutation();
      
      console.log(toggleCommentLike);
    } catch {
      setIsLiked(!isLiked);
    }
  }

  if(comment.parent !== null) {
    return null;
  }
  else {
    return (
      <CommentPresenter
        comment={comment}
        recomments={comment.recomments}
        onReplyClick={onReplyClick}
        collapse={collapse}
        onStateChange={onStateChange}
        toggleLike={toggleLike}
        isLiked={isLiked}
        likeCount={likeCount}
        moment={moment}
        detail={detail}
      />
    );
  }
  
};

CommentContainer.propTypes = {
  comment: PropTypes.object.isRequired,
  onReplyClick: PropTypes.func,
  detail : PropTypes.bool.isRequired
};

export default CommentContainer;
