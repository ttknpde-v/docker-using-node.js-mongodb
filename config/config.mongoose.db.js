import mongoose from "mongoose"
import winstonLogging from "../log/winston.logging.js"

class ConfigMongooseDb {
    #urls = [
        "mongodb://database:27017/bookstore",
        "mongodb://localhost:27017/bookstore"
    ]
    constructor() {
        winstonLogging.info('initial the ConfigMongooseDb class')
    }
    connect = async () => { // this way to export you also can call it like a function
        try {
            // on docker URI you must use your MongoDB service name instead 127.0.0.1 or localhost
            mongoose.connect(this.#urls[0], {
                useNewUrlParser: true,
                useUnifiedTopology: true ,
                user : "local",
                pass : "12345"
                /*
                   use bookstore *** it is not relations for access mongo on cmd it is just work for access bookstore database
                   db.createUser({ user: "local", pwd: "12345", roles: [] }) *** inside bookstore
                   db.grantRolesToUser( "local", [ "readWrite" ] )
                   for fixed the error Command find requires authentication
                */
            })
                .then(() => {
                    winstonLogging.info('connected mongo database')
                })
                .catch((err) => {
                    winstonLogging.debug('failed to connect cause is '+err.toString())
                    throw err
                });

        } catch (e) {

            winstonLogging.debug(e.toString())
            process.exit()

        }
    }
}


// must build object of class before use it
export default ConfigMongooseDb