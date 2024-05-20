const User = require("../models/User/User");

let onlineUsers = [];

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("join-room", (userId) => {
      socket.join(userId);

      const userIndex = onlineUsers.findIndex((user) => user.userId === userId);
      if (userIndex === -1) {
        onlineUsers.push({ userId, socketId: socket.id });
      } else {
        onlineUsers[userIndex].socketId = socket.id;
      }

      io.emit(
        "online-users-updated",
        Array.from(new Set(onlineUsers.map((user) => user.userId)))
      );
    });

    socket.on("disconnect", () => {
      const disconnectedUser = onlineUsers.find(
        (user) => user.socketId === socket.id
      );
      if (disconnectedUser) {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

        // Emitir la lista actualizada de usuarios en línea
        io.emit(
          "online-users-updated",
          Array.from(new Set(onlineUsers.map((user) => user.userId)))
        );
      }
    });
  });
};
