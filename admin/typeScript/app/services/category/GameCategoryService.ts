import CategoryService from "./CategoryService";
import GameCategory from "../../models/gameCategory";

class GameCategoryService extends CategoryService {

    constructor() {
        super(GameCategory);
    }

}

export default new GameCategoryService();
