module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(
      `A socket connection to the server has been made: ${socket.id}`
    );

    let room;
    let currentUser;
    socket.on("room", ({ user }) => {
      const { roomId } = user;
      room = roomId;
      currentUser = user;
      socket.join(roomId);
      io.sockets.in(roomId).emit('newuser', user);
    });

    socket.on("disconnect", () => {
      io.sockets.in(room).emit('disconnect', currentUser);
    });
  });
};
