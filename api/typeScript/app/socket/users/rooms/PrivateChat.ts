import userService from "../../../services/UserService";
import privateMesssageService from "../../../services/PrivateMesssageService";


class PrivateChat {
    async getEndpoints(io, namespace, socket, data) {
        socket.join(data.endPointOne)
        let room = await this.loadChatHistory(data.endPointOne, data.endPointTwo);
        socket.emit("messageHistory", room.messageHistory);
    }

    async loadChatHistory(endPointOneUsername, endPointTwoUsername) {
        let endPointOne = await userService.findIdWithUsername(endPointOneUsername)
        let endPointTwo = await userService.findIdWithUsername(endPointTwoUsername)
        return await privateMesssageService.findRoom(endPointOne, endPointTwo)
    }

    async getMessageFromServer(io, namespace, socket, data) {

        let endPointOne = await userService.findIdWithUsername(data.sender)
        let endPointTwo = await userService.findIdWithUsername(data.room)

        let message = {
            sender: endPointOne,
            message: data.text,
            time: new Date(),
            read: false
        }
        let room = await privateMesssageService.findRoom(endPointOne, endPointTwo);
        room.messageHistory.push(message);
        await room.save();
        io.of(namespace).to(data.room).to(data.sender).emit("getMessageFromServer", data);
        //io.of(namespace).to(data.sender).emit("getMessageFromServer", data);
    }
}

export default new PrivateChat();
