import io from "socket.io-client";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("Connected!");
});

socket.on("message", (data) => {
  console.log(data, "asdasd");
});

socket.emit("room", { roomCode: "fake data" });

export default socket;
