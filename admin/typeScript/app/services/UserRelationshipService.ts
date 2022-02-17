import Service from "./Service";
import UserRelationship from "../models/userRelationship";

class UserRelationshipService extends Service {

    receiverData: any;
    requesterData: any;

    constructor() {
        super(UserRelationship);
    }

    async findUsers(receiverId, requesterId) {
        this.setReceiverData(await this.findOne({user: receiverId}));
        this.setRequesterData(await this.findOne({user: requesterId}));
    }

    async sendRequest(receiverId, requesterId) {
        // find requester and receiver
        await this.findUsers(receiverId, requesterId);
        //------------------ Check ----------------------
        // Check if receiver already send request to requester
        if (this.getRequesterFriendsRequestList().includes(this.getReceiverId()))
            return await this.requestProcess(this.getRequesterId(), this.getReceiverId(), 'accept', false);
        //----------------------------------------------
        // add receiver and requester in pending and request List
        this.setRequesterFriendsPendingList(this.getReceiverId())
        this.setReceiverFriendsRequestList(this.getRequesterId())
        // Update requester and receiver
        return await this.saveUsers();
    }

    async requestProcess(receiverId, requesterId, mode, findUser: boolean = true) {
        // use find user
        if (findUser) await this.findUsers(receiverId, requesterId);
        // mode is "reject"
        if (mode === "accept") {
            this.setRequesterFriendsList(this.getReceiverId());
            this.setReceiverFriendsList(this.getRequesterId());
        }
        // find receiver and requester index in request list and pending list
        let receiverIndex = this.findIndex(this.getReceiverFriendsRequestList(), this.getRequesterId());
        let requesterIndex = this.findIndex(this.getRequesterFriendsPendingList(), this.getReceiverId());
        // delete requester id and receiver id in request list and pending List
        this.spliceArray(this.getRequesterFriendsPendingList(), requesterIndex);
        this.spliceArray(this.getReceiverFriendsRequestList(), receiverIndex);
        // Check Delete From friend pending list and friend request list
        if (this.findIndex(this.getRequesterFriendsPendingList(), this.getReceiverId()) !== -1 && this.findIndex(this.getReceiverFriendsRequestList(), this.getRequesterId() !== -1)) return 500;
        // Update requester and receiver
        return await this.saveUsers();
    }

    async removeFriend(receiverId, requesterId, findUser: boolean = true) {
        // use find user
        if (findUser) await this.findUsers(receiverId, requesterId);
        // find receiver and requester index in friends list
        let requesterIndex = this.findIndex(this.getReceiverFriendsList(), this.getRequesterId());
        let receiverIndex = this.findIndex(this.getRequesterFriendsList(), this.getReceiverId());
        // delete requester id and receiver id in friends list
        this.spliceArray(this.getReceiverFriendsList(), requesterIndex);
        this.spliceArray(this.getRequesterFriendsList(), receiverIndex);
        // Check Delete From friend pending list and friend request list
        if (await this.usersAreFriends(receiverId, requesterId, false)) return 500;
        // Update requester and receiver
        return await this.saveUsers();
    }

    async blockUser(receiverId, requesterId, findUser: boolean = true) {
        let changeUser;
        // use find user
        if (findUser) await this.findUsers(receiverId, requesterId);
        // check users are friends and request List
        let areFriends = await this.usersAreFriends(receiverId, requesterId, false);
        let areInRequestList = await this.usersAreInRequestList(receiverId, requesterId, false);
        if (areFriends) {
            // Remove friend Process
            let result = await this.removeFriend(receiverId, requesterId, false);
            if (result !== 200) return Option['httpStatus'].s500;
        } else if (areInRequestList) {
            // reject request when receiver have request
            let rejectResult = await this.requestProcess(receiverId, requesterId, "reject", false);
            // reject request when requester have request
            if (this.getReceiverFriendsPendingList().includes(this.getRequesterId()) || this.getReceiverFriendsRequestList().includes(this.getRequesterId())) {
                rejectResult = await this.requestProcess(requesterId, receiverId, "reject", true);
                changeUser = true; // when rejectResult user id is changed :|
            }
            if (rejectResult !== 200) return Option['httpStatus'].s500;
        }
        if (changeUser) {
            this.setRequesterBlockedByList(this.getRequesterId())
            this.setReceiverBlockedUsersList(this.getReceiverId());
        }else {
            // add Requester in blocked by list
            this.setReceiverBlockedByList(this.getRequesterId())
            // add receiver in requester blocked list
            this.setRequesterBlockedUsersList(this.getReceiverId());
        }
        // Update requester and receiver
        return await this.saveUsers();
    }

