import express from "express"
import busAdmin from "./routes/busAdmin.routes.js"
import dotenv from "dotenv";
import user from "./routes/user.routes.js"
import admin from "./routes/admin.routes.js"
import connectMongoDB from "./db/connectMongoDb.js"
import cors from 'cors'
import { BusAdmin } from "./models/busAdmin.model.js";
dotenv.config();
const app =express()

const port = process.env.PORT

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true // Allow cookies and other credentials to be sent
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api/user",user)
app.use("/api/busadmin",busAdmin)
app.use("/api/admin",admin)

app.get("/",(req,res)=>{
    res.send("ser")
})


app.listen(port,()=>{
    console.log("server is running at port number 5000 ")
    connectMongoDB()
})