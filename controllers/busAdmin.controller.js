import { Bus } from "../models/bus.model.js"
import { BusAdmin } from "../models/busAdmin.model.js"

export const findAllbusAdmin = async(req,res)=>{
    try {
        const BusAdmins = await BusAdmin.find().populate("bus")
        res.status(200).json(BusAdmins)
    } catch (error) {
        console.log("error in findAllbusAdmin",error.message)
        res.status(400).json(error)
    }
}

export const LinkingBusWithBusAdmin = async (req, res) => {
    try {
        const { busNumber, busAdminId } = req.body;

        // Check if both IDs are provided
        if (!busNumber || !busAdminId) {
            return res.status(400).json({ message: "Bus ID and Bus Admin ID are required." });
        }

        // Fetch the Bus and BusAdmin from the database
        const bus = await Bus.findOne({busNumber})
        const busAdmin = await BusAdmin.findById(busAdminId);

        // Check if the bus and bus admin exist
        if (!bus) {
            return res.status(404).json({ message: "Bus not found." });
        }
        if (!busAdmin) {
            return res.status(404).json({ message: "Bus Admin not found." });
        }

        // Update the bus with the bus admin reference
        bus.busAdmin = busAdminId;
        busAdmin.bus = bus._id
        await bus.save();
        await busAdmin.save()

        // Optionally, you can update the BusAdmin model if needed
        // busAdmin.assignedBuses.push(busId);
        // await busAdmin.save();

        res.status(200).json({ message: "Bus successfully linked to Bus Admin.", bus });
    } catch (error) {
        console.error("Error linking bus with bus admin:", error.message);
        res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

export const SeparateLink = async(req,res)=>{
    try {
        const {busAdminId} = req.body;
        // Check if both IDs are provided
        if (!busAdminId) {
            return res.status(400).json({ message: "Bus ID and Bus Admin ID are required." });
        }

        // Fetch the Bus and BusAdmin from the database
        const busAdmin = await BusAdmin.findById(busAdminId);
        const bus = await Bus.findById(busAdmin.bus)

        // Check if the bus and bus admin exist
        if (!bus) {
            return res.status(404).json({ message: "Bus not found." });
        }
        if (!busAdmin) {
            return res.status(404).json({ message: "Bus Admin not found." });
        }

        // Update the bus with the bus admin reference
        bus.busAdmin = null;
        busAdmin.bus = null
        await bus.save();
        await busAdmin.save()

        // Optionally, you can update the BusAdmin model if needed
        // busAdmin.assignedBuses.push(busId);
        // await busAdmin.save();

        res.status(200).json({ message: "Bus successfully linked to Bus Admin.", bus });
    } catch (error) {
        console.log("error in separate Link",error.message)
        res.status(400).json({message: "internal server error"})
    }
}