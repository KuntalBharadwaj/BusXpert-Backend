import { BusAdmin } from "../models/busAdmin.model.js"

export const findAllbusAdmin = async(req,res)=>{
    try {
        const BusAdmins = await BusAdmin.find()
        res.status(200).json(BusAdmins)
    } catch (error) {
        console.log("error in findAllbusAdmin",error.message)
        res.status(400).json(error)
    }
}