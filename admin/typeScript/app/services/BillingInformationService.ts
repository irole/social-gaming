import Service from "./Service";
import BillingInformation from "../models/billingInformation";

class BillingInformationService extends Service {

    constructor() {
        super(BillingInformation);
    }

    async updateBillingInformation(userId, body: any) {
        let billingInformation = await this.findOne({user: userId});
        billingInformation.firstName = body.firstName;
        billingInformation.lastName = body.lastName;
        billingInformation.zipCode = body.zipCode;
        billingInformation.creditNumber = body.creditNumber;
        billingInformation.CVV = body.CVV;
        let result = await billingInformation.save();
        if (result) return 200;
        return 500;
    }
}

export default new BillingInformationService();
