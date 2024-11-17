import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/pages/ProjectChannel.scss";
import { useGetAllChannels} from "../../react-query/useProject";
import { CreateChannel} from "../../component/project/CreateChannel";
import {UpdateChannel} from "../../component/project/UpdateChannel";
import { DeleteChannel } from "../../component/project/DeleteChannel";


export default function ProjectChannel() {
    const { projectId } = useParams();
    const { data, isLoading } = useGetAllChannels(projectId);
    const [onCreate, setOnCreate] = useState(false);
    const [onUpdate, setOnUpdate] = useState(false);
    const [onDelete, setOnDelete] = useState(false);
    const [selectedChannelId, setSelectedChannelId] = useState(null); // 선택한 채널의 ID값 저장
    const [selectedChannelName, setSelectedChannelName] = useState(null);


    const nav = useNavigate();

    let channels = data?.data;

    // 프로젝트 테두리 색깔 입히기
    const colorArray = [
        "lightcoral",
        "lightsalmon",
        "lightgoldenrodyellow",
        "lightgreen",
        "lightblue",
        "lightskyblue",
        "lightslategrey",
    ];

    // 프로젝트 테두리 idx별 색깔 주기
    const getClassName = (idx) => {
        let index = idx % 7;
        return `ProjectHome-project ${colorArray[index]}`;
    };

    // 배경 클릭하면 세팅 닫기
    const settingRef = useRef(null);
    const onBackgroundClick = (e) => {
        if (settingRef.current && !settingRef.current.contains(e.target)) {
        setOnSetting(false);
        }
    };

    const checkDevices = async () => {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const hasVideo = devices.some(device => device.kind === 'videoinput');
            const hasAudio = devices.some(device => device.kind === 'audioinput');
        
            if (!hasVideo || !hasAudio) {
            alert("웹캠과 마이크를 확인해 주세요.");
            return false;
            }
            return true;
        } catch (error) {
            alert("웹캠과 마이크가 존재하지 않습니다.")
            return false;
        }
    };
  
    const handleChannelClick = async (channelId, channelName) => {
        const hasDevices = await checkDevices();
        if (hasDevices) {
            nav(`/ProjectHome/Channel/${projectId}/ChannelDetail/${channelId}?name=${channelName}`);
        }
    };

    const handleEditButton = (channelId, channelName) => {
        setSelectedChannelId(channelId);
        setSelectedChannelName(channelName);
        setOnUpdate(true);
    };
    const handleDeleteButton = (channelId) => {
        setSelectedChannelId(channelId);
        setOnDelete(true);
    };

    return (
        <div className="ProjectChannel" onClick={onBackgroundClick}>
            {onCreate ? (
                <CreateChannel setOnCreate={setOnCreate}></CreateChannel>
            ) : null}
            {onUpdate ? (
                <UpdateChannel setOnUpdate={setOnUpdate} channelId = {selectedChannelId} channelName = {selectedChannelName}></UpdateChannel>
            ) : null}
            {onDelete ? (
                <DeleteChannel setOnDelete={setOnDelete} channelId = {selectedChannelId}></DeleteChannel>
            ) : null}
            <div className="ProjectChannel-title">
                <h2>회의 채널</h2>
            </div>
            <div className="ProjectChannel-btn">
                <button onClick={() => {
                    setOnCreate(true);
                }}>채널 생성</button>
            </div>
            <div className="ProjectChannel-channelList">
                {isLoading ? <p>로딩중...</p> : null}
                {channels?.length ? (
                    channels.map((channel) => (
                        <div
                            key={channel.id}
                            className={getClassName(channel.id)}
                            onClick={() => handleChannelClick(channel.id, channel.name)}
                        >
                            <div className="ProjectChannel-content">
                                <p><strong>{channel.name}</strong></p>
                                <ul>
                                    {channel.members?.length > 0 ? (
                                        channel.members.slice(0,3).map((member) => (
                                            <li key={member.id} className="member-item">
                                                <div className="member-info">
                                                    <img
                                                        src={member.profile}
                                                        className="member-profile-image"
                                                        width={50}
                                                        height={50}
                                                    />
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li>멤버가 없습니다.</li>
                                    )}
                                    {channel.members?.length > 3 && ( // 추가 멤버 수 표시
                                    <li className="member-more">
                                        <p>+{channel.members.length - 3}명</p>
                                    </li>
                                    )}
                                </ul>
                                {/* 수정, 삭제 버튼 추가 */}
                                <div className="ProjectChannel-buttons">
                                    <button className="edit-btn" onClick = { (e) => {
                                        e.stopPropagation();
                                        handleEditButton(channel.id,channel.name);
                                    }}>수정</button>
                                    <button className="delete-btn" onClick = { (e) => {
                                        e.stopPropagation();
                                        handleDeleteButton(channel.id);
                                    }}>삭제</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>채널이 없습니다.</p>
                )}
            </div>
        </div>
    );
}
