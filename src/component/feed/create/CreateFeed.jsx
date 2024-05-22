import "../../../styles/feed/create/craeteFeed.scss";
import Content from "./Content";
import CreateSetting from "./CreateSetting";
import Image from "./Image";
import CloseButton from "../../basic/CloseButton";
import Button from "../../basic/Button";
import useCreateFeed from "../../../store/feed/useCreateFeed";
import { useState, useRef } from "react";
import { postFeed, postFeedImg } from "../../../apis/feedApis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loading } from "../../basic/Loading";
const CreateFeed = () => {
  const queryClient = useQueryClient();
  const { setToggle } = useCreateFeed((state) => state);
  const formData = new FormData();
  const hashList = useRef([]);
  const mentionList = useRef([]);
  const inputRef = useRef(null);

  const [content, setContent] = useState("");
  const [isChat, setIsChat] = useState(null);
  const [imageList, setImageList] = useState([]);

  const onRemove = () => {
    const result = content.replace(/\[([\w\s\uAC00-\uD7A3]+)\]\(\d+\)/g, "$1");
    return result;
  };

  const postFeedWithImage = async (data) => {
    let formData = new FormData();
    let imageData;
    let isImg = false;
    if (data.imageList.length !== 0) {
      for (let i = 0; i < data.imageList.length; i++) {
        formData.append("files", data.imageList[i]);
      }
      imageData = await postFeedImg(formData);
      isImg = true;
    }

    const postData = {
      content: data.removeContent,
      hashtag: data.hashList.current,
      mention: data.mentionList.current,
      isCommentEnabled: data.isChat,
      postFileList: isImg ? imageData : [],
    };

    return await postFeed(postData);
  };

  const { data, mutate, mutateAsync, status } = useMutation({
    mutationFn: postFeedWithImage,
    onSuccess: (data) => {
      onClose();
      queryClient.invalidateQueries("feeds");
      queryClient.invalidateQueries("feedImg");
    },
    onError: () => {
      alert("게시물 등록에 실패했습니다. 다시 시도해 주세요!");
    },
  });

  const onSubmit = async () => {
    if (content.length < 1) {
      inputRef.current.focus();
      alert("문구를 작성해주세요!");
      return;
    }

    if (isChat === null) {
      alert("글 설정을 해주세요!");
      return;
    }

    if (content.trim().length == 0) {
      inputRef.current.focus();
      alert("문구를 작성해주세요!");
      return;
    }
    mutate({
      imageList,
      content,
      hashList,
      mentionList,
      isChat,
    });
  };

  const onChangeContent = (e) => {
    if (content.length >= 251) {
      alert("250자까지 작성가능합니다.");
      setContent(content.slice(0, 250));
      return;
    }
    setContent(e);
  };

  const onSetIsChat = (value) => {
    setIsChat(value);
  };

  const onClose = () => {
    setToggle();
  };

  if (status == "pending") {
    return (
      <div>
        <Loading text={"게시물 등록중..."}></Loading>
      </div>
    );
  }

  return (
    <div className="CreateFeed">
      <div className="wrap">
        <div className="top">
          <h3>새 게시물 만들기</h3>
          <div id="createFeed-closeButton">
            <CloseButton size={"18"} onCloseButton={onClose}></CloseButton>
          </div>
        </div>
        <div className="img">
          <Image formData={formData} setImageList={setImageList}></Image>
        </div>
        <div className="createFeed-content">
          <Content
            hashList={hashList}
            mentionList={mentionList}
            onChangeContent={onChangeContent}
            content={content}
            inputRef={inputRef}
          ></Content>
        </div>
        <div className="setting">
          <CreateSetting onSetIsChat={onSetIsChat}></CreateSetting>
          <div className="btn-wrap">
            <Button
              text={"게시글 등록"}
              fontSize={16}
              onClick={onSubmit}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFeed;
