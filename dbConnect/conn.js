import mongoose from "mongoose";


const connectDb = handler => async (req, res) => {
  // console.log(req)
  if (mongoose.connections[0].readyState) {
    return handler(req, res)
  }
  await mongoose.connect(process.env.MONGODB_URI)
  return handler(req, res)
}

export default connectDb;
