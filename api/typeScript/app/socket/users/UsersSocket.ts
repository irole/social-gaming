import Socket from "../Socket";
import privateChat from "./rooms/PrivateChat";
import onlineUsers from "./rooms/OnlineUsers";
import userService from "../../services/UserService";
import notificationCenter from "./rooms/NotificationCenter";
import notificationSettingService from "../../services/NotificationSettingService";
import notificationAlert from "./rooms/NotificationAlert";


class UsersSocket extends Socket {

    usersNs = Option['namespace'].users;

    constructor(io) {
        super(io);
        this.onConnection();
    }

    onConnection() {
        this.getIo()
            .of(this.usersNs)
            .on('connection', this.usersProcess);
    }

    usersProcess(userSocket) {

        //------------ Online users ---------------
        userSocket.on('User:addUser', async (username) => {
            this.joinRoom(userSocket, username);
            await onlineUsers.userIsOnline(this.io, this.usersNs, userSocket, username);
        });
        //-----------------------------------------

        //------------ Private chat ---------------
        userSocket.on('User:sendEndPoints', async (data) => {
            await privateChat.getEndpoints(this.io, this.usersNs, userSocket, data);
        });

        userSocket.on('User:sendMessageFromClient', async (data) => {
            await privateChat.getMessageFromServer(this.io, this.usersNs, userSocket, data);
        });
        //-----------------------------------------

        //------------ notificationCenter ---------
        userSocket.on('User:notificationCenter:friendRequest', async (request) => {
            let receiverId = await userService.findIdWithUsername(request.receiver);
            notificationCenter.sendFriendRequest(this.io, this.usersNs, request);
            let notificationSetting = await notificationSettingService.getReceiveFriendsRequestNotification(receiverId);
            if (notificationSetting) notificationAlert.sendFriendRequest(this.io, this.usersNs, request);
        });
        //-----------------------------------------

        //------------ notificationAlert ---------
        // userSocket.on('notificationCenter:friendRequest', request => {
        //     notificationCenter.sendFriendRequest(this.io, this.usersNs, request);
        // });
        //-----------------------------------------

        //------------ talkroomNotification -------
        // userSocket.on('notificationCenter:friendRequest', request => {
        //     notificationCenter.sendFriendRequest(this.io, this.usersNs, request);
        // });

        //-----------------------------------------

        //-------- friendMessageNotification ------
        // userSocket.on('notificationCenter:friendRequest', request => {
        //     notificationCenter.sendFriendRequest(this.io, this.usersNs, request);
        // });
        //-----------------------------------------
        userSocket.on('disconnecting', () => {
            onlineUsers.onDisconnect(this.io, this.usersNs, userSocket);
        });
    }
}

export default UsersSocket;
