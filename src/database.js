import mongoose from "mongoose"

mongoose.set("strictQuery", true)

export default async () => {
  try {
    const { connection } = await mongoose.connect(
      process.env.MONGODB_URI_LOCAL
    )
    console.log(
      `Database is connected on ${connection.host} - ${connection.port}`
    )
  } catch (error) {
    console.log(error)
  }
}
