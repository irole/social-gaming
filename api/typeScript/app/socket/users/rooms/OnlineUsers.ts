import userService from "../../../services/UserService";
import privacySettingService from "../../../services/PrivacySettingService";
import userRelationshipService from "../../../services/UserRelationshipService";
import onlineUsers from "../../../helpers/OnlineUsers";
import notificationSettingService from "../../../services/NotificationSettingService";
import notificationAlert from "./NotificationAlert";

const _ = require('underscore')

class OnlineUsers {

    async userIsOnline(io, namespace, socket, username) {
        // Entered User getting Id with Username
        let userId = await userService.findIdWithUsername(username);
        // Get Entered User Status (Online , Invisible , Busy)
        let userStatus = await privacySettingService.getUserStatus(userId);
        // Check User Status if Online or Busy
        if (userStatus === "Online" || userStatus === "Busy") {
            // Get Friend List
            let friendsList = await userRelationshipService.getFriendUsernameList(userId);
            // Get All Online Users
            let onlineUsersList: any = onlineUsers.getOnlineUsers();
            // Find Online Friend in ALL Users
            let list = _.intersection(friendsList, onlineUsersList);
            // Send Online Notification to All Friends
            for (const user of list) {
                let friendId = await userService.findIdWithUsername(user);
                let result = await notificationSettingService.getFriendsGettingOnlineNotification(friendId)
                if (result) notificationAlert.getFriendOnline(io, namespace, user, username)
            }
            onlineUsers.addOnlineUser(username);
            onlineUsers.addGeneralUser(username);
        } else {
            onlineUsers.addGeneralUser(username);
        }
        // io.of(namespace).emit('getFriendOnline', onlineUsers.getOnlineUsers());
    }

    userIsOffline(io, namespace, socket) {
        let username = Array.from(socket.rooms)[1];
        let users = onlineUsers.getOffline(username);
        io.of(namespace).emit('getFriendOnline', users);
    }


    onDisconnect(io, namespace, socket) {
        let username = Array.from(socket.rooms)[1];
        let users = onlineUsers.getOffline(username);
        io.of(namespace).emit('getFriendOnline', users);
    }

}

export default new OnlineUsers();
