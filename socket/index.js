const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];   // all users will be saved into this array

const addUser = (userId, socketId) => {   // when a user is connected
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });

  // console.log(users);
};

const removeUser = (socketId) => {    // when a user is disconnected
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // when connect
  console.log("a user connected.");

  // take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users); // send currently online users to all clients
  });

  // send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    // console.log(text);

    const receiver = getUser(receiverId);

    // if receiver is online (exist on socket server), tell that receiver to get message
    // if (receiver) {
      io.to(receiver?.socketId).emit("getMessage", {
        senderId,
        text,
      });
    // }
  });

  // when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
