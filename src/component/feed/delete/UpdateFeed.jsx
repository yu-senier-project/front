import React from "react";
import Content from "../create/Content";
import CreateSetting from "../create/CreateSetting";
import CloseButton from "../../basic/CloseButton";
import Button from "../../basic/Button";
import { useState } from "react";
import UpdateSetting from "./UpdateSetting";
import UpdateImage from "./UpdateImage";

export const UpdateFeed = ({
  hanldUpdateCloseButtonClick,
  feedList,
  imgList,
}) => {
  const formData = new FormData();

  const [hash, setHash] = useState(feedList.hashtag);
  const [mention, setMention] = useState(feedList.mention);
  const [content, setContent] = useState(feedList.comment);
  const [isChat, setIsChat] = useState(feedList.isChatOpne);

  const onRemove = () => {
    const result = content.replace(/@\[([\w\s]+)\]\(\d+\)/g, "$1");
    return result;
  };

  const onSubmit = () => {
    let removeContent = onRemove();
  };

  const appendHash = (text) => {
    let arr = [...hash, text];
    setHash(arr);
  };

  const appendMention = (text) => {
    let arr = [...mention, text];
    setMention(arr);
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
          <UpdateImage formData={formData} imgList={imgList}></UpdateImage>
        </div>
        <div className="createFeed-content">
          <Content
            appendHash={appendHash}
            appendMention={appendMention}
            onChangeContent={onChangeContent}
            content={content}
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
              onCilck={onSubmit}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
