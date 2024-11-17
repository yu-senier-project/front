import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/project/ChannelDetail.scss";
import { useExitChannel } from "../../react-query/useProject";
import { OpenVidu } from 'openvidu-browser';
import { createSession, generateToken} from "../../apis/projectApis";


export default function ChannelDetail() {
  const { projectId, channelId } = useParams();
  const { mutate, status } = useExitChannel(projectId, channelId);
  const nav = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const channelName = queryParams.get('name');

  const [session, setSession] = useState(null); // 현재 세션 상태
  const [subscribers, setSubscribers] = useState([]); // 구독자 상태
  const subscriberRefs = useRef([]); // 구독자 스트림을 위한 ref

  const joinChannel = async () => {
    try {
      // 세션 생성
      const sessionId = await createSession(projectId, channelId);
        console.log(sessionId);
      // 토큰 발급
      const token = await generateToken(projectId, channelId, sessionId);
        console.log(token);
      // OpenVidu 초기화
      const OV = new OpenVidu();
      const mySession = OV.initSession();

      mySession.on("streamCreated", (event) => {
        const subscriber = mySession.subscribe(event.stream, undefined);
        setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
      });

      mySession.on("streamDestroyed", (event) => {
        const stream = event.stream;
        const subscriberId = stream.connection.connectionId;
        setSubscribers((prevSubscribers) =>
          prevSubscribers.filter((sub) => sub.stream.connection.connectionId !== subscriberId)
        );
      });

      // 화상채팅 시작
      await mySession.connect(token, {});
      const myPublisher = OV.initPublisher("publisher");
      mySession.publish(myPublisher);

      setSession({ mySession, sessionId, channelId });
    } catch (error) {
      console.error("Error joining channel:", error);
    }
  };

  const leaveSession = async () => {
    if (session) {
      session.mySession.disconnect(); // OpenVidu 세션 종료

      // 상태 초기화
      setSession(null);
      setSubscribers([]);

      // 구독자 DOM 요소 제거
      subscriberRefs.current.forEach((ref) => {
        if (ref) {
          ref.innerHTML = ''; // 모든 자식 요소 제거
        }
      });

      try {
        // 세션 연결 종료 API = 채널 퇴장 API
        mutate();
        console.log('Session left successfully');
      } catch (error) {
        console.error('Error leaving session:', error);
      }
    }
  };

  const handleExitClick = async (projectId, channelId) => {
    leaveSession(session.channelId, session.sessionId);
    nav(`/ProjectHome/Channel/${projectId}`);
  };

  useEffect(() => {
    joinChannel();
  }, [channelId]);

  // 구독자 스트림을 해당 DOM 요소에 연결
  useEffect(() => {
    subscribers.forEach((subscriber, index) => {
      if (subscriberRefs.current[index]) {
        const videoElement = subscriberRefs.current[index].querySelector('video');
        if (videoElement) {
          subscriber.addVideoElement(videoElement);
        } else {
          const newVideoElement = document.createElement('video');
          newVideoElement.autoplay = true;
          newVideoElement.controls = false;
          subscriber.addVideoElement(newVideoElement);
          subscriberRefs.current[index].appendChild(newVideoElement);
        }
      }
    });
  }, [subscribers]);

  return (
    <div className="channel-detail-container">
      <div className="channel-detail-title">
        <h4>channel : {channelName}</h4>
      </div>

      {/* 퍼블리셔 및 구독자 비디오 요소 */}
      <div className = "video-container" >
        <div id="publisher"></div>
        {subscribers.map((sub, index) => (
            <div key={index} id={`subscriber${index}`}>
            <div ref={(el) => (subscriberRefs.current[index] = el)}></div>
            </div>
        ))}
      </div>

      <button className="end-call-button" onClick={() => handleExitClick(projectId, channelId)}>
        화상채팅 종료
      </button>
    </div>
  );
}
