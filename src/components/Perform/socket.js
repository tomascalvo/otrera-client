import io from "socket.io-client";
const SOCKET_URL = "localhost:7000";

export const socket = io(SOCKET_URL);