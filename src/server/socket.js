module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    let room;
    socket.on("room", ({ user }) => {
      const { roomId } = user;
      room = roomId;
      socket.join(roomId);
      io.sockets.in(roomId).emit('newuser', user);
    });

    socket.on("disconnect", () => {
      console.log(`Connection ${socket.id} has left the building`);
    });
  });
};
