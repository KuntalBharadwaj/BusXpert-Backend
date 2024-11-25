import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    busNumber: {
      type: String,
      required: true,
      unique: true,
    },
    route: {
      type: Array,
      default: [],
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
      default: 50
    },
    currentLocation: {
      type: String,
      required: true,
      default: 'collage'
    },
    status: {
      type: String,
      enum: ["running", "maintenance", "stopped"],
      default: "stopped",
    },
    busAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusAdmin",
      default: null
    },
  },
  { timestamps: true }
);

export const Bus = mongoose.model("Bus", busSchema);
