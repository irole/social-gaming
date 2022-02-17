import Service from "./Service";
import Role from "../models/role";


class ResetPasswordService extends Service {

    constructor() {
        super(Role);
    }

    async tokenUsed(token) {
        return await this.findOneAndUpdate({token}, {use: true});
    }

}

export default new ResetPasswordService();
