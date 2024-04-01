import { log } from "console";
import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Connected to DB");
        });

        connection.on("error", (error) => {
            console.log("Error while connection to DB", error);
            process.exit();
        });
    } catch (error) {
        console.log("Error while connecting to DB", error);
        
    }
}