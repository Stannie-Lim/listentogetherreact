import io from "socket.io-client";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("Connected!");
});

const connectToRoom = (user) => {
  socket.emit("room", { user });
};

export default socket;

export { 
  connectToRoom,

};