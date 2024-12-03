import {Bus} from '../models/bus.model.js'
import { BusAdmin } from '../models/busAdmin.model.js';

export const findAllBusses = async(req,res)=>{
    try {
        const Buses = await Bus.find()
        res.status(200).json(Buses);
    } catch (error) {
        console.log("error in findAllbuses" , error.message)
        res.json(400).json({error ,message: "some internal error occure"})
    }
}

export const UpdateBusDetails = async(req,res)=>{
    try {
        const busId = req.params.id; // Get the bus ID from the URL params
        const updateData = req.body; // Get the update data from the request body

        if(!busId) return res.status(400).json({message: "Bus id required"})
        const updatedBus = await Bus.findByIdAndUpdate(busId, updateData);
        
        if (!updatedBus) {
            return res.status(404).json({ message: "Bus not found" });
        }
      
          // Success response
        res.status(200).json(updatedBus);
        
    }  catch (error) {
        console.log("error in updateBusdetails" , error.message)
        res.json(400).json({error ,message: "some internal error occure"})
    }
}

export const AddedBus = async(req,res)=>{
    try {
        const newbus = new Bus(req.body)
        const response = await newbus.save();
        res.json(response)
    } catch (error) {
        console.log(error.message)
        res.json(400).json({error ,message: "some internal error occure"})

    }
}

export const GetnotAssignBus = async(req,res)=>{
    try {
         const BusArray = await Bus.find({busAdmin:null})
         res.status(200).json(BusArray)
    } catch (error) {
        console.log(error.message)
        res.json(400).json({error ,message: "some internal error occure"})
        
    }
}