import Service from "./Service";
import UsersReport from "../models/usersReport";


class UsersReportService extends Service {

    constructor() {
        super(UsersReport);
    }

    async report(reporter, reportedUser, reportText) {
        if (reporter === reportedUser) return Option['httpStatus'].s400;
        let newReport = await this.insert({
            reporter,
            reportedUser,
            reportBody: reportText
        });
        if (newReport) return Option['httpStatus'].s200;
        return Option['httpStatus'].s500;
    }
}

export default new UsersReportService();
