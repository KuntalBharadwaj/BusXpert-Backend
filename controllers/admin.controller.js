import {Bus} from '../models/bus.model.js'

export const findAllBusses = async(req,res)=>{
    try {
        const Buses = await Bus.find()
        res.status(200).json(Buses);
    } catch (error) {
        console.log("error in findAllbuses" , error.message)
        res.json(400).json({error ,message: "some internal error occure"})
    }
}
