import Service from "./Service";
import Country from "../models/country";

class CountryService extends Service {

    constructor() {
        super(Country);
    }
}

export default new CountryService();
