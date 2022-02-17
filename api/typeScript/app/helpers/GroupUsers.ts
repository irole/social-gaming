//let Socketio = require('./Socket');

class GroupUsers {

    users: any = [];

    addUserInList(id, username, groupName, guest) {
        let users = {id, username, groupName, guest};
        this.users.push(users)
    }

    getUserInList(): any {
        return this.users;
    }

    getUsernameInGroup(groupName) {
        let users = this.users.filter((user: any) => user.groupName === groupName);
        return users.map((user: any) => {
            return {
                username: user.username,
                guest: user.guest
            }
        });
    }

    removeUserFromList(id) {
        //console.log(this.users)
        //console.log(this.getUsersList('irole'))
        let index = this.users.findIndex(user => user.id === id);
        if (index != -1) {
            let user = this.users[index];
            this.users.splice(index, 1);
            return user;
        }
        return null;


        // let user = this.users[index];
        // this.users.splice(index, 1);
        // return user;
    }

}

export default new GroupUsers();
