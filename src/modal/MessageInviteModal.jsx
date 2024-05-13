import React, { useState, useCallback, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Input from "../component/basic/Input";
import apiClient from "../util/BaseUrl";
import { debounce } from "lodash";
import Button from "../component/basic/Button";
import CloseButton from "../component/basic/CloseButton";
import useMessageStore from "../store/message/useMessageStore";
import "../styles/message/addroom.scss";

function MessageInviteModal({ open, handleClose }) {
    const [modalStep, setModalStep] = useState(0);
    const [people, setPeople] = useState([]);
    const [selectedPeople, setSelectedPeople] = useState([]);
    const [search, setSearch] = useState('');
    const [newRoomName, setNewRoomName] = useState(localStorage.getItem("userNickName"));
    const {addRoom , fetchRooms} = useMessageStore();
    // debounce 설정 부분 수정
    const debouncedFetchPeople = useCallback(debounce(async (value) => {
        if (value.trim()) {
            const memberId = localStorage.getItem("memberId");
            try {
                const { data } = await apiClient.get(`/api/v1/member/only-company/search?memberId=${memberId}&nickname=${value}`);
                console.log(data);
                setPeople(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            setPeople([]);
        }
    }, 300), []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);  // 즉각적인 상태 업데이트
        debouncedFetchPeople(value);  // debounce 적용된 검색 함수 호출
    };

    const handleSelectPerson = (nickname) => {
        setSelectedPeople(prev => {
            if (prev.includes(nickname)) {
                return prev.filter(n => n !== nickname);
            } else {
                return [...prev, nickname];
            }
        });
    };

    const handleNewRoomNameChange = (e) => {
        setNewRoomName(e.target.value);
    };

    const renderModalContent = () => {
        switch (modalStep) {
            case 0:
                return (
                    <div className="addroom-modal">
                        <div className="header">
                            <button className="close-button" onClick={handleClose}>
                                <CloseButton />
                            </button>
                        </div>
                        <Input size="Large" name="invite" value={search} onChange={handleSearchChange} />
                        <div className="people-list">
                            {people.length > 0 ? (
                               <ul>
                               {people.map((person, index) => (
                                   <li key={index}>
                                       {person.nickname}
                                       <button 
                                           onClick={() => handleSelectPerson(person.memberId)}
                                           className={selectedPeople.includes(person.memberId) ? 'button-selected' : ''}
                                       >
                                           선택
                                       </button>
                                   </li>
                               ))}
                           </ul>
                            ) : search.length > 0 ? (
                                <p>검색 결과가 없습니다.</p>
                            ) : (
                                <></>
                            )}
                        </div>
                        <Button text="다음" size="Large" onClick={() => setModalStep(1)} />
                    </div>
                );
            case 1:
                return (
                    <div className="addroom-modal">
                        <div className="header">
                            <button className="close-button" onClick={() => setModalStep(0)}><h1>←</h1></button>
                            <button className="close-button" onClick={handleClose}>
                                <CloseButton />
                            </button>
                        </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                        <p>사용하실 채팅방의 이름을 적어주세요</p>
                        <p>미 작성시 채팅방 회원의 이름으로 작성됩니다</p>
                        <br></br>
                    <br></br>
                    <br></br>
                        <Input size="Large" name="newRoomName" value={newRoomName} onChange={handleNewRoomNameChange} />
                        <Button text="채팅방 생성" size="Large" onClick={()=>{addRoom(newRoomName,selectedPeople); fetchRooms(localStorage.getItem("memberId"),1); handleClose()}} />
                    </div>
                );
            default:
                return <p>초기화 오류</p>;
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {renderModalContent()}
        </Modal>
    );
}

export default MessageInviteModal;
