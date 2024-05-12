import React, { useRef } from "react";
import Content from "../create/Content";
import CreateSetting from "../create/CreateSetting";
import CloseButton from "../../basic/CloseButton";
import Button from "../../basic/Button";
import { useState } from "react";
import UpdateSetting from "./UpdateSetting";
import UpdateImage from "./UpdateImage";
import { getUpdateFeed, postFeedLike } from "../../../apis/feedApis";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postFeedImg, updateFeed } from "../../../apis/feedApis";

export const UpdateFeed = ({
  hanldUpdateCloseButtonClick,
  feedList,
  imgList,
  setIsUpdate,
}) => {
  const { isLoading, data } = useQuery({
    queryKey: ["feedUpdate", feedList.id],
    queryFn: () => {
      return getUpdateFeed(feedList.id);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    staleTime: 1000 * 60 * 5,
  });

  let formData = new FormData();

  let hashList = useRef([]);
  const mentionList = useRef([]);
  const inputRef = useRef(null);
  const [content, setContent] = useState(feedList.content);
  const [isChat, setIsChat] = useState(feedList.isCommentEnabled);
  const [imageList, setImageList] = useState([]);

  const onSubmit = async () => {
    hashList.current.push(...data?.data.hashtags);
    mentionList.current.push(...data?.data.mentions);

    mentionList.current = mentionList.current.filter((item) =>
      content.includes(item)
    );
    hashList.current = hashList?.current?.filter((item) =>
      content.includes(item)
    );
    const newImage = [];
    const originImage = [];
    imageList.map((item) => {
      if (item instanceof File) {
        newImage.push(item);
      } else {
        originImage.push(item);
      }
    });

    let imgData = [];
    if (newImage.length !== 0) {
      for (let i = 0; i < newImage.length; i++) {
        formData.append("files", newImage[i]);
      }
      imgData = await postFeedImg(formData);
    }
    let postFileList = [];
    if (imgData !== 0) {
      postFileList = [...originImage, ...imgData];
    } else {
      postFileList = [...originImage];
    }

    let isImg = postFileList.length == 0 ? false : true;
    const postData = {
      content: content,
      hashtag: hashList.current,
      mention: mentionList.current,
      isCommentEnabled: isChat,
      postFileList: isImg ? postFileList : [],
    };

    console.log(postData);

    return await updateFeed(feedList.id, postData);
  };

  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      queryClient.invalidateQueries("feeds");
      setIsUpdate(false);
    },
    onError: (e) => {
      console.log(e);
      alert("게시물 등록에 실패했습니다. 다시 시도해 주세요!");
    },
  });

  const onCLick = () => {
    mutate();
  };

  const onChangeContent = (e) => {
    setContent(e);
  };

  const onSetIsChat = (value) => {
    setIsChat(value);
  };

  return (
    <div className="CreateFeed">
      <div className="wrap">
        <div className="top">
          <h3>게시물 수정하기</h3>
          <div id="createFeed-closeButton">
            <CloseButton
              size={"18"}
              onCloseButton={hanldUpdateCloseButtonClick}
            ></CloseButton>
          </div>
        </div>
        <div className="img">
          <UpdateImage
            formData={formData}
            imgList={imgList}
            setImageList={setImageList}
          ></UpdateImage>
        </div>
        <div className="createFeed-content">
          <Content
            // appendHash={appendHash}
            // appendMention={appendMention}
            onChangeContent={onChangeContent}
            content={content}
            hashList={hashList}
            mentionList={mentionList}
            inputRef={inputRef}
          ></Content>
        </div>
        <div className="setting">
          <UpdateSetting
            onSetIsChat={onSetIsChat}
            isChat={isChat}
          ></UpdateSetting>
          <div className="btn-wrap">
            <Button
              text={"게시글 등록"}
              fontSize={16}
              onClick={onCLick}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
