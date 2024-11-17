import React, { useEffect, useRef, useState } from "react";
import "../../styles/project/UpdateChannel.scss";
import useProjectStore from "../../store/project/useProjectStore";
import { useUpdateChannel } from "../../react-query/useProject";

export const UpdateChannel = ({setOnUpdate,channelId,channelName}) => {

    const { projectId } = useProjectStore();

    // 채널 제목
    const [name, setChannelName] = useState(channelName);

    // 채널 수정 mutate
    const { mutate, status } = useUpdateChannel(projectId,channelId);

    // 배경 클릭하면 모달창 닫기
    const backgroundRef = useRef(null);
    const onBackgroundClick = (e) => {
        if (e.target === backgroundRef.current) {
        setOnUpdate(false);
        }
    };

    const onSubmit = () => {
        if(name === ""){
            alert("채널 이름을 입력해주세요.");
            return;
        }
        
        const data = {
            name
        };

        mutate(data);
        setOnUpdate(false);
    }

    // 입력값 제한 함수
    const handleInputChange = (e) => {
        const value = e.target.value;

        // 영어와 숫자만 허용
        if (/^[a-zA-Z0-9]*$/.test(value)) {
            setChannelName(value);
        } else {
            alert("채널 이름은 영어와 숫자만 가능합니다.");
        }
    };

    return (
        <div
            className="UpdateChannel"
            ref={backgroundRef}
            onClick={onBackgroundClick}
        >
            <div className = "UpdateChannel-wrap">
                <h4>채널 명 수정 (영어 숫자 조합만 가능합니다)</h4>
                <div className = "UpdateChannel-title">
                    <input 
                    type="text"
                    placeholder="채널 이름 (영어 숫자 조합만 가능합니다)"
                    value = {name}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <button onClick = {onSubmit}>수정</button>
                </div>
            </div>
        </div>
    );
}