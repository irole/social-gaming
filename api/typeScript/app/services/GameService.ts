import Game from "../models/game";
import Service from "./Service";


class GameService extends Service {

    constructor() {
        super(Game);
    }
}

export default new GameService();
