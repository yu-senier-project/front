import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { postFeedLike, deleteFeedLike } from "../../../apis/feedApis";
import { useQueryClient } from "@tanstack/react-query";
import { AiOutlineMessage } from "react-icons/ai";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegPaperPlane } from "react-icons/fa";

import "../../../styles/feed/main/buttons.scss";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const Buttons = ({
  postId,
  setFalseLoveNum,
  falseLoveNum,
  setFalseLike,
  falseLike,
  handleChatButtonClick,
}) => {
  const queryClient = useQueryClient();

  const likeClassName = `buttons ${falseLike ? "like-red" : null}`;

  const { mutate: deleteMutate, status: deleteStatus } = useMutation({
    mutationFn: deleteFeedLike,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["feeds"]);
    },
  });

  const { status, mutate } = useMutation({
    mutationFn: postFeedLike,
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["feeds"]);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const onLikeButton = () => {
    const data = { postId: postId };
    if (falseLike) {
      if (deleteStatus == "pending" || status == "pending") {
        alert("잠시후 다시 시도해주세요");
        return;
      }
      deleteMutate(data);
      setFalseLike(false);
      console.log(falseLoveNum);
      setFalseLoveNum(falseLoveNum - 1);
    } else {
      if (deleteStatus == "pending" || status == "pending") {
        alert("잠시후 다시 시도해주세요");
        return;
      }
      mutate(data);
      setFalseLike(true);
      console.log(falseLoveNum);
      setFalseLoveNum(falseLoveNum + 1);
    }
  };

  return (
    <div className="Buttons">
      <div className={likeClassName} onClick={onLikeButton}>
        {falseLike ? <BiSolidLike></BiSolidLike> : <BiLike />}
      </div>
      <div className="buttons" onClick={handleChatButtonClick}>
        <AiOutlineMessage></AiOutlineMessage>
      </div>
      <div className="buttons">
        <FaRegPaperPlane></FaRegPaperPlane>
      </div>
    </div>
  );
};

export default Buttons;
