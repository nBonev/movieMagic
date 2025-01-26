import Cast from "../models/Cast.js";

export default {
    getAll(ids) {
        return Cast.find({});
    },
    
    create(castData) {
        return Cast.create(castData);
    },
}