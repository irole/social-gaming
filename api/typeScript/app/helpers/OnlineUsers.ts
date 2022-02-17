const _ = require('underscore');


class OnlineUsers {

    onlineUsers: any = [];
    generalOnlineUsers: any = [];

    addOnlineUser(username) {
        this.onlineUsers.push(username);
        this.onlineUsers = _.uniq(this.onlineUsers);
    }

    addGeneralUser(username) {
        this.generalOnlineUsers.push(username);
        this.generalOnlineUsers = _.uniq(this.generalOnlineUsers);
    }

    getGeneralUser(): any {
        return this.generalOnlineUsers;
    }

    getOnlineUsers(): any {
        return this.onlineUsers;
    }

    getOffline(username) {

        // this.onlineUsers = _.reject(this.onlineUsers, function (user) {
        //     console.log(user)
        //     //return user === username;
        // });
        this.onlineUsers = _.without(this.onlineUsers, username);
        this.generalOnlineUsers = _.without(this.generalOnlineUsers, username)
        return this.onlineUsers;
    }

    // getRoomList(room) {
    //     let roomName = this.onlineUsers.filter((user: any) => user.room === room);
    //     return roomName.map((user) => {
    //         return {
    //             name: user.name,
    //             img: user.img
    //         }
    //     });
    //
    // }

}

export default new OnlineUsers();
