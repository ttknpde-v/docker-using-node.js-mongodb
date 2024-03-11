import { createLogger, format, transports } from "winston"
import process from "process"
import path from "path";

class Winston {
    /*
      why I use get keyword ?
      because I don't need a function (no need to use -> ())
    */
    static get logging() {
        return createLogger({
            level: 'silly',
            format: format.combine(
                // get current file for output with logging
                format.label({ label: path.basename(process.argv[1]) }),
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                format.printf(format => `${format.timestamp} ${format.level} [${format.label}] : ${format.message}`)
            ),
            transports: [
                new transports.Console // get logging to console
            ]
        }) // createLogger({})
    }

}

export default Winston.logging

