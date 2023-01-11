const { Room, Presentation, User } = require('../../../models');

module.exports = async (io, socket) => {
  const { _id } = socket.signature;

  const user = await User.findById(_id).lean();
  let room;
  async function joinRoom(roomId) {
    try {
      if (!roomId) {
        socket.emit('handle-error', 'Invalid room!');
        socket.disconnect(true);
        return;
      }

      const roomDb = await Room.findOne(
        { presentation: roomId },
        'users presentation'
      ).lean();
      if (!roomDb) {
        socket.emit('handle-error', 'Invalid room!');
        socket.disconnect(true);
        return;
      }

      const { users, presentation } = roomDb;

      const presentDB = await Presentation.findById(presentation).lean();
      if (!presentDB) {
        socket.emit('handle-error', 'Invalid room!');
        socket.disconnect(true);
        return;
      }

      socket.join(roomId);

      io.to(roomId).emit('join-room', {
        user: user.username,
        message: 'joined room',
      });
      // console.log(roomId);
      room = roomId;
    } catch (error) {
      console.log('chatHandler - joinRoom error', error);
      socket.emit('handle-error', error.message);
      socket.disconnect(true);
    }
  }

  async function chatMessage(message) {
    try {
      if (!room) {
        socket.emit('handle-error', 'Join room to chat!');
        socket.disconnect(true);
        return;
      }

      io.to(room).emit('chat-message', { user: user.username, message });

      await Room.updateOne(
        { presentation: room },
        {
          $push: {
            messages: { user: _id, message, createAt: Date.now() },
          },
        }
      );
    } catch (error) {
      console.log('chatHandler - chatMessage error', error);
      socket.emit('handle-error', error.message);
      socket.disconnect(true);
    }
  }
  async function changeSlide(slideIndex) {
    try {
      io.to(room).emit('change-slide', slideIndex);
    } catch (error) {
      console.log('chatHandler - chatMessage error', error);
      socket.emit('handle-error', error.message);
      socket.disconnect(true);
    }
  }
  async function submitAnswer(answer) {
    try {
      if (!answer) {
        socket.emit('handle-error', 'Error answer!');
        socket.disconnect(true);
        return;
      }
      io.to(room).emit('submit-answer', answer);
    } catch (error) {
      console.log('chatHandler - chatMessage error', error);
      socket.emit('handle-error', error.message);
      socket.disconnect(true);
    }
  }
  socket.on('join-room', joinRoom);
  socket.on('submit-answer', submitAnswer);
  socket.on('change-slide', changeSlide);
  socket.on('chat-message', chatMessage);
};
