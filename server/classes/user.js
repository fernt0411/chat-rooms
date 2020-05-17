class User {

    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = { id, name, room };
        this.users.push(user);

        return this.users;
    }


    getUser(id) {
        let user = this.users.filter(user => user.id === id)[0];
        return user;
    }
    getUsers() {
        return this.users;
    }

    getUsersPerRoom(room) {
        let userPerRoom = this.users.filter(user => user.room === room);

        return userPerRoom;
    }

    deleteUser(id) {
        let deleteUser = this.getUser(id);
        this.users = this.users.filter(user => user.id != id)

        return deleteUser;
    }
}

module.exports = {
    User
}