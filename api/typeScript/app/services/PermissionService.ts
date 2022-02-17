import Permission from "../models/permission";
import Service from "./Service";


class PermissionService extends Service {

    constructor() {
        super(Permission);
    }

}

export default new PermissionService();
