import BadWord from "../models/badWord";
import Service from "./Service";

class BadWordService extends Service {

    constructor() {
        super(BadWord);
    }

    async getAllBadWord() {
        let words: any = [];
        let badWords = await this.findAll();
        await badWords.forEach(badWord => {
            words.push(badWord.name.toLowerCase())
        })
        return words
    }

    async checkBadWordInString(sentence) {
        let badWords = await this.findAll();
        let have = false;
        await badWords.forEach(badWord => {
            let word = badWord.name;
            let haveBadWord = sentence.search(word);
            if (haveBadWord > -1) have = true;
        })
        return have;
    }
}

export default new BadWordService();
