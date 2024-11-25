import mongoose from "mongoose";

const busAdminSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    employeeId: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus",
        default: null
    },
    phoneNo: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export const BusAdmin = mongoose.model("BusAdmin",busAdminSchema)
