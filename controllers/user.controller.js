import { Bus } from "../models/bus.model.js"
import User from "../models/user.model.js";

export const HighlightBusses = async(req,res)=>{
    try {
        const {place} = req.body
        const BusArray = await Bus.find({
            $expr: { $eq: [{ $arrayElemAt: ["$route", -1] }, place] }
          });
        res.status(200).json(BusArray);
    } catch (error) {
        console.log(error.message)
		console.log("Error in HighlightBusses controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

export const FindBusbyId = async(req,res)=>{
    try {
        const {id} = req.body
        const BusArray = await Bus.findById(id)
        res.status(200).json(BusArray);
    } catch (error) {
        console.log(error.message)
		console.log("Error in HighlightBusses controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

export const findBusAdminByBusId = async(req,res)=>{
    try {
        const {id} = req.body
        const BusArray = await Bus.findById(id)
        res.status(200).json(BusArray);
    } catch (error) {
		console.log("Error in HighlightBusses controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

export const FindAllStudents = async(req,res)=>{
    try {
        const Students = await User.find()
        res.status(200).json(Students)
    } catch (error) {
		console.log("Error in findAllStudents controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}