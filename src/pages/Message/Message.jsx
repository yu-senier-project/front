import { Link } from "react-router-dom";
import axios from "axios";
import apiClient from "../../util/BaseUrl";
import RoomSelecter from "./RoomSelecter";
import io from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";

// const socket = io("http://13.51.99.142:8080/");

export default function Message() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({});
  const [userId, setUserId] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [rooms, setRooms] = useState([]);

  //   <RoomSelecter />;
}
