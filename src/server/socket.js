module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    let currentUser;
    socket.on("room", ({ user }) => {
      const { roomId } = user;
      currentUser = user;
      io.sockets.emit('newuser', { user, roomId });
    });

    socket.on("disconnect", () => {
      io.sockets.emit('disconnect', { currentUser });
    });
  });
};
