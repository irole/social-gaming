import CategoryService from "./CategoryService";
import ShopCategory from "../../models/shopCategory";

class ShopCategoryService extends CategoryService {

    constructor() {
        super(ShopCategory);
    }
}

export default new ShopCategoryService();
