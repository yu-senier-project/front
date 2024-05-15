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
  const [search, setSearch] = useState("");
  const [newRoomName, setNewRoomName] = useState(
    localStorage.getItem("userNickName") || ""
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

  const handleSelectPerson = (nickname, memberId) => {
    setSelectedPeople((prev) => {
      const isSelected = prev.some((person) => person.memberId === memberId);
      if (isSelected) {
        return prev.filter((person) => person.memberId !== memberId);
      } else {
        return [...prev, { nickname, memberId }];
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
    setPeople([]);
    setSelectedPeople([]);
    handleClose();
  };

  const renderPeopleList = () => {
    if (people.length > 0) {
      return (
        <ul>
          {people.map((person) => (
            <li key={person.memberId}>
              {person.nickname}
              <button
                onClick={() =>
                  handleSelectPerson(person.nickname, person.memberId)
                }
                className={
                  selectedPeople.some(
                    (selected) => selected.memberId === person.memberId
                  )
                    ? "button-selected"
                    : ""
                }
              >
                선택
              </button>
            </li>
          ))}
        </ul>
      );
    } else if (search.length > 0) {
      return <p>검색 결과가 없습니다.</p>;
    }
    return null;
  };

  const renderModalContent = () => {
    if (modalStep === 0) {
      return (
        <div className="addroom-modal">
          <div className="header">
            <button className="close-button" onClick={handleClose}>
              <CloseButton />
            </button>
          </div>
          <Input
            size="Large"
            name="invite"
            value={search}
            onChange={handleSearchChange}
          />
          <div className="people-list">{renderPeopleList()}</div>
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
            <button className="close-button" onClick={handleClose}>
              <CloseButton />
            </button>
          </div>
          <p>사용하실 채팅방의 이름을 적어주세요</p>
          <p>미 작성시 채팅방 회원의 이름으로 작성됩니다</p>
          <Input
            size="Large"
            name="newRoomName"
            value={newRoomName}
            onChange={handleNewRoomNameChange}
          />
          <Button
            text="채팅방 생성"
            size="Large"
            onClick={handleRoomCreation}
          />
        </div>
      );
    } else {
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
