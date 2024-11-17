import React, { useEffect, useRef, useState } from "react";
import "../../styles/project/CreateChannel.scss";
import { useCreateChannel } from "../../react-query/useProject";
import useProjectStore from "../../store/project/useProjectStore";


export const CreateChannel = ({setOnCreate}) => {

    const { projectId } = useProjectStore();

    // 채널 생성 mutate
    const { mutate, status } = useCreateChannel(projectId);

    // 채널 제목
    const [name, setChannelName] = useState("");

    //채널 생성 함수
    const onSubmit = () => {
        if(name === ""){
            alert("채널 이름을 입력해주세요.");
            return;
        }
        
        const data = {
            name
        };

        mutate(data);
        setOnCreate(false);
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

    // 배경 클릭하면 모달창 닫기
    const backgroundRef = useRef(null);
    const onBackgroundClick = (e) => {
        if (e.target === backgroundRef.current) {
        setOnCreate(false);
        }
    };

    return (
        <div
            className="CreateChannel"
            ref={backgroundRef}
            onClick={onBackgroundClick}
        >
            <div className = "CreateChannel-wrap">
                <h4>새 채널 추가 (영어 숫자 조합만 가능합니다)</h4>
                <div className = "CreateChannel-title">
                    <input 
                    type="text"
                    placeholder="채널 이름(영어 숫자 조합만 가능합니다)"
                    value = {name}
                    onChange={handleInputChange}
                    />
                </div>
                <div>
                    <button onClick = {onSubmit}>생성</button>
                </div>
            </div>
        </div>
    );
}