import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import PostDetailPresenter from "./PostDetailPresenter";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT, ADD_REPLY } from "./PostQueries";
import { toast } from "react-toastify";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  commentCount,
  createdAt,
  caption,
  location,
  detail
}) => {
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [selfComments, setSelfComments] = useState([]);
  const [recommentId, setRecommentId] = useState(0);

  //const [test, setTest] = useState(0);

  const textAreaRef = useRef(null);
  const comment = useInput("");

  const toggleLikeMutation = useMutation(TOGGLE_LIKE, {
    variables: {
      postId: id
    }
  });

  const addCommentMutation = useMutation(ADD_COMMENT, {
    variables: {
      postId: id,
      text: comment.value
    }
  });

  const addReplyMutation = useMutation(ADD_REPLY, {
    variables: {
      postId: id,
      text: comment.value,
      commentId : recommentId
    }
  });

  const toggleLike = async () => {
    if (isLikedS === true) {
      setIsLiked(false);
      setLikeCount(likeCountS - 1);
    } else {
      setIsLiked(true);
      setLikeCount(likeCountS + 1);
    }

    try {
      const {
        data: { toggleLike }
      } = await toggleLikeMutation();
      
      console.log(toggleLike);
    } catch {
      setIsLiked(!isLikedS);
    }
  }

  const onKeyPress = async event => {
    const { which } = event;
    //console.log(which)
    if (which === 13) {
      event.preventDefault();
      try {
        const myRe = /@\w+/g;
        const myArray = myRe.exec(comment.value);
        console.log(myArray);
        if(myArray === null) {
          comment.setValue("");
          const {
            data: { addComment }
          } = await addCommentMutation();

          console.log(addComment);
          setSelfComments([...selfComments, addComment]);
        } else {
          const {
            data: { addReply }
          } = await addReplyMutation();
          
          console.log(addReply);
          comments.forEach(comment => {
            if(comment.id === recommentId) {
              comment.recomments.push(addReply);
              comment.recommentCount += 1;
              console.log(comment);
            } 
          });
          comment.setValue("");
          // const parentComment = comments.find(comment => comment.id === recommentId)
          // if(parentComment) {
          //   console.log(parentComment);
          //   parentComment.recomments.push(addReply);
          // }
            
          //setSelfComments([...selfComments, addComment]);
        }
        
      } catch (e){
        console.log(e);
        toast.error("Cant send comment");
      }
    }
  };

  
  
  if( detail ) {
    const onReplyClick = (username, id) => {
      comment.setValue(`@${username} `);
      textAreaRef.current.focus();
      setRecommentId(id);
    }

    const onCommentClick = () => {
      textAreaRef.current.focus();
    };

    return (
      <PostDetailPresenter
        id={id}
        user={user}
        files={files}
        likeCount={likeCountS}
        isLiked={isLikedS}
        comments={comments}
        createdAt={createdAt}
        caption={caption}
        location={location}
        newComment={comment}
        toggleLike={toggleLike}
        onKeyPress={onKeyPress}
        selfComments={selfComments}
        onReplyClick={onReplyClick}
        onCommentClick={onCommentClick}
        textAreaRef={textAreaRef}
      />
    );
  } else {
    return (
      <PostPresenter
        id={id}
        user={user}
        files={files}
        likeCount={likeCountS}
        isLiked={isLikedS}
        comments={comments}
        commentCount={commentCount}
        createdAt={createdAt}
        caption={caption}
        location={location}
        newComment={comment}
        toggleLike={toggleLike}
        onKeyPress={onKeyPress}
        selfComments={selfComments}
      />
    );
  }

  
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired
};

export default PostContainer;
