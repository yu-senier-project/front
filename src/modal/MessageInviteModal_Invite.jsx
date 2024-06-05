import React, { useState, useCallback, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Input from "../component/basic/Input";
import apiClient from "../util/BaseUrl";
import { debounce } from "lodash";
import Button from "../component/basic/Button";
import CloseButton from "../component/basic/CloseButton";
import useMessageStore from "../store/message/useMessageStore";
import "../styles/message/addroom.scss";

function MessageInviteModal({ open, handleClose, selectedRoom, memberId, close,setMessages }) {
  const [people, setPeople] = useState([]);
  const [search, setSearch] = useState("");
  const { addRoom, fetchRooms, roomNumber,fetchMessages } = useMessageStore();
  const [existsPeople, setExistsPeople] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [addPeople, setAddPeople] = useState([]);

  useEffect(() => {
    const fetchSelectedPeople = async () => {
      try {
        const response = await apiClient.get(`/api/v1/chat-room/${selectedRoom}/participant`);
        console.log(response);
        setSelectedPeople(response.data);
      } catch (error) {
        console.error('Error fetching selected people:', error);
      }
    };

    fetchSelectedPeople();
  }, [selectedRoom]);

  const debouncedFetchPeople = useCallback(
    debounce(async (value) => {
      if (value.trim()) {
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
    [selectedRoom, existsPeople, memberId]
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

    setAddPeople((prev) => {
      const isAdded = prev.some((person) => person.memberId === memberId);
      if (isAdded) {
        return prev.filter((person) => person.memberId !== memberId);
      } else {
        return [...prev, { nickname, memberId }];
      }
    });
  };

  const getExistsPeople = async () => {
    try {
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

  const handleInvitePeople = async () => {
    try {
      const inviteList = addPeople.map(person => ({
        memberId: person.memberId,
        nickname: person.nickname
      }));

      const data = {
        inviteList: inviteList
      };
      console.log(data);

      const response = await apiClient.post(
        `/api/v1/chat-room/${selectedRoom}/invite?memberId=${memberId}`,
        data
      );

      console.log('Invite response:', response);
      setPeople([]);
      setSearch();
      fetchMessages(selectedRoom)
      handleClose();
    } catch (error) {
      console.error('Error inviting people:', error);
    }
  };

  const handleModalClose = () => {
    setPeople([]);
    setSearch("");
    setExistsPeople([]);
    setSelectedPeople([]);
    setAddPeople([]);
    close();
  };

  const renderPeopleList = () => {
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
                    onClick={() => handleSelectPerson(person.nickname, person.memberId)}
                  >
                    선택
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="right-section">
            <p>참여중인 유저</p>
            <ul>
              {selectedPeople.map((person) => (
                <li key={person.memberId}>
                  <img src={person.profile ? person.profile : "/image/dp.jpg"} alt="Profile" className="profile-image" />
                  {person.nickname}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else if (search.length > 0) {
      return (
        <div style={{ display: "flex" }}>
          <div className="left-section"><p>검색결과가 없습니다</p></div>
          <div className="right-section">
            <p>참여중인 유저</p>
            <ul>
              {selectedPeople.map((person) => (
                <li key={person.memberId}>
                  <img src={person.profile ? person.profile : "/image/dp.jpg"} alt="Profile" className="profile-image" />
                  {person.nickname}
                  <button
                    onClick={() => handleSelectPerson(person.nickname, person.memberId)}
                  >
                    선택
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }
    return null;
  };

  const modalContent = () => {
    return (
      <div className="addroom-modal">
        <div className="header">
          <CloseButton onCloseButton={handleModalClose} />
        </div>
        <b>채팅초대</b>
        <Input size="Large" name="invite" value={search} onChange={handleSearchChange} />
        {search ? <div className="people-list">{renderPeopleList()}</div> : <div style={{ display: "flex" }}>
          <div className="left-section"></div>
          <div className="right-section">
            <p>참여중인 유저</p>
            <ul>
              {selectedPeople.map((person) => (
                <li key={person.memberId}>
                  <img src={person.profile ? person.profile : "/image/dp.jpg"} alt="Profile" className="profile-image" />
                  {person.nickname}
                  <button
                    onClick={() => handleSelectPerson(person.nickname, person.memberId)}
                  >
                    선택
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>}
        <Button text="다음" size="Large" onClick={handleInvitePeople} />
      </div>
    );
  };

  return (
    <Modal open={open} onClose={handleModalClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      {modalContent()}
    </Modal>
  );
}

export default MessageInviteModal;
