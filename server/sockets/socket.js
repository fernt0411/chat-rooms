const { io } = require('../server');

const { User } = require('../classes/user');
const { createMessage } = require('../utils/utils');
const user = new User();

io.on('connection', (client) => {

    client.on('connectChat', (data, cb) => {

        if (!data.name || !data.room) {
            return cb({
                err: true,
                message: 'nombre necesario'
            })
        }
        client.join(data.room)
        let users = user.addUser(client.id, data.name, data.room);

        client.broadcast.to(data.room).emit('allUsers', user.getUsersPerRoom(data.room))
        client.broadcast.to(data.room).emit('sendMessage', createMessage('Admin', `${data.name} se unio`))
        cb(user.getUsersPerRoom(data.room));
    })

    client.on('disconnect', () => {
        let deleteUser = user.deleteUser(client.id);
        client.broadcast.to(deleteUser.room).emit('sendMessageFromAdmin', createMessage('Admin', `${deleteUser.name} abandono el chat`))
        client.broadcast.to(deleteUser.room).emit('allUsers', user.getUsersPerRoom(deleteUser.room));
    });


    client.on('sendMessage', (data, cb) => {
        let currentUser = user.getUser(client.id);
        let message = createMessage(currentUser.name, data.message);
        client.broadcast.to(currentUser.room).emit('sendMessage', message);

        cb(message)
    });

    //private message

    client.on('privateMessage', data => {
        let currentUser = user.getUser(client.id);
        client.broadcast.to(data.to).emit('privateMessage', createMessage(currentUser.name, data.message))
    })

});