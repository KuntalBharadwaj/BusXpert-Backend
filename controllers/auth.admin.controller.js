import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import bcrypt from "bcryptjs";
import { Admin } from "../models/admin.model.js";

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const admin = await Admin.findOne({ email });
		const isPasswordCorrect = await bcrypt.compare(password, admin?.password || "");

		if (!admin || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid userName or password" });
		}
		generateTokenAndSetCookie(admin._id, res);
		res.status(200).json(admin);
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const signup = async (req, res) => {
	try {
		const AdminDetails = req.body;
		const existingAdmin = await Admin.findOne({email:AdminDetails.email});
		if (existingAdmin) {
			return res.status(400).json({ success: false, error: "employeeId is already taken" });
		}
		
		// if (busAdminDetails.password.length < 6) {
		// 	console.log("busAdminDetails")
		// 	return res.status(400).json({ error: "Password must be at least 6 characters long" });
		// }
		
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(AdminDetails.password, salt);
		AdminDetails.password = hashedPassword
		const newAdmin = new Admin(AdminDetails);
		if (newAdmin) {
			generateTokenAndSetCookie(newAdmin._id, res);
			await newAdmin.save();
			res.status(201).json(newAdmin);
		} else {
			res.status(400).json({ error: "Invalid BusAdmin data"});
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({error: "Internal Server Error" });
	}
};

export const logout = async (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};