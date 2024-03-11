import programming from "../entity/programming.js";

const Programming = new programming()
const model = Programming.programmingModel
class Crud {
    static reads = async ()=> {
        return model.find()
    }
    static read = async (id)=> {
        return model.findById(id)
    }
    static create = async (id,title,price,author)=> {
        /*
           MongooseError: document must have an _id before saving
           because you don't pass _id variable name No id
        */
        let _id = id
        return model.create({_id,title,price,author})
    }
    static update = async (id,title,price,author)=> {
        let p = await model.findById(id)
        if (p) {
            // console.log("found : "+p)
            return model.updateOne({_id:id},{title:title, price:price,author:author})
        }
        return false
    }
    static delete = async (id)=> {
        let p = await model.findById(id)
        if (p) {
            // console.log("found : "+p)
            return model.deleteOne({_id:id})
        }
        return false
    }
}

export default Crud