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

const Buttons = ({ postId, like, setFalseLoveNum, falseLoveNum }) => {
  const [falseLike, setFalseLike] = useState(like);

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
    // onMutate: (newData) => {
    //   console.log(newData);
    //   const previousComments = queryClient.getQueryData(["feeds"]);

    //   queryClient.setQueryData(["feeds"], (old) => {
    //     console.log(old);
    //     let list = old.pages;
    //     list = list.map((item1) => {
    //       let a = item1.data.map((item) => {
    //         if (newData.postId == item.id) {
    //           return {
    //             id: item.id,
    //             content: item.content,
    //             isCommentEnabled: item.isCommentEnabled,
    //             fileCnt: item.fileCnt,
    //             createdAt: item.createdAt,
    //             likeCnt: item.likeCnt + 1,
    //             postMember: item.postMember,
    //             commentCnt: item.commentCnt,
    //             liked: true,
    //           };
    //         } else {
    //           return {
    //             id: item.id,
    //             content: item.content,
    //             isCommentEnabled: item.isCommentEnabled,
    //             fileCnt: item.fileCnt,
    //             createdAt: item.createdAt,
    //             likeCnt: item.likeCnt,
    //             postMember: item.postMember,
    //             commentCnt: item.commentCnt,
    //             liked: item.liked,
    //           };
    //         }
    //       });

    //       return { data: a };
    //     });

    //     console.log(list);

    //     queryClient.setQueryData(["feedComment", postId], (old) => {
    //       console.log({ pages: list, pageParams: [0] });
    //       return { pages: list, pageParams: [0] };
    //     });

    //     return () => {
    //       queryClient.setQueryData(["feeds"], (old) => {
    //         // 이전 데이터로 복원
    //         return previousComments;
    //       });
    //     };
    //   });
    // },
    onError: (err, newComment, rollback) => {
      console.log(e);
      rollback();
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
      setFalseLoveNum(falseLoveNum - 1);
    } else {
      if (deleteStatus == "pending" || status == "pending") {
        alert("잠시후 다시 시도해주세요");
        return;
      }
      mutate(data);
      setFalseLike(true);
      setFalseLoveNum(falseLoveNum + 1);
    }
  };

  return (
    <div className="Buttons">
      <div className={likeClassName} onClick={onLikeButton}>
        {falseLike ? <BiSolidLike></BiSolidLike> : <BiLike />}
      </div>
      <div className="buttons">
        <AiOutlineMessage></AiOutlineMessage>
      </div>
      <div className="buttons">
        <FaRegPaperPlane></FaRegPaperPlane>
      </div>
    </div>
  );
};

export default Buttons;
