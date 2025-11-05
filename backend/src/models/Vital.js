const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VitalSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  heartRate: Number,
  spo2: Number,
  bloodPressure: String,
  temp: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vital', VitalSchema);
