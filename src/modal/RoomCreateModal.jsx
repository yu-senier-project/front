import React, { useState, useCallback } from "react";
import Modal from "@mui/material/Modal";
import Input from "../component/basic/Input";
import apiClient from "../util/BaseUrl";
import { debounce, values } from "lodash";
import Button from "../component/basic/Button";
import CloseButton from "../component/basic/CloseButton";
import useMessageStore from "../store/message/useMessageStore";
import "../styles/message/addroom.scss";

function RoomCreateModal({ open, close }) {
  const [modalStep, setModalStep] = useState(0);
  const [people, setPeople] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [search, setSearch] = useState("");
  const [newRoomName, setNewRoomName] = useState(
    localStorage.getItem("userNickName")
  );
  const { addRoom, fetchRooms, roomNumber } = useMessageStore();

  const debouncedFetchPeople = useCallback(
    debounce(async (value) => {
      if (value.trim()) {
        const memberId = localStorage.getItem("memberId");
        try {
          const { data } = await apiClient.get(
            `/api/v1/member/only-company/search?memberId=${memberId}&nickname=${value}`
          );
          setPeople(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setPeople([]);
      }
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedFetchPeople(value);
  };

  const handleSelectPerson = (nickname, memberId, profile) => {
    setSelectedPeople((prev) => {
      const isSelected = prev.some((person) => person.memberId === memberId);
      if (isSelected) {
        return prev.filter((person) => person.memberId !== memberId);
      } else {
        return [...prev, { nickname, memberId, profile }];
      }
    });
  };

  const handleNewRoomNameChange = (e) => {
    setNewRoomName(e.target.value);
  };

  const handleRoomCreation = () => {
    addRoom(newRoomName, selectedPeople);
    fetchRooms(localStorage.getItem("memberId"), roomNumber);
    setModalStep(0);
    setSearch('');
    setPeople([]);
    setSelectedPeople([]);
    window.location.reload();
    close();
  };

  const renderPeopleList = () => {
    // 선택된 사람들을 제외한 유저 리스트 필터링
    if (people.length > 0) {
      const filteredPeople = people.filter(
        (person) => !selectedPeople.some((selected) => selected.memberId === person.memberId)
      );
      return (
        <div style={{ display: "flex" }}>
          <div className="left-section">
            <p>유저 리스트</p>
            <ul>
              {filteredPeople.map((person) => (
                <li key={person.memberId}>
                  <img src={person.profile ? person.profile : "/image/dp.jpg"} alt="Profile" className="profile-image" />
                  {person.nickname}
                  <button
                    onClick={() => handleSelectPerson(person.nickname, person.memberId, person.profile)}
                  >
                    선택
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="right-section">
            <p>선택된 유저</p>
            <ul>
              {selectedPeople.map((person) => (
                <li key={person.memberId}>
                  <img src={person.profile ? person.profile : "/image/dp.jpg"} alt="Profile" className="profile-image" />
                  {person.nickname}
                  <button
                    onClick={() => handleSelectPerson(person.nickname, person.memberId, person.profile)}
                  >
                    선택
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else if (search.length > 0) {
      return <div style={{ display: "flex" }}>
        <div className="left-section"><p>검색결과가</p></div>
        <div className="right-section"><p>없습니다.</p></div>
      </div>
    }
    return null;
  };
  

  const renderModalContent = () => {
    if (modalStep === 0) {
      return (
        <div className="addroom-modal">
          <div className="header">
            <CloseButton onCloseButton={close} />
          </div>
          <b>채팅방 생성</b>
          <Input size="Large" name="invite" value={search} onChange={handleSearchChange} />
          {search?<div className="people-list">{renderPeopleList()}</div>:<div style={{ display: "flex" }}>
        <div className="left-section"></div>
        <div className="right-section"></div>
      </div>}
          <Button text="다음" size="Large" onClick={() => setModalStep(1)} />
        </div>
      );
    } else if (modalStep === 1) {
      return (
        <div className="addroom-modal">
          <div className="header">
            <button className="close-button" onClick={() => setModalStep(0)}>
              <h1>←</h1>
            </button>
            <CloseButton onCloseButton={close} />
          </div>
          <p>사용하실 채팅방의 이름을 적어주세요</p>
          <p>미 작성시 채팅방 회원의 이름으로 작성됩니다</p>
          <Input size="Large" name="newRoomName" value={newRoomName} onChange={handleNewRoomNameChange} />
          <Button text="채팅방 생성" size="Large" onClick={handleRoomCreation} />
        </div>
      );
    } else {
      return <p>초기화 오류</p>;
    }
  };

  return (
    <Modal open={open} onClose={close} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      {renderModalContent()}
    </Modal>
  );
}

export default RoomCreateModal;
