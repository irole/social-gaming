import Service from "./Service";
import privateMessage from "../models/privateMessage";


class PrivateMessageService extends Service {

    constructor() {
        super(privateMessage);
    }

    async findRoom(endPointOne, endPointTwo) {
        let room = await this.findOne({endPointOne, endPointTwo}, {
            path: "messageHistory",
            populate: {path: "sender", select: "username"}
        }) || await this.findOne({
            endPointOne: endPointTwo,
            endPointTwo: endPointOne
        }, {path: "messageHistory", populate: {path: "sender", select: "username"}})
        if (room) return room;
        await this.insert({
            endPointOne,
            endPointTwo
        })
        return this.findRoom(endPointOne, endPointTwo)
    }
}

export default new PrivateMessageService();
