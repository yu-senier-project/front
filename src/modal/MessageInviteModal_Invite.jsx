import React, { useState, useCallback, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Input from "../component/basic/Input";
import apiClient from "../util/BaseUrl";
import axios from "axios";
import { debounce } from "lodash";
import Button from "../component/basic/Button";
import CloseButton from "../component/basic/CloseButton";
import useMessageStore from "../store/message/useMessageStore";
import "../styles/message/addroom.scss";

function MessageInviteModal({ open, handleClose, selectedRoom, memberId }) {
  const [people, setPeople] = useState([]);
  const [search, setSearch] = useState("");
  const { addRoom, fetchRooms, roomNumber } = useMessageStore();
  const [existsPeople, setExistsPeople] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);

  const debouncedFetchPeople = useCallback(
    debounce(async (value) => {
      if (value.trim()) {
        const memberId = localStorage.getItem("memberId");
        try {
          const { data } = await apiClient.get(
            `/api/v1/member/for-invite/search?memberId=${memberId}&nickname=${value}&roomId=${selectedRoom}`
          );
          const filteredPeople = data.filter(
            (person) => !existsPeople.some((existing) => existing.memberId === person.memberId)
          );
          setPeople(filteredPeople);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setPeople([]);
      }
    }, 300),
    [selectedRoom, existsPeople]
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedFetchPeople(value);
  };

  const handleSelectPerson = (nickname, memberId) => {
    setExistsPeople((prev) => {
      const isSelected = prev.some((person) => person.memberId === memberId);
      if (isSelected) {
        return prev.filter((person) => person.memberId !== memberId);
      } else {
        return [...prev, { nickname, memberId }];
      }
    });
  };

  const getExistsPeople = async () => {
    try {
      console.log('qwer');
      const response = await apiClient.get(`/api/v1/chat-room/${selectedRoom}/participant?memberId=${memberId}`);
      console.log(response.data);
      setExistsPeople(response.data);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  useEffect(() => {
    if (open) {
      getExistsPeople();
    }
  }, [open]);

  const handleInvitePeople = () => {
    // axios.post(`http://13.51.99.142:8080/api/v1/chat-room/1/invite?memberId=1&inviteList[nickname]=string&inviteList[memberId]=0`,).then().catch()


    setPeople([]);
    handleClose();
  };

  const handleModalClose = () => {
    setPeople([]);
    setSearch("");
    setExistsPeople([]);
    setSelectedPeople([]);
    handleClose();
  };

  const renderPeopleList = () => {
    if (people.length > 0) {
      return (
        <ul>
          {people.map((person) => (
            <li key={person.memberId} className="person-item">
              <img src={person.avatar || "https://via.placeholder.com/40"} alt={person.nickname} className="avatar" />
              <span>{person.nickname}</span>
              <button
                onClick={() =>
                  handleSelectPerson(person.nickname, person.memberId)
                }
                className={
                  existsPeople.some(
                    (selected) => selected.memberId === person.memberId
                  )
                    ? "button-selected"
                    : ""
                }
              >
                추가
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

  const renderSelectedPeople = () => {
    if (existsPeople.length > 0) {
      return (
        <ul className="selected-people-list">
          {existsPeople.map((person) => (
            <li key={person.memberId} className="selected-person-item">
              <img src={person.avatar || "https://via.placeholder.com/40"} alt={person.nickname} className="avatar" />
              <span>{person.nickname}</span>
            </li>
          ))}
        </ul>
      );
    }
    return <p>추가된 사람이 없습니다.</p>;
  };

  return (
    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="addroom-modal">
        <div className="header">
          <button className="close-button" onClick={handleModalClose}>
            <CloseButton />
          </button>
        </div>
        <div className="title">
          {/* <b>초대하기</b> */}
        </div>
        <div className="modal-content">
          <div className="left-section">
            <Input
              size="Large"
              name="invite"
              value={search}
              onChange={handleSearchChange}
            />
            <div className="people-list">{renderPeopleList()}</div>
          </div>
          <div className="right-section">
            <b>추가된 사람</b>
            <div className="selected-people">{renderSelectedPeople()}</div>
            <Button text="다음" size="Large" onClick={handleInvitePeople} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default MessageInviteModal;
