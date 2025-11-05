import mongoose from "mongoose";
const { Schema } = mongoose;

const VitalSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  heartRate: Number,
  spo2: Number,
  bloodPressure: String,
  temp: Number,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Vital", VitalSchema);
