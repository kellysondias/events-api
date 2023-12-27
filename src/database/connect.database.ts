import mongoose from "mongoose";

export const connectDB = (uri: string) => mongoose.connect(`${uri}`);
