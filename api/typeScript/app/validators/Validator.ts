const autoBind = require('auto-bind');

export default class Validator {

    constructor() {
        autoBind(this);
    }
};
