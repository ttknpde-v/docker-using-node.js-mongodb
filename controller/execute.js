import winstonLogging from "../log/winston.logging.js"
import configMongooseDb from "../config/config.mongoose.db.js"
import express from "express"
import Crud from "../service/crud.programming.js"
import bodyParser from "body-parser";

const ConfigMongooseDb = new configMongooseDb()
const app = express()


// set middle ware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


// connect database
await ConfigMongooseDb.connect()


// define my router
app.get('/reads', async (req, res) => {
    await Crud.reads().then(
        (response) => {
            winstonLogging.debug('find() returned ' + response) // returned objects. That you mapped with Schema mongoose
            res.json({
                data: response,
                status: ["200", "ok"]
            })
        }).catch((e) => {
        winstonLogging.debug('found error ' + e.toString())
        res.json({
            data: e.toString(),
            status: ["204", "no content"]

        })
    })
})
app.get('/read/(:id)', async (req, res) => {
    let id = req.params['id']
    await Crud.read(id).then(
        (response) => {
            winstonLogging.debug('findById(id) returned ' + response)
            res.json({
                data: response,
                status: ["200", "ok"]
            })
        }).catch((e) => {
        winstonLogging.debug('found error ' + e.toString())
        res.json({
            data: e.toString(),
            status: ["204", "no content"]
        })
    })
})
app.post('/create', async (req, res) => {
    // basic way to access body
    const id = req.body.id
    const title = req.body.title
    const price = req.body.price
    const author = req.body.author
    await Crud.create(id, title, price, author).then(
        (response) => {
            winstonLogging.debug('create(id,title,price,author) returned ' + response)
            res.json({
                data: response,
                status: ["201", "create"]
            })
        }).catch((e) => {
        winstonLogging.debug('found error ' + e.toString())
        res.json({
            data: e.toString(),
            status: ["204", "no content"]
        })
    })
})
app.put('/update/(:id)', async (req, res) => {
    const id = req.params["id"]
    // second way to access body and mapping var's name
    const {title, price, author} = req.body
    await Crud.update(id, title, price, author).then(
        (response) => {
            /*
            "acknowledged": true,
            "modifiedCount": 1,
            "upsertedId": null,
            "upsertedCount": 0,
            "matchedCount": 1
            */
            winstonLogging.debug('update(id,title,price,author) returned ' + response)
            res.json({
                data: response,
                status: ["202", "accepted"]
            })
        }).catch((e) => {
        winstonLogging.debug('found error ' + e.toString())
        res.json({
            data: e.toString(),
            status: ["204", "no content"]
        })
    })
})
// auto add ?id=<some value> when you send by Query Params ?<Key>=<Value>
app.delete('/delete', async (req, res) => {
    // way to get Query Params
    const id = req.query.id
    // second way to access body and mapping var's name
    await Crud.delete(id).then(
        (response) => {
            /*
                "acknowledged": true,
                "deletedCount": 1
            */
            winstonLogging.debug('delete(id) returned ' + response)
            res.json({
                data: response,
                status: ["200", "ok"]
            })
        }).catch((e) => {
        winstonLogging.debug('found error ' + e.toString())
        res.json({
            data: e.toString(),
            status: ["204", "no content"]
        })
    })
})


// initial port
app.listen(8000, (e) => {
    if (!e) winstonLogging.info('you are on port 8000')
})