    async unBlockUser(receiverId, requesterId, findUser: boolean = true) {
        // use find user
        if (findUser) await this.findUsers(receiverId, requesterId);
        // find index of receiver in requester
        let receiverIndex = this.findIndex(this.getRequesterBlockedUsersList(), this.getReceiverId());
        let requesterIndex = this.findIndex(this.getReceiverBlockedByList(), this.getRequesterId());
        // delete requester and receiver from BlockedByList and BlockedUsersList
        this.spliceArray(this.getRequesterBlockedUsersList(), receiverIndex)
        this.spliceArray(this.getReceiverBlockedByList(), requesterIndex)
        // Update requester and receiver
        return await this.saveUsers();
    }

    async getFriendList(userId) {
        let user = await this.findOne({user: userId}, {path: 'friendsList', select: 'username'});
        return user.friendsList;
    }

    async getFriendUsernameList(userId) {
        let friends: any = [];
        let user = await this.findOne({user: userId}, {path: 'friendsList', select: 'username'});
        await user.friendsList.forEach((friend) => {
            friends.push(friend.username);
        })
        return friends;
    }

    setReceiverData(user) {
        this.receiverData = user;
    }

    setRequesterData(user) {
        this.requesterData = user;
    }

    getReceiverId() {
        return this.receiverData.user;
    }

    getRequesterId() {
        return this.requesterData.user;
    }

    getReceiverFriendsRequestList() {
        return this.receiverData.friendsRequestList;
    }

    setReceiverFriendsRequestList(id) {
        this.receiverData.friendsRequestList.push(id);
    }

    getRequesterFriendsRequestList() {
        return this.requesterData.friendsRequestList;
    }

    setRequesterFriendsRequestList(id) {
        this.requesterData.friendsRequestList.push(id);
    }

    getReceiverFriendsPendingList() {
        return this.receiverData.friendsPendingList;
    }

    setReceiverFriendsPendingList(id) {
        this.receiverData.friendsPendingList.push(id);
    }

    getRequesterFriendsPendingList() {
        return this.requesterData.friendsPendingList;
    }

    setRequesterFriendsPendingList(id) {
        this.requesterData.friendsPendingList.push(id);
    }

    getReceiverFriendsList() {
        return this.receiverData.friendsList;
    }

    setReceiverFriendsList(id) {
        this.receiverData.friendsList.push(id);
    }

    getReceiverBlockedUsersList() {
        return this.receiverData.blockedUsersList;
    }

    setReceiverBlockedUsersList(id) {
        this.receiverData.blockedUsersList.push(id);
    }

    getRequesterBlockedUsersList() {
        return this.requesterData.blockedUsersList;
    }

    setRequesterBlockedUsersList(id) {
        this.requesterData.blockedUsersList.push(id);
    }

    getReceiverBlockedByList() {
        return this.receiverData.blockedByList;
    }

    setReceiverBlockedByList(id) {
        this.receiverData.blockedByList.push(id);
    }

    getRequesterBlockedByList() {
        return this.requesterData.blockedByList;
    }

    setRequesterBlockedByList(id) {
        this.requesterData.blockedByList.push(id);
    }

    getRequesterFriendsList() {
        return this.requesterData.friendsList;
    }

    setRequesterFriendsList(id) {
        this.requesterData.friendsList.push(id);
    }

    findIndex(data, needUserIndexId): number {
        return data.indexOf(needUserIndexId)
    }

    spliceArray(data, index): void {
        data.splice(index, 1);
    }

    async usersAreFriends(receiverId, requesterId, findUser: boolean = true) {
        // use find user
        if (findUser) await this.findUsers(receiverId, requesterId);
        return !!this.getRequesterFriendsList().includes(this.getReceiverId());
    }

    async usersAreInRequestList(receiverId, requesterId, findUser: boolean = true) {
        // use find user
        if (findUser) await this.findUsers(receiverId, requesterId);
        return this.getReceiverFriendsPendingList().includes(this.getRequesterId()) || this.getReceiverFriendsRequestList().includes(this.getRequesterId());
    }

    async saveUsers() {
        // Update requester and receiver
        let userOne = await this.receiverData.save();
        let userTwo = await this.requesterData.save();
        // Check requester and receiver Updated
        if (userOne && userTwo) return 200;
        // send if server has Error
        return 500;
    }
}

export default new UserRelationshipService();
