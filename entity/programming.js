import mongoose from "mongoose"
import winstonLogging from "../log/winston.logging.js"

class Programming {
    #programmingSchema
    constructor() {
        winstonLogging.info("initial the Programming class")
        this.#programmingSchema = new mongoose.Schema({
            _id: Number,
            title: String,
            price: Number,
            author: String,
        }, {
            /*
                The versionKey is a property set on each document when first created by Mongoose.
                This keys value contains the internal revision of the document.
                The name of this document property is configurable. The default is __v.
            */
            versionKey: false // if you don't need it
        })
    }
    get programmingModel () {
        return mongoose.model("programmings",this.#programmingSchema) // have to use plural (s) why ???
    }
}
// must build object of class before use it
export default Programming