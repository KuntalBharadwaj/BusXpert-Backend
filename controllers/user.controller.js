import { Bus } from "../models/bus.model.js"
import { BusAdmin } from "../models/busAdmin.model.js";
import User from "../models/user.model.js";

export const HighlightBusses = async(req,res)=>{
    try {
        const {place} = req.body
        const BusArray = await Bus.find({
            $expr: { $eq: [{ $arrayElemAt: ["$route", -1] }, place] }
          }).populate("busAdmin");
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
        const BusArray = await Bus.findById(id).populate("busAdmin")
        if(!BusArray) res.status(400).json("internal server error")
        res.status(200).json(BusArray);
    } catch (error) {
        console.log(error.message)
		console.log("Error in findbusbyid controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

export const findBusAdminByBusId = async(req,res)=>{
    try {
        const {id} = req.body
        const BusAdmins = await BusAdmin.findById(id)
        res.status(200).json(BusArray);
    } catch (error) {
		console.log("Error in HighlightBusses controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

export const FindAllStudents = async(req,res)=>{
    try {
        const Students = await User.find().populate("bus")
        res.status(200).json(Students)
    } catch (error) {
		console.log("Error in findAllStudents controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

export const LinkingUserWithBus = async (req, res) => {
    try {
        const { studentId, busId } = req.body;

        // Validate input
        if (!studentId || !busId) {
            return res.status(400).json({ message: "User ID and Bus ID are required." });
        }
        
        // Fetch the User and Bus from the database
        const user = await User.findOne({id:studentId});
        const bus = await Bus.findById(busId);

        // Check if the user and bus exist
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        if (!bus) {
            return res.status(404).json({ message: "Bus not found." });
        }

        // Link the user to the bus (assuming UserModel has a field 'linkedBus')
        user.bus = busId;
        await user.save();

        // Optionally, link the user in the bus model if required
        // bus.linkedUsers.push(userId);
        // await bus.save();

        res.status(200).json({ message: "User successfully linked to Bus.", user });
    } catch (error) {
        console.error("Error linking user with bus:", error.message);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

export const RemoveLinkinguserwithbus = async (req, res) => {
    try {
        const { studentId } = req.body;
        console.log(req.body)
        // Validate input
        if (!studentId) {
            return res.status(400).json({ message: "User ID and Bus ID are required." });
        }
        
        // Fetch the User and Bus from the database
        const user = await User.findOne({id:studentId});

        // Check if the user and bus exist
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Link the user to the bus (assuming UserModel has a field 'linkedBus')
        user.bus = null;
        await user.save();

        // Optionally, link the user in the bus model if required
        // bus.linkedUsers.push(userId);
        // await bus.save();

        res.status(200).json({ message: "User successfully linked to Bus.", user });
    } catch (error) {
        console.error("Error linking user with bus:", error.message);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

export const UpdateDetails = async(req,res)=> {
    try {
        const {username, email} = req.body
        const {_id} = req.params
        const response = await User.findOneAndUpdate(_id,{username,email})
        res.status(200).json(response)
    } catch (error) {
		console.log("Error in updateDetails ", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}


