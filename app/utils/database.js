import mongoose from "mongoose";

const connectDB = async () => {
  try{
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGOOSE_AUTH)
    console.log("Success: Connected to MongoDB")
  } catch(err) {
    console.log("Failure: Unconnected to MongoDB")
    throw new Error()
  }
}

export default connectDB